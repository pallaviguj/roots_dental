# Roots Dental - Appointment Booking System

Custom appointment booking system with Google Calendar integration.

## Features

- ✅ Custom booking form with date picker
- ✅ Real-time availability checking
- ✅ 30-minute time slot booking
- ✅ Automatic Google Calendar event creation
- ✅ Email reminders to calendar owner
- ✅ Double-booking prevention
- ⚠️ Patient email confirmations require manual follow-up (or SendGrid integration)
- ✅ Mobile-responsive design

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Set Up Google Calendar API

#### A. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (e.g., "Roots Dental Booking")
3. Enable the **Google Calendar API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

#### B. Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in details:
   - Name: `booking-service`
   - Description: `Service account for appointment booking`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

#### C. Generate Service Account Key

1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Click "Create" - a JSON file will download
6. **Rename** the file to `service-account-key.json`
7. **Move** it to the `server/` folder

#### D. Share Your Calendar with the Service Account

1. Open [Google Calendar](https://calendar.google.com)
2. Find your calendar in the left sidebar
3. Click the three dots > "Settings and sharing"
4. Scroll to "Share with specific people"
5. Click "Add people"
6. Paste the service account email (from `service-account-key.json`, looks like `booking-service@project-id.iam.gserviceaccount.com`)
7. Set permission to **"Make changes to events"**
8. Click "Send"

### 3. Configure the Server

Edit `server/config.js`:

```javascript
module.exports = {
	port: 3000,
	
	// Replace with your calendar ID (usually your email)
	calendarId: 'pallavi.gujrati@gmail.com',
	
	// Business hours
	businessHours: {
		start: 9,   // 9 AM
		end: 18,    // 6 PM
		timezone: 'Europe/Copenhagen'
	},
	
	slotDuration: 30, // minutes
	
	corsOrigin: 'http://localhost:8000'
};
```

### 4. Run the Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 5. Update Frontend Configuration

Edit `js/booking.js` line 2 if your backend runs on a different port:

```javascript
const BOOKING_API = 'http://localhost:3000';
```

### 6. Start Your Frontend

```bash
# From the project root
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

## API Endpoints

### GET `/api/availability?date=YYYY-MM-DD`

Get available time slots for a specific date.

**Response:**
```json
{
  "date": "2026-01-27",
  "slots": [
    {
      "start": "2026-01-27T09:00:00.000Z",
      "end": "2026-01-27T09:30:00.000Z",
      "display": "09:00"
    }
  ],
  "timezone": "Europe/Copenhagen"
}
```

### POST `/api/book`

Book an appointment.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+4512345678",
  "treatment": "Root Canal Treatment",
  "startTime": "2026-01-27T09:00:00.000Z",
  "endTime": "2026-01-27T09:30:00.000Z"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Appointment booked successfully!",
  "eventId": "abc123",
  "eventLink": "https://calendar.google.com/..."
}
```

**Error Response (slot taken):**
```json
{
  "error": "Slot already booked",
  "message": "This time slot is no longer available. Please choose another time."
}
```

### GET `/health`

Health check endpoint.

## Troubleshooting

### "Calendar service unavailable"

- Check that `service-account-key.json` is in the `server/` folder
- Verify the JSON file is valid
- Check console logs for specific errors

### "Failed to fetch availability"

- Ensure the backend server is running
- Check CORS configuration in `server/config.js`
- Verify `calendarId` is correct
- Confirm the service account has access to the calendar

### No time slots showing

- Verify business hours in `config.js`
- Check the selected date is not in the past
- Check the selected date is a weekday (if configured)
- Look for errors in browser console

### Email notifications not sent

- Ensure patient email is valid
- Check Google Calendar settings allow sending invitations
- Verify `sendUpdates: 'all'` is set in the booking endpoint

## Production Deployment

For production:

1. Set up environment variables (don't commit `.env` or service account key)
2. Use HTTPS
3. Update `corsOrigin` in `config.js`
4. Update `BOOKING_API` in `js/booking.js`
5. Consider adding rate limiting
6. Add proper error logging (e.g., Sentry)
7. Use a process manager like PM2

## Security Notes

- ✅ Service account key is in `.gitignore`
- ✅ Never commit credentials to git
- ✅ Use environment variables in production
- ✅ Implement rate limiting for production
- ✅ Validate all inputs on backend

## Support

For issues or questions, please contact the development team.
