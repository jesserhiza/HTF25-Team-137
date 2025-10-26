// CBIT Campus Data - Kokapet, Hyderabad
// Coordinates are approximate for CBIT campus (17.3955° N, 78.3195° E)

const CAMPUS_CENTER = [17.39168902350738, 78.31941362658041];

const campusLocations = [
    // Academic Buildings
    {
        id: 1,
        name: "Main Academic Block",
        category: "academic",
        coordinates: [17.392238250322446, 78.31959472310639],
        description: "Central academic building with classrooms and lecture halls",
        facilities: ["Classrooms", "Lecture Halls", "Faculty Rooms"],
        icon: "fa-graduation-cap",
        buildingCode: "MAB"
    },
    {
        id: 2,
        name: "CFD Lab",
        category: "academic",
        coordinates: [17.39212305793496, 78.3185803719147],
        description: "Computational Fluid Dynamics laboratory used by Mechanical Engineering students.",
        facilities: ["High-performance systems", "simulation tools", "research terminals"],
        icon: "fa-laptop-code",
        buildingCode: "MECH-CDF"
    },
    {
        id: 3,
        name: "ECE Department",
        category: "academic",
        coordinates: [17.391034651810568, 78.31859553929017],
        description: "Electronics & Communication Engineering Department",
        facilities: ["Digital Lab", "Analog Lab", "Communication Lab", "VLSI Lab"],
        icon: "fa-microchip",
        buildingCode: "ECE"
    },
    {
        id: 4,
        name: "EEE Department",
        category: "academic",
        coordinates: [17.391404786774388, 78.31920561809743],
        description: "Electrical & Electronics Engineering Department",
        facilities: ["Power Systems Lab", "Machines Lab", "Control Systems Lab"],
        icon: "fa-bolt",
        buildingCode: "EEE"
    },
    {
        id: 5,
        name: "ACIC",
        category: "academic",
        coordinates: [17.39276603340545, 78.31855888557979],
        description: "Atal Community Innovation Center supporting student startups and innovation projects.",
        facilities: ["Innovation labs", "incubation rooms", "meeting halls"],
        icon: "fa-lightbulb",
        buildingCode: "ACIC"
    },
    {
        id: 6,
        name: "PG Department",
        category: "academic",
        coordinates: [17.391601852372023, 78.3206085715743],
        description: "Postgraduate academic block for M.Tech and research scholars, equipped with seminar rooms and labs.",
        facilities: ["Faculty cabins", "research labs", "seminar halls", "Wi-Fi"],
        icon: "fa-graduation-cap",
        buildingCode: "PGD"
    },
    {
        id: 7,
        name: "PG Block",
        category: "academic",
        coordinates: [17.39131080173186, 78.31992655909431],
        description: "Main Postgraduate Block that hosts M.Tech classes, project labs, and research spaces for advanced studies.",
        facilities: ["Classrooms", "Research Labs", "Faculty Cabins", "Seminar Hall", "Wi-Fi"],
        icon: "fa-university",
        buildingCode: "PG-BLK"
    },
    {
        id: 8,
        name: "Department of Mathematics and Humanities",
        category: "academic",
        coordinates: [17.39100365024519, 78.31971198236796],
        description: "Department offering foundational courses in mathematics, physics, and humanities, supporting all engineering programs.",
        facilities: ["Faculty Offices", "Classrooms", "Seminar Hall", "Resource Center"],
        icon: "fa-square-root-alt",
        buildingCode: "MATH-HUM"
    },
    {
        id: 9,
        name: "Central Library",
        category: "academic",
        coordinates: [17.391491197050062, 78.31810506243383],
        description: "Well-stocked library with digital resources and reading halls",
        facilities: ["Reading Halls", "Digital Library", "Reference Section", "Journals"],
        icon: "fa-book",
        buildingCode: "LIB"
    },
    
    // Administrative Buildings
    {
        id: 10,
        name: "Administrative Block",
        category: "administrative",
        coordinates: [17.391875274673055, 78.32030334091498],
        description: "Main administrative offices and principal's office",
        facilities: ["Principal Office", "Admin Office", "Accounts", "HR Department"],
        icon: "fa-building",
        buildingCode: "ADMIN"
    },
    {
        id: 11,
        name: "Examination Cell",
        category: "administrative",
        coordinates: [17.391824607657007, 78.31890646573211],
        description: "Examination branch for all exam-related queries",
        facilities: ["Exam Registration", "Results", "Certificates"],
        icon: "fa-file-alt",
        buildingCode: "EXAM"
    },
    {
        id: 12,
        name: "Placement Cell",
        category: "administrative",
        coordinates: [17.391087494681845, 78.32052476890149],
        description: "Training and Placement Department",
        facilities: ["Interview Rooms", "Pre-placement Training", "Company Interactions"],
        icon: "fa-briefcase",
        buildingCode: "PLACEMENT"
    },
    
    // Facilities
    {
        id: 13,
        name: "Auditorium",
        category: "facilities",
        coordinates: [17.391475152301133, 78.31921767054074],
        description: "Main auditorium with 1000+ seating capacity",
        facilities: ["Main Hall", "Green Rooms", "Audio-Visual Equipment"],
        icon: "fa-theater-masks",
        buildingCode: "AUD"
    },
    {
        id: 14,
        name: "Gym",
        category: "sports",
        coordinates: [17.391417257069072, 78.31798874640208],
        description: "Campus gym for physical fitness and training activities.",
        facilities: ["Cardio Section", "Weightlifting Area", "Trainers Available"],
        icon: "fa-dumbbell",
        buildingCode: "GYM"
    },
    {
        id: 15,
        name: "Spandana CBIT",
        category: "food",
        coordinates: [17.391546081476275, 78.31997516823667],
        description: "Popular campus canteen offering snacks, meals, and beverages for students and staff.",
        facilities: ["Seating Area", "Self-Service Counter", "Hygiene-Certified Kitchen"],
        icon: "fa-utensils",
        buildingCode: "SPANDANA"
    },
    {
        id: 16,
        name: "AI Washroom",
        category: "facilities",
        coordinates: [17.391921409663343, 78.31974785271396],
        description: "Restroom facility located near the Artificial Intelligence department for students and staff",
        facilities: ["Separate washrooms for men and women", "regular maintenance", "hand wash area"],
        icon: "fa-restroom",
        buildingCode: "AI-WC"
    },
    
    // Hostels
    {
        id: 17,
        name: "Main Hostel Block",
        category: "hostel",
        coordinates: [17.394101240879735, 78.31926480381394],
        description: "Accommodation for male students",
        facilities: ["Rooms", "Common Room", "Study Hall", "Mess"],
        icon: "fa-bed",
        buildingCode: "BH-A"
    },
    {
        id: 18,
        name: "Boys Hostel Block B",
        category: "hostel",
        coordinates: [17.3868091811601, 78.32072414178532],
        description: "Accommodation for male students",
        facilities: ["Rooms", "Common Room", "Study Hall", "Mess"],
        icon: "fa-bed",
        buildingCode: "BH-B"
    },
    {
        id: 19,
        name: "Girls Hostel",
        category: "hostel",
        coordinates: [17.38735451046822, 78.32117850605196],
        description: "Secure accommodation for female students",
        facilities: ["Rooms", "Common Room", "Study Hall", "Mess", "24x7 Security"],
        icon: "fa-bed",
        buildingCode: "GH"
    },
    
    // Sports Facilities
    {
        id: 20,
        name: "Sports Complex",
        category: "sports",
        coordinates: [17.391117624073136, 78.31801322954222],
        description: "Indoor sports facilities",
        facilities: ["Badminton Courts", "Table Tennis", "Chess Room", "Carrom"],
        icon: "fa-dumbbell",
        buildingCode: "SPORTS"
    },
    {
        id: 21,
        name: "Cricket Ground",
        category: "sports",
        coordinates: [17.390385165657648, 78.31825521223071],
        description: "Cricket practice ground with nets",
        facilities: ["Cricket Pitch", "Practice Nets", "Pavilion"],
        icon: "fa-baseball-ball",
        buildingCode: "CRICKET"
    },
    {
        id: 22,
        name: "Basketball Court",
        category: "sports",
        coordinates: [17.39111470845249, 78.3180115083848],
        description: "Outdoor basketball court",
        facilities: ["Main Court", "Practice Area"],
        icon: "fa-basketball-ball",
        buildingCode: "BB"
    },
    {
        id: 23,
        name: "Volleyball Court",
        category: "sports",
        coordinates: [17.39046321626034, 78.31925135876594],
        description: "Outdoor volleyball court",
        facilities: ["Main Court", "Practice Area"],
        icon: "fa-volleyball-ball",
        buildingCode: "VB"
    },
    {
        id: 24,
        name: "Football Ground",
        category: "sports",
        coordinates: [17.390044621238644, 78.31968496149001],
        description: "Football field with goal posts",
        facilities: ["Main Field", "Practice Area"],
        icon: "fa-futbol",
        buildingCode: "FB"
    },
    
    // Food Courts
    {
        id: 25,
        name: "Main Canteen",
        category: "food",
        coordinates: [17.391027855663648, 78.32050808632101],
        description: "Primary food court with variety of cuisines",
        facilities: ["South Indian", "North Indian", "Chinese", "Snacks", "Beverages"],
        icon: "fa-pizza-slice",
        buildingCode: "CANTEEN"
    },
    {
        id: 26,
        name: "Restaurant",
        category: "food",
        coordinates: [17.389886961814476, 78.31708591333776],
        description: "Additional food court near academic blocks",
        facilities: ["Biryani", "Drinks", "Bakery"],
        icon: "fa-utensils",
        buildingCode: "RESTAURANT"
    },
    {
        id: 27,
        name: "Coffee House",
        category: "food",
        coordinates: [17.390330681977062, 78.32556882922204],
        description: "Cafe for coffee and snacks",
        facilities: ["Coffee", "Tea", "Snacks", "Wi-Fi"],
        icon: "fa-coffee",
        buildingCode: "CAFE"
    },
    
    // Emergency Services
    {
        id: 28,
        name: "Health Center",
        category: "facilities",
        coordinates: [17.38821435200724, 78.32772240432259],
        description: "Medical facility with first aid and basic healthcare",
        facilities: ["First Aid", "Doctor", "Nurse", "Ambulance Service"],
        icon: "fa-hospital",
        buildingCode: "HEALTH",
        isEmergency: true,
        emergencyType: "medical"
    },
    {
        id: 29,
        name: "Security Office",
        category: "administrative",
        coordinates: [17.426506599558284, 78.34080151332181],
        description: "Campus security headquarters",
        facilities: ["24x7 Security", "CCTV Monitoring", "Emergency Response"],
        icon: "fa-shield-alt",
        buildingCode: "SECURITY",
        isEmergency: true,
        emergencyType: "security"
    },
    {
        id: 30,
        name: "Fire Safety Station",
        category: "facilities",
        coordinates: [17.4260142990807, 78.3350266705035],
        description: "Fire safety equipment and emergency response",
        facilities: ["Fire Extinguishers", "Emergency Exit Maps", "Safety Equipment"],
        icon: "fa-fire-extinguisher",
        buildingCode: "FIRE",
        isEmergency: true,
        emergencyType: "fire"
    },
    
    // Other Important Locations
    {
        id: 31,
        name: "Main Gate",
        category: "facilities",
        coordinates: [17.39372625387788, 78.31996305491381],
        description: "Primary entrance to CBIT campus",
        facilities: ["Security Check", "Visitor Registration"],
        icon: "fa-door-open",
        buildingCode: "GATE1"
    },
    {
        id: 32,
        name: "bike point",
        category: "facilities",
        coordinates: [17.392280041248927, 78.32107461489414],
        description: "Vehicle parking for students and staff",
        facilities: ["Two Wheeler Parking", "Four Wheeler Parking"],
        icon: "fa-parking",
        buildingCode: "PARK-A"
    },
    {
        id: 33,
        name: "car point",
        category: "facilities",
        coordinates: [17.39255436912245, 78.31984982048945],
        description: "Additional parking near hostels",
        facilities: ["Two Wheeler Parking", "Four Wheeler Parking"],
        icon: "fa-parking",
        buildingCode: "PARK-B"
    },
    {
        id: 34,
        name: "Bank & ATM",
        category: "facilities",
        coordinates: [17.386920049757318, 78.31646360192737],
        description: "Banking facilities on campus",
        facilities: ["ATM", "Bank Branch"],
        icon: "fa-university",
        buildingCode: "BANK"
    },
    {
        id: 35,
        name: "Post Office",
        category: "facilities",
        coordinates: [17.393451352244387, 78.31946438997245],
        description: "Postal services",
        facilities: ["Mail Service", "Courier"],
        icon: "fa-envelope",
        buildingCode: "POST"
    },
    {
        id: 36,
        name: "Stationery Store",
        category: "facilities",
        coordinates: [17.38502123998539, 78.32102461557781],
        description: "Books and stationery shop",
        facilities: ["Books", "Stationery", "Photocopying", "Printing"],
        icon: "fa-store",
        buildingCode: "STORE"
    },
    {
        id: 37,
        name: "Guest House",
        category: "facilities",
        coordinates: [17.394101240879735, 78.31926480381394],
        description: "Accommodation for visiting faculty and guests",
        facilities: ["Guest Rooms", "Conference Room", "Dining"],
        icon: "fa-hotel",
        buildingCode: "GUEST"
    },
    {
        id: 38,
        name: "Amphitheater",
        category: "facilities",
        coordinates: [17.38987161207598, 78.34380626500553],
        description: "Open-air theater for cultural events",
        facilities: ["Stage", "Seating", "Sound System"],
        icon: "fa-theater-masks",
        buildingCode: "AMPHI"
    },
    {
        id: 39,
        name: "Bus Bay",
        category: "facilities",
        coordinates: [17.392877456469954, 78.31906382856496],
        description: "Designated area for college buses and public transport drop-off",
        facilities: ["Sheltered Waiting Area", "Seating", "Notice Board"],
        icon: "fa-bus",
        buildingCode: "BUS"
    },
    {
        id: 40,
        name: "Red Rush Adventure Park",
        category: "sports",
        coordinates: [17.390676387559648, 78.31591883771864],
        description: "Outdoor adventure park offering recreational and team-building activities for students and visitors.",
        facilities: ["Rope Course", "Zipline", "Climbing Wall", "Obstacle Zone", "Rest Area"],
        icon: "fa-mountain",
        buildingCode: "REDRUSH"
    }
];

