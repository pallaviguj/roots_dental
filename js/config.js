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
    tagline: 'Professional dental care with a gentle touch',
    establishedYear: '2008',

    // Doctor
    doctorName: 'Dr. Aarti Bohora',
    doctorQualifications: 'BDS, MDS, Ph.D',
    doctorExperience: '15+',
    doctorSpecialization: 'Conservative Dentistry & Endodontics',

    // Contact
    phoneDisplay: '+91 7020054267',
    phoneRaw: '917020054267',
    email: 'pallavi.gujrati@gmail.com',
    ownerEmail: 'pallavi.gujrati@gmail.com', // Calendar invites sent here
    addressFull: '472, Bohora Bhavan, Near Jain Dharmarth Hospital (opposite Raspco Café & Somani Courier), Raviwar Peth, Nashik, Maharashtra, 422001',
    mapUrl: 'https://maps.app.goo.gl/zoBfu8D4zgYvfPKD6',
    hoursWeekdays: 'Mon-Sat: 10am - 1pm | 5pm - 9pm',
    hoursWeekend: 'Sun: Closed',

    // Social Media
    social: {
        facebook: {
            url: 'https://facebook.com/rootsdentalspecialityclinic',
            label: 'Facebook'
        },
        instagram: {
            url: 'https://instagram.com/rootsdentalspecialityclinic',
            label: 'Instagram'
        }
    },

    // Section Titles
    sectionTrust: 'Trusted by patients across Nashik',
    sectionServices: 'Our Services',
    sectionAbout: 'About Us',
    sectionAchievements: 'Achievements & Awards',
    sectionContact: 'Contact Us',
    sectionReviews: 'What Our Patients Say',
    sectionGallery: 'Our Gallery',

    // Hero
    heroTitle: 'I get to the Root of the problem.',
    heroHighlightWord: 'Root',
    heroSubtitle: 'Professional dental care with a gentle touch in a comfortable environment',
    heroCta: 'Book Appointment',

    // About
    aboutText: `Your oral health is our top priority. Led by an experienced team with 15+ years of expertise, we provide comprehensive dental care using the latest technology and modern techniques. Our facility is equipped to handle all aspects of dentistry including Cosmetic Dentistry, Root Canal Treatments, Emergency Dentistry, Implantology, Periodontology, Prosthodontics, Orthodontics, and Facial Aesthetic Treatments. Whether you're here for a routine check-up or a complex procedure, we're committed to delivering a sound and soothing experience that prioritizes both your comfort and long-term oral health.`,
    aboutTagline: 'We aim to ensure the natural and beautiful look be the top most priority without anyone noticing the difference.',

    // Footer
    footerDescription: 'Gone are the days of sounds of the drill, feeling nauseated in the smelly premises. Book your seat today in a clutter free, soothing and sophisticated experience of turning your fear into glory. Be fearless and let us make your smile brighter.',
    footerQuickLinksHeading: 'Quick Links',
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
    themeDefault: 'dark',
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
    navLinks: [
        { text: 'Home', href: 'home' },
        { text: 'Services', href: 'services' },
        { text: 'About', href: 'about' },
        { text: 'Contact', href: 'contact' },
        { text: 'Gallery', href: 'gallery' }
    ],

    trustIndicators: [
        { value: '15+', label: 'Years Experience' },
        { value: '5000+', label: 'Happy Patients' },
        { value: 'Ph.D.', label: 'Qualified' },
        { value: 'Award', label: 'Winning' }
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
            award: 'Winner',
            category: 'Excellence in conservative dentistry & endodontics'
        },
        {
            event: 'Indian Dental Divas, February 2019',
            award: 'Winner',
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
            award: 'Winner',
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
            award: '1st prize in Poster Presentation',
            event: '23rd FODI & IES National Conference, Chandigarh, 2008'
        },
        {
            award: '1st prize in Paper Presentation',
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
            award: 'Gold Medalist',
            event: 'IDA Conference, Ludhiana, 2003 (Sport)'
        },
        {
            title: 'Distinction',
            details: 'In various B.D.S. subjects'
        },
        {
            title: 'Presented Scientific Papers & Posters',
            details: 'In National Endodontic Conferences'
        },
        {
            title: 'Attended Multiple National & International Endodontic Conferences'
        }
    ],

    footerQuickLinks: [
        { text: 'Home', href: 'home' },
        { text: 'Our Services', href: 'services' },
        { text: 'About Us', href: 'about' },
        { text: 'Contact Us', href: 'contact' },
        { text: 'Book Appointment', href: '#', onclick: 'openAppointmentModal()' }
    ]
};
