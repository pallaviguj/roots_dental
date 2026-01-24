// Server Configuration
module.exports = {
	port: process.env.PORT || 3000,
	
	// Google Calendar Configuration
	calendarId: 'pallavi.gujrati@gmail.com',
	
	// Service Account Credentials Path
	serviceAccountPath: './service-account-key.json',
	
	// Business Hours
	businessHours: {
		start: 9,  // 9 AM
		end: 18,   // 6 PM
		timezone: 'Europe/Copenhagen'
	},
	
	// Appointment Configuration
	slotDuration: 30, // minutes
	
	// CORS Configuration
	corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:8000'
};
