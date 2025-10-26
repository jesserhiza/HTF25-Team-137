# CBIT Smart Campus Navigation System

## Overview
A comprehensive web-based navigation system for Chaitanya Bharathi Institute of Technology (CBIT) campus in Kokapet, Hyderabad. This system provides real-time navigation guidance, helping students, visitors, and staff navigate the large campus efficiently.

## Features

### 🗺️ Interactive Campus Map
- **Leaflet-powered map** with OpenStreetMap tiles
- **40+ campus locations** including academic buildings, administrative offices, hostels, sports facilities, and food courts
- **Custom markers** color-coded by category
- **Campus boundary** visualization

### 🔍 Smart Search & Filtering
- **Real-time search** for buildings, departments, and facilities
- **Category filters** for quick access to specific location types:
  - Academic Buildings
  - Administrative Offices
  - Facilities & Services
  - Hostels
  - Sports Complexes
  - Food Courts

### 🚨 Emergency Services
- **Quick access buttons** for emergency locations:
  - Medical Center / Health Services
  - Security Office
  - Fire Safety Station
- **Priority routing** for emergency situations

### 🧭 Navigation Features
- **Turn-by-turn routing** between any two campus locations
- **Distance and time estimation** for walking routes
- **Visual route display** on the map
- **GPS location tracking** (when enabled)
- **Starting point selection** - use current location or select on map

### 📱 Responsive Design
- **Mobile-friendly** interface
- **Fullscreen mode** for better map viewing
- **Touch-optimized** controls

### 🏢 Detailed Location Information
- Building descriptions
- Available facilities
- Building codes for easy identification
- Department-specific amenities

## Campus Locations Include

### Academic Buildings
- Main Academic Block
- CSE Department (Computer Labs, AI/ML Lab)
- ECE Department (Digital/Analog Labs)
- EEE Department (Power Systems Lab)
- Mechanical Department (CAD/CAM, Workshop)
- Civil Department (Surveying, Concrete Labs)
- IT Department (Network, Database Labs)
- MBA Block
- Biotechnology Department
- Chemical Engineering Department
- Central Library

### Administrative
- Administrative Block
- Examination Cell
- Placement Cell
- Security Office

### Facilities
- Auditorium (1000+ capacity)
- Seminar Halls
- Computer Center
- Innovation & Incubation Center
- Health Center
- Bank & ATM
- Post Office
- Stationery Store
- Guest House
- Amphitheater

### Student Amenities
- Boys Hostels (Block A & B)
- Girls Hostel
- Main Canteen
- Food Courts
- Coffee House

### Sports Facilities
- Sports Complex (Indoor)
- Cricket Ground
- Basketball Court
- Volleyball Court
- Football Ground

## How to Use

### Opening the Application
1. Simply open the `index.html` file in any modern web browser
2. The map will automatically load centered on CBIT campus

### Navigating the Campus
1. **Browse Locations**: Scroll through the sidebar to see all campus locations
2. **Search**: Use the search box to find specific buildings or facilities
3. **Filter**: Click category buttons to filter locations by type
4. **Get Directions**: 
   - Click "Navigate" on any location card
   - Or click a marker on the map and select "Navigate Here"
   - The system will plot the route and show distance/time

### Emergency Navigation
- Click any emergency button in the red emergency section
- The system will immediately show the route to the nearest emergency service

### Map Controls
- **Locate Me**: Shows your current GPS location (if enabled)
- **Reset View**: Returns map to default campus view
- **Fullscreen**: Expands map to full screen

## Technical Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for map tiles)
- GPS/Location services (optional, for current location feature)

## Technologies Used
- **HTML5** - Structure
- **CSS3** - Styling with modern design
- **JavaScript** (Vanilla) - Application logic
- **Leaflet.js** - Interactive map functionality
- **Leaflet Routing Machine** - Navigation and routing
- **OpenStreetMap** - Map tiles
- **Font Awesome** - Icons

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Installation for Local Development
No installation required! Just:
1. Download or clone the project files
2. Open `index.html` in your browser
3. Start navigating!

For development with a local server:
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Using Live Server in VS Code
# Right-click on index.html and select "Open with Live Server"
```

## File Structure
```
smart-campus-navigation/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling
├── campus-data.js      # Campus locations database
├── app.js             # Main application logic
└── README.md          # Documentation
```

## Features Breakdown

### Search Functionality
- Search by building name
- Search by department
- Search by building code
- Search by facilities

### Routing Algorithm
- Uses Leaflet Routing Machine for pathfinding
- Calculates shortest walking paths
- Provides time estimates based on walking speed

### Location Categories
- **Academic** (Blue markers) - Departments and classrooms
- **Administrative** (Orange markers) - Offices and services
- **Facilities** (Green markers) - Amenities and utilities
- **Hostel** (Purple markers) - Student accommodation
- **Sports** (Orange markers) - Athletic facilities
- **Food** (Pink markers) - Dining options
- **Emergency** (Red markers) - Critical services

## Future Enhancements
- Indoor navigation for multi-floor buildings
- Real-time crowd density information
- Event-based navigation
- Accessibility routes for differently-abled users
- Multi-language support
- Voice-guided navigation
- Augmented Reality (AR) navigation view

## Support
For issues or suggestions regarding the Smart Campus Navigation System, please contact the CBIT IT Department or Administrative Office.

## License
This project is developed for educational purposes for CBIT, Hyderabad.

---
**Developed for CBIT - Chaitanya Bharathi Institute of Technology, Kokapet, Hyderabad**
