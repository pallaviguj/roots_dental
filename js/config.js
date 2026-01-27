/**
 * Site Configuration & Variables
 * Single source of truth - Define once, use everywhere
 */

// ========================================
// SITE VARIABLES (Like CSS Custom Properties)
// ========================================

const site = {
    // Business
    businessName: 'Roots Dental Speciality Clinic',
    tagline: 'We get to the Root of the problem.',
    establishedYear: '2008',

    // Doctor
    doctorName: 'Dr. Aarti Bohora',
    doctorQualifications: 'BDS, MDS, Ph.D',
    doctorQuote: 'Everybody does root canal, doing it gracefully is my expertise©',
    doctorExperience: '15+',
    doctorSpecialization: 'Conservative Dentistry & Endodontics',

    // Contact
    phoneDisplay: '+91 7020054267',
    phoneRaw: '917020054267',
    email: 'rootsdentalspeciality@gmail.com', // Display email
    bookingEmail: 'pallavi.gujrati@gmail.com', // Booking/Calendar email only
    ownerEmail: 'pallavi.gujrati@gmail.com', // Calendar invites sent here (same as bookingEmail)
    addressFull: '472, Bohora Bhavan, Near Jain Dharmarth Hospital (opposite Raspco Café & Somani Courier), Raviwar Peth, Nashik, Maharashtra, 422001',
    landmark: 'From Ashok stambh to ravivar karanja - First right turn and then first left turn',
    mapUrl: 'https://maps.app.goo.gl/zoBfu8D4zgYvfPKD6',
    hoursWeekdays: 'Mon-Sat: 10am - 1pm | 5pm - 9pm',
    hoursWeekend: 'Sun: <strong>Closed</strong>',

    // Social Media
    social: {
        facebook: {
            url: 'https://facebook.com/draartibohora/',
            label: 'Facebook'
        },
        instagram: {
            url: 'https://instagram.com/rootsdentalspecialityclinic',
            label: 'Instagram'
        },
        linkedin: {
            url: 'https://linkedin.com/in/dr-aarti-bohora-59b51b68/',
            label: 'LinkedIn'
        }
    },

    // Section Titles
    sectionTrust: 'Trusted by patients across Nashik',
    sectionServices: 'Our Services',
    sectionFacility: 'Explore Our Facility',
    sectionAbout: 'About Us',
    sectionReviews: 'What Our Patients Say',
    sectionExpert: 'Meet our Expert',
    sectionAchievements: 'Achievements & Awards',
    sectionContact: 'Contact Us',

    // Reviews Widget
    elfsightWidgetId: '952e9a06-e58c-4631-9306-d3393f926a09', // Your Elfsight Google Reviews widget ID

    // Hero
    heroTitle: 'We get to the Root of the problem.',
    heroHighlightWord: 'Root',
    heroSubtitle: 'Modern dental care, made simple',
    heroCallText: 'Call us at',
    heroCta: 'Book Appointment',
    heroCustomersText: 'Trusted by happy & satisfied patients',
    heroCustomerImages: [
        { src: 'images/gallery-5.png', alt: 'Happy patient 5' },
        { src: 'images/gallery-1.png', alt: 'Happy patient 1' },
        { src: 'images/gallery-2.png', alt: 'Happy patient 2' },
        { src: 'images/image_doctor.png', alt: 'Dr. Aarti Bohora' },
        { src: 'images/gallery-4.png', alt: 'Happy patient 4' }
    ],

    // About (Meet Our Expert section)
    aboutText: `"Form follows function". Esthetics should complement and enhance functionality. Our motto is to provide modern microscopic dentistry with personalized care in a calm and relaxed environment. Saving what is natural because teeth have feelings too! As distinctive as you are, we are committed to dental excellence for you.`,

    // About Us (New section with gallery)
    aboutUsTitle1: 'What sets us apart',
    aboutUsText1: `Roots Dental Speciality Clinic is thoughtfully designed with modern interiors and advanced dental equipment to give you the best possible care in a comfortable and welcoming environment.`,
    aboutUsText2: `We provide complete dental care under one roof, including Cosmetic dentistry, Root canal treatments, Emergency, Implantology, Periodontology, Prosthodontics, Orthodontics, and Facial aesthetic treatments.`,
    aboutUsTitle2: 'Our commitment',
    aboutUsText3: 'We understand that visiting a dentist can be stressful. At Roots Dental Speciality Clinic, we make sure you feel calm, safe, and cared for from the moment you walk-in. Say goodbye to fear, pain, and discomfort. Trust us with your smile, and let us help you smile brighter with confidence.',

    // About Us Gallery Images
    // About Us Grid Images (4 images)
    aboutUsGalleryImages: [
        { src: 'images/expert_bg.png', alt: 'Dr. Aarti Bohora' },
        { src: 'images/about_us.png', alt: 'About Us' },
        { src: 'images/gallery-5.png', alt: 'Treatment Room' },
        { src: 'images/gallery-6.png', alt: 'Dental Equipment' }
    ],

    // Facility Carousel Images (6 images)
    facilityCarouselImages: [
        { src: 'images/image_doctor.png', alt: 'Dr. Aarti Bohora' },
        { src: 'images/about_us.png', alt: 'About Us' },
        { src: 'images/gallery-5.png', alt: 'Treatment Room' },
        { src: 'images/gallery-6.png', alt: 'Dental Equipment' },
        { src: 'images/gallery-1.png', alt: 'Dental Facility' },
        { src: 'images/gallery-4.png', alt: 'Modern Equipment' }
    ],

    // Footer
    footerContactHeading: 'Contact Info',
    copyrightYear: '© 2026',
    copyrightText: 'All rights reserved.',
    linkPrivacyPolicy: 'Privacy Policy',
    linkTermsOfService: 'Terms of Service',

    // Contact Labels
    labelPhone: 'Phone:',
    labelEmail: 'Email:',
    labelAddress: 'Address:',
    labelHours: 'Hours:',

    // Buttons
    btnBookAppointment: 'Book Appointment',

    // Theme
    themeDefault: 'light',
    themeDark: {
        icon: '🌙',
        label: 'Dark'
    },
    themeLight: {
        icon: '☀️',
        label: 'Light'
    },

    // Appointment Booking
    appointmentSectionTitle: 'Book an Appointment',

    // WhatsApp
    whatsappMessage: 'Hello, I would like to book an appointment.',
    whatsappTooltip: 'Chat with us on WhatsApp',

    // CMS
    cmsPlaceholder: 'CMS system - Full implementation coming soon'
};

