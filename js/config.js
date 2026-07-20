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
    doctorQualifications: 'BDS, MDS, Ph.D., Diplomate Indian Board of Endodontics',
    doctorQuote: 'Everybody does root canal, doing it gracefully is my expertise©',
    doctorBio1: `"Form follows function." In endodontics, biology leads and aesthetics follows. Every treatment begins with preserving strength, eliminating infection, and respecting the natural architecture of your tooth.`,
    doctorBio2: `Our philosophy is rooted in modern microscopic treatment, with meticulous precision and personalized care. Our approach is minimally invasive, biologically driven, and designed for long-term success — all delivered in a calm, comfortable, and reassuring environment.`,
    doctorBio3: `Whenever possible, we believe in saving what is natural, because preserving your own tooth is always the best foundation for lasting oral health. As distinctive as you are, we remain committed to uncompromising dental excellence — restoring health, comfort, and confidence, one tooth at a time.`,
    doctorExperience: '15+',
    doctorSpecialization: 'Conservative Dentistry & Endodontics',

    // Contact
    phoneDisplay: '+91 70200 54267',
    phoneRaw: '917020054267',
    email: 'rootsdentalspeciality@gmail.com', // Display email
    bookingEmail: 'pallavi.gujrati@gmail.com', // Booking/Calendar email only
    ownerEmail: 'pallavi.gujrati@gmail.com', // Calendar invites sent here (same as bookingEmail)
    addressFull: '472, Bohora Bhavan,<br>Near Jain Dharmarth Hospital (opposite Raspco Café & Somani Courier),<br>Raviwar Peth, Nashik, Maharashtra, 422001',
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
    sectionAbout: 'About us',
    sectionReviews: 'What Our Patients Say',
    sectionExpert: 'Meet our Expert',
    sectionAchievements: 'Achievements & Awards',
    sectionContact: 'Contact us',

    // Reviews Widget
    elfsightWidgetId: '952e9a06-e58c-4631-9306-d3393f926a09', // Your Elfsight Google Reviews widget ID

    // Hero
    heroTitle: 'We get to the Root of the problem.',
    heroHighlightWord: 'Root',
    heroCallText: 'Call us at',
    heroCta: 'Book Appointment',
    heroYearsExperience: '15+',
    heroReviewsRating: '5.0',
    heroPatientsTreated: '5000+',
    heroCustomerImages: [
        { src: 'images/gallery-5.png', alt: 'Happy patient 5' },
        { src: 'images/gallery-1.png', alt: 'Happy patient 1' },
        { src: 'images/gallery-2.png', alt: 'Happy patient 2' },
        { src: 'images/image_doctor.png', alt: 'Dr. Aarti Bohora' },
        { src: 'images/gallery-4.png', alt: 'Happy patient 4' }
    ],


    
    // About Us
    aboutUsTitle1: 'What sets us apart',
    aboutUsText1: `Roots Dental Speciality Clinic is thoughtfully designed with modern interiors and advanced dental equipment to provide exceptional care in a comfortable, welcoming environment.`,
    aboutUsText1b: `We've proudly served the Nashik community from this same clinic for over 15 years. As a premium, patient-centered practice, we offer preventive, restorative, cosmetic, and root canal treatments along with advanced specialty care — all under one roof. Blending cutting-edge technology, clinical precision, strong ethics, and compassionate care, we are committed to creating healthy, confident smiles for life.`,
    aboutUsTitle2: 'Our Commitment',
    aboutUsText2: `At Roots Dental Speciality Clinic, our commitment is to deliver ethical, evidence-based, and patient-focused care with uncompromising precision. We prioritize preserving natural tooth structure, ensuring comfort at every step, and creating treatment plans tailored to individual needs. Through continuous learning, advanced technology, and a deep sense of responsibility toward our patients, we strive to provide dentistry that is transparent, trustworthy, and built for long-term oral health.`,

    // About Us Grid Images
    aboutUsGalleryImages: [
        { src: 'images/facility/expert_bg.png', alt: 'Dr. Aarti Bohora' },
        { src: 'images/facility/gallery-6.png', alt: 'Treatment Room' },
        { src: 'images/facility/hero_bg.png', alt: 'Clinic Interior' },
        { src: 'images/facility/20231209_110607.jpg', alt: 'Dental Facility' }
    ],

    // Facility Carousel Images (from images/facility/)
    facilityCarouselImages: [
        { src: 'images/facility/20231209_110607.jpg', alt: 'Dental Facility' },
        { src: 'images/facility/20251115_102432.jpg', alt: 'Dental Facility' },
        { src: 'images/facility/20251115_102625.jpg', alt: 'Dental Facility' },
        { src: 'images/facility/20251115_102849.jpg', alt: 'Dental Facility' },
        { src: 'images/facility/20251115_102910.jpg', alt: 'Dental Facility' },
        { src: 'images/facility/FB_IMG_1771312508576.jpg', alt: 'Dental Facility' },
        { src: 'images/facility/expert_bg.png', alt: 'Dr. Aarti Bohora' },
        { src: 'images/facility/gallery-6.png', alt: 'Dental Equipment' },
        { src: 'images/facility/hero_bg.png', alt: 'Clinic Interior' }
    ],

    // Footer
    footerContactHeading: 'Contact Us',
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
    services: [
        {
            slug: 'microscopic-dentistry',
            name: 'Microscopic Dentistry',
            description: 'Advanced diagnostics and precision treatment using cutting-edge dental microscopes.',
            intro: 'Microscopic dentistry involves the use of a cutting-edge dental operating microscope to enhance visibility and precision during treatment. This advanced technology allows us to identify fine details that are not visible to the naked eye. It enables us to perform with greater accuracy, minimal invasiveness, and improved long-term outcomes. Microscopic dentistry reflects our commitment to delivering meticulous, evidence-based care with the highest standards of safety and precision.',
            // images/services/microendo
            images: [
                { src: 'images/services/microendo/InShot_20211018_210248016.jpg', alt: 'Microscopic dentistry case' },
                { src: 'images/services/microendo/InShot_20211102_193748760.jpg', alt: 'Microscopic dentistry case' },
                { src: 'images/services/microendo/InShot_20211128_215952001.jpg', alt: 'Microscopic dentistry case' },
                { src: 'images/services/microendo/InShot_20220407_193101019.jpg', alt: 'Microscopic dentistry case' },
                { src: 'images/services/microendo/InShot_20220810_112433563.jpg', alt: 'Microscopic dentistry case' },
                { src: 'images/services/microendo/InShot_20230203_152453384.jpg', alt: 'Microscopic dentistry case' },
                { src: 'images/services/microendo/InShot_20250221_174620498.jpg', alt: 'Microscopic dentistry case' }
            ]
        },
        {
            slug: 'root-canal-treatments',
            name: 'Root Canal Treatments',
            description: 'Expert care to save natural teeth and eliminate pain with minimally invasive techniques.',
            intro: 'Root canal treatment is a specialized procedure designed to save a tooth that has been severely decayed, infected, or damaged. We aim to provide expert care to preserve your natural tooth with advanced techniques to provide painless, comfortable, minimally invasive treatment restoring long-term function and health with quality care.',
            // images/services/endo
            images: [
                { src: 'images/services/endo/InShot_20220407_193028567.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20220505_105856996.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20220530_093955098.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20220630_124933548.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20220812_083108571.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20220829_093106823.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20230111_081428248.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20230222_221000626.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20230305_121453479.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20230420_083139459.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20230714_142304433.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20230821_220033548.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20231007_220120502.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20250113_082921414.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20250404_214632346.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20250629_225104478.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20251004_161216199.jpg', alt: 'Root canal treatment case' },
                { src: 'images/services/endo/InShot_20260109_082838901.jpg', alt: 'Root canal treatment case' }
            ]
        },
        {
            slug: 'restorative-dentistry',
            name: 'Restorative Dentistry',
            description: 'Rebuilding and strengthening damaged teeth for lasting function and aesthetics.',
            intro: 'Restorative dentistry focuses on repairing and rebuilding teeth that are damaged due to decay, fractures, wear, or trauma. Using advanced adhesive techniques and tooth-coloured materials, we restore function and natural aesthetics while preserving maximum healthy tooth structure. Each restoration is crafted with precision, durability, and aesthetics, using minimally invasive techniques to ensure long-term strength, seamless integration with your natural smile, and lasting oral health.',
            // images/services/restorative
            images: [
                { src: 'images/services/restorative/InShot_20220210_180603634.jpg', alt: 'Restorative dentistry case' },
                { src: 'images/services/restorative/InShot_20220210_181013885.jpg', alt: 'Restorative dentistry case' },
                { src: 'images/services/restorative/InShot_20220210_193720204.jpg', alt: 'Restorative dentistry case' },
                { src: 'images/services/restorative/InShot_20220212_121704067.jpg', alt: 'Restorative dentistry case' },
                { src: 'images/services/restorative/InShot_20220212_122028362.jpg', alt: 'Restorative dentistry case' },
                { src: 'images/services/restorative/InShot_20220212_135445447.jpg', alt: 'Restorative dentistry case' },
                { src: 'images/services/restorative/InShot_20220212_135951144.jpg', alt: 'Restorative dentistry case' },
                { src: 'images/services/restorative/InShot_20220212_140152797.jpg', alt: 'Restorative dentistry case' },
                { src: 'images/services/restorative/InShot_20220809_213200263.jpg', alt: 'Restorative dentistry case' }
            ]
        },
        {
            slug: 'cosmetic-dentistry',
            name: 'Cosmetic Dentistry',
            description: 'Enhancing your smile with personalized, natural-looking aesthetic treatments.',
            intro: 'Cosmetic dentistry focuses on enhancing the appearance of your smile through safe, minimally invasive, and personalized treatments. Whether it is teeth whitening, veneers, smile designing, or aesthetic bonding, each procedure is carefully personalised while preserving natural tooth structure. Our goal is to create balanced, confident, and naturally beautiful smiles with precision, artistry, and long-lasting results.',
            // images/services/cosmetic
            images: [
                { src: 'images/services/cosmetic/20231107_192342.jpg', alt: 'Cosmetic dentistry case' },
                { src: 'images/services/cosmetic/20231221_070513.jpg', alt: 'Cosmetic dentistry case' },
                { src: 'images/services/cosmetic/InShot_20211104_103604108.jpg', alt: 'Cosmetic dentistry case' },
                { src: 'images/services/cosmetic/InShot_20211115_094142028.jpg', alt: 'Cosmetic dentistry case' },
                { src: 'images/services/cosmetic/InShot_20220212_122351906.jpg', alt: 'Cosmetic dentistry case' },
                { src: 'images/services/cosmetic/InShot_20220224_070512968.jpg', alt: 'Cosmetic dentistry case' },
                { src: 'images/services/cosmetic/InShot_20220409_210319566.jpg', alt: 'Cosmetic dentistry case' },
                { src: 'images/services/cosmetic/InShot_20221214_083812673.jpg', alt: 'Cosmetic dentistry case' },
                { src: 'images/services/cosmetic/InShot_20231106_082346644.jpg', alt: 'Cosmetic dentistry case' },
                { src: 'images/services/cosmetic/InShot_20231221_072017068.jpg', alt: 'Cosmetic dentistry case' },
                { src: 'images/services/cosmetic/InShot_20241127_200056454.jpg', alt: 'Cosmetic dentistry case' }
            ]
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
