# 🚀 Quick Start: Appointment Booking System

## What's Changed?

Built a **custom booking system** with Node.js backend that gives you:

✅ Full control over UI/UX  
✅ Custom treatment field  
✅ Real-time availability checking  
✅ Better mobile experience  
✅ Automatic calendar integration  
✅ Double-booking prevention  
✅ Email reminders (to you)  

## Before You Start

You need:
- Google Calendar account
- Node.js installed (v14 or higher)
- 15 minutes for setup

## Step-by-Step Setup

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Google Calendar API Setup (5 minutes)

#### a) Go to Google Cloud Console
Visit: https://console.cloud.google.com/

#### b) Create Project
- Click "New Project"
- Name: "Roots Dental Booking"
- Click "Create"

#### c) Enable Calendar API
- Go to "APIs & Services" > "Library"
- Search "Google Calendar API"
- Click "Enable"

#### d) Create Service Account
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "Service Account"
- Name: `booking-service`
- Click "Create" > "Continue" > "Done"

#### e) Download Key
- Click on the service account you just created
- Go to "Keys" tab
- Click "Add Key" > "Create new key" > "JSON"
- A file downloads - **rename it to `service-account-key.json`**
- **Move it to the `server/` folder**

#### f) Share Your Calendar
- Open Google Calendar: https://calendar.google.com
- Click your calendar name > "Settings and sharing"
- Scroll to "Share with specific people"
- Click "Add people"
- Paste the service account email (from the JSON file, looks like `xxx@xxx.iam.gserviceaccount.com`)
- Permission: **"Make changes to events"**
- Click "Send"

### 3. Configure Server

Edit `server/config.js`:

```javascript
calendarId: 'pallavi.gujrati@gmail.com',  // Your email
```

That's it! Everything else has good defaults.

### 4. Start Backend Server

```bash
cd server
npm start
```

You should see:
```
🚀 Booking server running on http://localhost:3000
✅ Google Calendar API initialized
```

### 5. Start Frontend Server

In a new terminal:

```bash
cd /Users/pallavi.gujrati/Projects/roots_dental
python3 -m http.server 8000
```

### 6. Test It!

1. Open http://localhost:8000
2. Click "Book Appointment"
3. Fill in the form
4. Select a date
5. Choose a time slot
6. Submit!

The appointment will appear in your Google Calendar! 🎉

**Note:** Patient email confirmations are not automatic (service account limitation). You'll get reminder emails before appointments, but you'll need to manually confirm bookings with patients.

## Common Issues

### ❌ "Calendar service unavailable"

**Fix:** Check that `service-account-key.json` is in the `server/` folder

### ❌ "Failed to fetch availability"

**Fix:** Make sure the backend server is running on port 3000

### ❌ "No time slots available"

**Fix:** 
- Select today or a future date
- Check business hours in `server/config.js` (default: 9 AM - 6 PM)

### ❌ "CORS error" in browser console

**Fix:** Make sure frontend runs on port 8000 or update `corsOrigin` in `server/config.js`

## Customization

### Change Business Hours

Edit `server/config.js`:

```javascript
businessHours: {
	start: 8,   // 8 AM
	end: 20,    // 8 PM
	timezone: 'Europe/Copenhagen'
}
```

### Change Slot Duration

```javascript
slotDuration: 45,  // 45-minute slots instead of 30
```

### Add More Treatment Options

Edit `index.html` line ~250:

```html
<option value="Your New Treatment">Your New Treatment</option>
```

## File Structure

```
roots_dental/
├── server/
│   ├── package.json           # Dependencies
│   ├── config.js              # Configuration
│   ├── server.js              # Backend API
│   ├── service-account-key.json  # Your credentials (never commit!)
│   └── README.md              # Detailed docs
├── js/
│   ├── booking.js             # New! Booking logic
│   ├── main.js                # Updated modal functions
│   └── ...
├── index.html                 # Updated with booking form
└── css/
    └── page-components.css    # New booking form styles
```

## What's Next?

- Test bookings with real email addresses
- Customize treatment options
- Adjust business hours for your clinic
- Add holidays/blocked dates (coming soon)

## Need Help?

Check `server/README.md` for:
- Detailed API documentation
- Production deployment guide
- Advanced configuration options
- Troubleshooting guide

---

**Built with ❤️ for Roots Dental**
