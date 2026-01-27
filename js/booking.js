// Booking System - Frontend
const BOOKING_API = 'http://localhost:3000';

let selectedDate = null;
let selectedSlot = null;

// Initialize booking system
function initBookingSystem() {
	const datePicker = document.getElementById('appointmentDate');
	if (datePicker) {
		// Set min date to today
		const today = new Date().toISOString().split('T')[0];
		datePicker.min = today;
		
		// Set max date to 3 months from now
		const maxDate = new Date();
		maxDate.setMonth(maxDate.getMonth() + 3);
		datePicker.max = maxDate.toISOString().split('T')[0];
		
		datePicker.addEventListener('change', handleDateChange);
	}
}

// Handle date selection
async function handleDateChange(e) {
	selectedDate = e.target.value;
	selectedSlot = null;
	
	const slotsContainer = document.getElementById('timeSlots');
	const errorContainer = document.getElementById('slotsError');
	
	if (!slotsContainer) return;
	
	// Show loading state
	slotsContainer.innerHTML = '<p class="loading">Loading available time slots...</p>';
	errorContainer.style.display = 'none';
	
	try {
		const response = await fetch(`${BOOKING_API}/api/availability?date=${selectedDate}`);
		const data = await response.json();
		
		if (!response.ok) {
			throw new Error(data.error || 'Failed to fetch availability');
		}
		
		if (data.slots.length === 0) {
			slotsContainer.innerHTML = '<p class="no-slots">No available time slots for this date. Please select another date.</p>';
			return;
		}
		
		// Render time slots
		renderTimeSlots(data.slots);
		
	} catch (error) {
		errorContainer.textContent = 'Failed to load available time slots. Please try again.';
		errorContainer.style.display = 'block';
		slotsContainer.innerHTML = '';
	}
}

// Convert 24-hour time to 12-hour am/pm format
function formatTime12Hour(time24) {
	const [hours, minutes] = time24.split(':');
	const hour = parseInt(hours);
	const ampm = hour >= 12 ? 'pm' : 'am';
	const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
	return `${displayHour}:${minutes} ${ampm}`;
}

// Render time slots
function renderTimeSlots(slots) {
	const container = document.getElementById('timeSlots');
	if (!container) return;
	
	container.innerHTML = '';
	
	const grid = createElement('div', { className: 'time-slots-grid' });
	
	slots.forEach(slot => {
		const button = createElement('button', {
			type: 'button',
			className: 'time-slot-btn',
			textContent: formatTime12Hour(slot.display)
		});
		
		button.addEventListener('click', () => selectTimeSlot(slot, button));
		grid.appendChild(button);
	});
	
	container.appendChild(grid);
}

// Handle time slot selection
function selectTimeSlot(slot, buttonElement) {
	// Remove active class from all buttons
	document.querySelectorAll('.time-slot-btn').forEach(btn => {
		btn.classList.remove('active');
	});
	
	// Add active class to selected button
	buttonElement.classList.add('active');
	
	// Store selected slot
	selectedSlot = slot;
	
	// Enable submit button
	const submitBtn = document.getElementById('bookingSubmitBtn');
	if (submitBtn) submitBtn.disabled = false;
}

// Handle form submission
async function handleBookingSubmit(e) {
	e.preventDefault();
	
	const form = e.target;
	const submitBtn = document.getElementById('bookingSubmitBtn');
	const errorContainer = document.getElementById('bookingError');
	
	if (!selectedDate || !selectedSlot) {
		errorContainer.textContent = 'Please select a date and time slot';
		errorContainer.style.display = 'block';
		return;
	}
	
	// Get form data
	const bookingData = {
		name: form.name.value.trim(),
		email: form.email.value.trim(),
		phone: form.phone.value.trim(),
		treatment: form.treatment.value,
		startTime: selectedSlot.start,
		endTime: selectedSlot.end
	};
	
	// Validation
	if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.treatment) {
		errorContainer.textContent = 'Please fill in all required fields';
		errorContainer.style.display = 'block';
		return;
	}
	
	// Disable submit button
	submitBtn.disabled = true;
	submitBtn.textContent = 'Booking...';
	errorContainer.style.display = 'none';
	
	try {
		const response = await fetch(`${BOOKING_API}/api/book`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(bookingData)
		});
		
		const data = await response.json();
		
		if (!response.ok) {
			throw new Error(data.message || data.error || 'Booking failed');
		}
		
		// Success!
		showBookingSuccess(bookingData);
		form.reset();
		selectedDate = null;
		selectedSlot = null;
		document.getElementById('timeSlots').innerHTML = '';
		
	} catch (error) {
		errorContainer.textContent = error.message;
		errorContainer.style.display = 'block';
		submitBtn.disabled = false;
		submitBtn.textContent = 'Book Appointment';
		
		// Refresh availability if slot was taken
		if (error.message.includes('already booked')) {
			handleDateChange({ target: { value: selectedDate } });
		}
	}
}

// Show success message
function showBookingSuccess(data) {
	const modal = document.getElementById('appointmentModal');
	const modalContent = modal.querySelector('.modal-content');
	
	// Format date from YYYY-MM-DD to DD-MM-YYYY
	const [year, month, day] = selectedDate.split('-');
	const formattedDate = `${day}-${month}-${year}`;

	// Format time to 12-hour AM/PM
	const formattedTime = formatTime12Hour(selectedSlot.display);

	modalContent.innerHTML = `
		<button class="modal-close" onclick="closeAppointmentModal()">&times;</button>
		<div class="booking-success">
			<div class="success-icon">✓</div>
			<h2>Appointment Booked!</h2>
			<p>Your appointment has been successfully scheduled.</p>
		<div class="booking-details">
			<p><strong>Name:</strong> ${data.name}</p>
			<p><strong>Date:</strong> ${formattedDate}</p>
			<p><strong>Time:</strong> ${formattedTime}</p>
			<p><strong>Treatment:</strong> ${data.treatment}</p>
		</div>
	</div>
	`;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	initBookingSystem();
	
	const bookingForm = document.getElementById('bookingForm');
	if (bookingForm) {
		bookingForm.addEventListener('submit', handleBookingSubmit);
	}
});