// Campus boundaries for CBIT
const campusBoundaries = [
    [17.3945, 78.3178],  // Northwest corner
    [17.3945, 78.3210],  // Northeast corner
    [17.3885, 78.3210],  // Southeast corner
    [17.3885, 78.3178],  // Southwest corner
    [17.3945, 78.3178]   // Close the square polygon
];

// Walking paths connections (simplified graph for routing)
const walkingPaths = [
    // Main paths connecting major buildings
    {from: 1, to: 2, distance: 50},
    {from: 1, to: 10, distance: 30},
    {from: 2, to: 3, distance: 40},
    {from: 3, to: 4, distance: 45},
    {from: 4, to: 5, distance: 60},
    {from: 5, to: 6, distance: 35},
    {from: 2, to: 7, distance: 35},
    {from: 7, to: 8, distance: 40},
    {from: 1, to: 9, distance: 55},
    {from: 9, to: 15, distance: 45},
    {from: 10, to: 11, distance: 25},
    {from: 11, to: 12, distance: 30},
    {from: 13, to: 14, distance: 40},
    {from: 25, to: 26, distance: 35},
    {from: 26, to: 27, distance: 30},
    {from: 17, to: 18, distance: 25},
    {from: 20, to: 21, distance: 45},
    {from: 21, to: 22, distance: 50},
    {from: 22, to: 23, distance: 30},
    {from: 23, to: 24, distance: 55},
    // Connections to emergency services
    {from: 1, to: 28, distance: 40},
    {from: 10, to: 29, distance: 50},
    {from: 5, to: 30, distance: 45}
];
