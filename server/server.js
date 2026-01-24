const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const config = require('./config');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// Initialize Google Calendar API
let calendar;

try {
    const serviceAccount = JSON.parse(fs.readFileSync(config.serviceAccountPath, 'utf8'));

    const auth = new google.auth.JWT(
        serviceAccount.client_email,
        null,
        serviceAccount.private_key,
        ['https://www.googleapis.com/auth/calendar']
    );

    calendar = google.calendar({ version: 'v3', auth });
    console.log('✅ Google Calendar API initialized');
} catch (error) {
    console.error('❌ Failed to initialize Google Calendar API:', error.message);
}

// Helper: Generate time slots for a date
function generateTimeSlots(date) {
    const slots = [];
    const { start, end, timezone } = config.businessHours;

    for (let hour = start; hour < end; hour++) {
        for (let minute = 0; minute < 60; minute += config.slotDuration) {
            const startTime = new Date(date);
            startTime.setHours(hour, minute, 0, 0);

            const endTime = new Date(startTime);
            endTime.setMinutes(endTime.getMinutes() + config.slotDuration);

            // Skip if end time goes past business hours
            if (endTime.getHours() >= end) continue;

            slots.push({
                start: startTime.toISOString(),
                end: endTime.toISOString(),
                display: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
            });
        }
    }

    return slots;
}

// Helper: Check if slot is available
async function isSlotAvailable(startTime, endTime) {
    if (!calendar) return false;

    try {
        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin: startTime,
                timeMax: endTime,
                items: [{ id: config.calendarId }],
                timeZone: config.businessHours.timezone
            }
        });

        const busy = response.data.calendars[config.calendarId].busy || [];
        return busy.length === 0;
    } catch (error) {
        console.error('Error checking availability:', error);
        return false;
    }
}

// API: Get available time slots for a date
app.get('/api/availability', async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: 'Date parameter is required (YYYY-MM-DD)' });
        }

        if (!calendar) {
            return res.status(503).json({ error: 'Calendar service unavailable' });
        }

        // Generate all possible slots for the date
        const allSlots = generateTimeSlots(date);

        // Check availability for each slot
        const availabilityChecks = allSlots.map(async (slot) => {
            const available = await isSlotAvailable(slot.start, slot.end);
            return available ? slot : null;
        });

        const results = await Promise.all(availabilityChecks);
        const availableSlots = results.filter(slot => slot !== null);

        res.json({
            date,
            slots: availableSlots,
            timezone: config.businessHours.timezone
        });

    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ error: 'Failed to fetch availability' });
    }
});

// API: Book an appointment
app.post('/api/book', async (req, res) => {
    try {
        const { name, email, phone, treatment, startTime, endTime } = req.body;

        // Validation
        if (!name || !email || !phone || !treatment || !startTime || !endTime) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!calendar) {
            return res.status(503).json({ error: 'Calendar service unavailable' });
        }

        // Re-check availability before booking
        const available = await isSlotAvailable(startTime, endTime);

        if (!available) {
            return res.status(409).json({
                error: 'Slot already booked',
                message: 'This time slot is no longer available. Please choose another time.'
            });
        }

        // Create calendar event
        const event = {
            summary: `${treatment} - ${name}`,
            description: `Patient: ${name}\nEmail: ${email}\nPhone: ${phone}\nTreatment: ${treatment}`,
            start: {
                dateTime: startTime,
                timeZone: config.businessHours.timezone
            },
            end: {
                dateTime: endTime,
                timeZone: config.businessHours.timezone
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1 day before (to calendar owner)
                    { method: 'email', minutes: 60 }        // 1 hour before (to calendar owner)
                ]
            }
        };

        const response = await calendar.events.insert({
            calendarId: config.calendarId,
            resource: event
        });

        res.json({
            success: true,
            message: 'Appointment booked successfully!',
            eventId: response.data.id,
            eventLink: response.data.htmlLink
        });

    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({
            error: 'Failed to book appointment',
            message: 'An error occurred while booking. Please try again.'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        calendarConnected: !!calendar,
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(config.port, () => {
    console.log(`🚀 Booking server running on http://localhost:${config.port}`);
    console.log(`📅 Calendar ID: ${config.calendarId}`);
    console.log(`🕐 Business hours: ${config.businessHours.start}:00 - ${config.businessHours.end}:00`);
    console.log(`⏱️  Slot duration: ${config.slotDuration} minutes`);
});