// ========================================
// DYNAMIC DATA (Arrays/Objects)
// ========================================

const data = {
    // Navigation Links
    trustIndicators: [
        { value: '15+', label: 'Years Experience' },
        { value: 'Ph.D.', label: 'Qualified' },
        { value: 'Award', label: 'Winning' },
        { value: '5000+', label: 'Patients' },

    ],

    services: [
        {
            name: 'Microscopic Dentistry',
            description: 'Advanced diagnostics and precision treatment using cutting-edge dental microscopes.'
        },
        {
            name: 'Root Canal Treatments',
            description: 'Expert care to save natural teeth and eliminate pain with minimally invasive techniques.'
        },
        {
            name: 'Restorative Dentistry',
            description: 'Rebuilding and strengthening damaged teeth for lasting function and aesthetics.'
        },
        {
            name: 'Cosmetic Dentistry',
            description: 'Enhancing your smile with personalized, natural-looking aesthetic treatments.'
        }
    ],

    achievements: [
        {
            event: 'Indian Health Professional Awards, January 2019',
            award: '🏆 Winner',
            category: 'Excellence in conservative dentistry & endodontics'
        },
        {
            event: 'Indian Dental Divas, February 2019',
            award: '🏆 Winner',
            category: 'Best specialist (endodontist) of the year'
        },
        {
            event: 'Famdent Dental Awards 2018',
            award: 'Nominated',
            category: 'Best Endodontist of the Year'
        },
        {
            title: 'Ph.D. (Conservative Dentistry and Endodontics)',
            details: '2018, Pacific University, Rajasthan'
        },
        {
            event: 'Indian Health Professional Awards, December 2017',
            award: '🏆 Winner',
            category: 'Excellence in dental research'
        },
        {
            title: 'Lifetime Active Member',
            details: 'Indian Endodontic Society (Membership ID: AA42)'
        },
        {
            title: 'Member',
            details: 'Indian Association of Conservative Dentistry and Endodontics'
        },
        {
            title: 'Chairperson',
            details: 'Vishakha Committee at SMBT IDSR, Dhamangaon, Nasik'
        },
        {
            award: '🥇 1st prize in Poster Presentation',
            event: '23rd FODI & IES National Conference, Chandigarh, 2008'
        },
        {
            award: '🥇 1st prize in Paper Presentation',
            event: 'Y.M.T. Dental College PG Convention, 2009'
        },
        {
            award: 'Colgate Scholarship',
            event: 'Nasik IDA 2007'
        },
        {
            award: 'Overall Topper',
            event: '2006, MGV\'s K.B.H. Dental College & Hospital, Nasik'
        },
        {
            award: 'Suresh Gupta Trophy',
            event: '2006'
        },
        {
            award: '🥇 Gold Medalist',
            event: 'IDA Conference, Ludhiana, 2003 (Sport)'
        },
        {
            title: 'Presented Scientific Papers & Posters',
            details: 'In National Endodontic Conferences'
        },
        {
            title: 'Attended Multiple National & International Endodontic Conferences'
        }
    ],

};

// Export for ES6 modules
export { site, data };
