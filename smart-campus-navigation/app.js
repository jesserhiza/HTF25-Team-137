// Smart Campus Navigation System for CBIT
// Main JavaScript Application

// Global variables
let map;
let markers = {};
let currentRoute = null;
let currentLocation = null;
let selectedFromLocation = null;
let selectedToLocation = null;
let routingControl = null;
let userLocationMarker = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    loadLocations();
    setupEventListeners();
    setupGeolocation();
    showNotification('Welcome to CBIT Smart Campus Navigator!', 'success');
});

// Initialize Leaflet Map
function initializeMap() {
    // Create map centered on CBIT campus
    map = L.map('map', {
        center: CAMPUS_CENTER,
        zoom: 17,
        maxZoom: 20,
        minZoom: 15
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors | CBIT Smart Campus Navigation'
    }).addTo(map);

    // Add campus boundary
    const campusPolygon = L.polygon(campusBoundaries, {
        color: '#2563eb',
        weight: 2,
        opacity: 0.8,
        fillColor: '#dbeafe',
        fillOpacity: 0.1
    }).addTo(map);

    // Fit map to campus boundaries
    map.fitBounds(campusPolygon.getBounds());

    // Add all location markers
    addLocationMarkers();
}

// Add markers for all campus locations
function addLocationMarkers() {
    campusLocations.forEach(location => {
        const markerIcon = createCustomIcon(location);
        
        const marker = L.marker(location.coordinates, {
            icon: markerIcon,
            title: location.name
        }).addTo(map);

        // Create popup content
        const popupContent = createPopupContent(location);
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'marker-popup'
        });

        // Store marker reference
        markers[location.id] = marker;

        // Add click event for navigation
        marker.on('click', function() {
            selectedToLocation = location;
        });
    });
}

// Create custom icon based on category
function createCustomIcon(location) {
    let iconColor = '#2563eb'; // Default blue
    
    switch(location.category) {
        case 'academic':
            iconColor = '#2563eb';
            break;
        case 'administrative':
            iconColor = '#f59e0b';
            break;
        case 'facilities':
            iconColor = '#10b981';
            break;
        case 'hostel':
            iconColor = '#8b5cf6';
            break;
        case 'sports':
            iconColor = '#f97316';
            break;
        case 'food':
            iconColor = '#ec4899';
            break;
    }

    if (location.isEmergency) {
        iconColor = '#ef4444';
    }

    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${iconColor}; width: 100%; height: 100%; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <i class="fas ${location.icon}" style="color: white; font-size: 14px;"></i>
               </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
    });
}

// Create popup content for markers
function createPopupContent(location) {
    let facilitiesHtml = '';
    if (location.facilities && location.facilities.length > 0) {
        facilitiesHtml = `
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
                <strong>Facilities:</strong>
                <ul style="margin: 5px 0 0 20px; padding: 0;">
                    ${location.facilities.map(f => `<li style="font-size: 0.85rem;">${f}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    return `
        <div class="popup-content">
            <div class="popup-title">${location.name}</div>
            <div class="popup-category category-${location.category}" style="display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 0.75rem; margin-bottom: 8px;">
                ${location.category.charAt(0).toUpperCase() + location.category.slice(1)}
            </div>
            <div class="popup-description">${location.description}</div>
            <div style="font-size: 0.85rem; color: #6b7280;">Building Code: ${location.buildingCode}</div>
            ${facilitiesHtml}
            <div class="popup-actions">
                <button class="location-btn btn-navigate" onclick="navigateToLocation(${location.id})">
                    <i class="fas fa-directions"></i> Navigate Here
                </button>
                <button class="location-btn btn-info" onclick="showLocationDetails(${location.id})">
                    <i class="fas fa-info-circle"></i> Details
                </button>
            </div>
        </div>
    `;
}

// Load locations in sidebar
function loadLocations(filter = 'all') {
    const locationsList = document.getElementById('locationsList');
    locationsList.innerHTML = '';

    const filteredLocations = filter === 'all' 
        ? campusLocations 
        : campusLocations.filter(loc => loc.category === filter);

    filteredLocations.forEach(location => {
        const card = createLocationCard(location);
        locationsList.appendChild(card);
    });
}

// Create location card for sidebar
function createLocationCard(location) {
    const card = document.createElement('div');
    card.className = 'location-card';
    card.innerHTML = `
        <div class="location-card-header">
            <span class="location-name">${location.name}</span>
            <span class="location-category category-${location.category}">
                ${location.category.charAt(0).toUpperCase() + location.category.slice(1)}
            </span>
        </div>
        <div class="location-description">${location.description}</div>
        <div class="location-actions">
            <button class="location-btn btn-navigate" onclick="navigateToLocation(${location.id})">
                <i class="fas fa-directions"></i> Navigate
            </button>
            <button class="location-btn btn-info" onclick="showOnMap(${location.id})">
                <i class="fas fa-map-marker-alt"></i> Show on Map
            </button>
        </div>
    `;

    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('location-btn')) {
            showOnMap(location.id);
        }
    });

    return card;
}

// Navigate to a specific location
function navigateToLocation(locationId) {
    const destination = campusLocations.find(loc => loc.id === locationId);
    if (!destination) return;

    selectedToLocation = destination;

    // If user location is available, use it as starting point
    if (userLocationMarker) {
        const userPos = userLocationMarker.getLatLng();
        createRoute([userPos.lat, userPos.lng], destination.coordinates);
    } else {
        // Otherwise, ask user to select starting point
        showNotification('Please select a starting point on the map or enable location services', 'info');
        
        // Set up one-time click event to select starting point
        map.once('click', function(e) {
            createRoute([e.latlng.lat, e.latlng.lng], destination.coordinates);
        });
    }
}

// Create route between two points
function createRoute(start, end) {
    // Remove existing route if any
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }

    // Create new routing control
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(start[0], start[1]),
            L.latLng(end[0], end[1])
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        createMarker: function(i, waypoint, n) {
            if (i === 0) {
                return L.marker(waypoint.latLng, {
                    icon: L.divIcon({
                        className: 'custom-marker',
                        html: '<div style="background-color: #10b981; width: 100%; height: 100%; border-radius: 50%; display: flex; align-items: center; justify-content: center;"><i class="fas fa-play" style="color: white;"></i></div>',
                        iconSize: [25, 25]
                    })
                });
            } else {
                return null; // Destination marker already exists
            }
        },
        lineOptions: {
            styles: [{ color: '#2563eb', weight: 4, opacity: 0.7 }]
        },
        show: false,
        collapsible: false
    }).on('routesfound', function(e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        
        // Update navigation info
        updateNavigationInfo(start, end, summary);
        
        // Fit map to show entire route
        const bounds = L.latLngBounds([start, end]);
        map.fitBounds(bounds, { padding: [50, 50] });
    }).addTo(map);
}

// Update navigation info panel
function updateNavigationInfo(start, end, summary) {
    const navInfo = document.getElementById('navigationInfo');
    const navFrom = document.getElementById('navFrom');
    const navTo = document.getElementById('navTo');
    const navDistance = document.getElementById('navDistance');
    const navTime = document.getElementById('navTime');

    // Find destination location
    const destination = campusLocations.find(loc => 
        Math.abs(loc.coordinates[0] - end[0]) < 0.0001 && 
        Math.abs(loc.coordinates[1] - end[1]) < 0.0001
    );

    navFrom.textContent = 'Your Location';
    navTo.textContent = destination ? destination.name : 'Selected Point';
    navDistance.textContent = `${(summary.totalDistance / 1000).toFixed(2)} km`;
    navTime.textContent = `${Math.ceil(summary.totalTime / 60)} min`;

    navInfo.style.display = 'block';
}

// Show location on map
function showOnMap(locationId) {
    const location = campusLocations.find(loc => loc.id === locationId);
    if (!location) return;

    map.setView(location.coordinates, 18);
    markers[locationId].openPopup();
}

// Show location details in modal
function showLocationDetails(locationId) {
    const location = campusLocations.find(loc => loc.id === locationId);
    if (!location) return;

    const modal = document.getElementById('locationModal');
    const modalBody = document.getElementById('modalBody');

    let facilitiesHtml = '';
    if (location.facilities && location.facilities.length > 0) {
        facilitiesHtml = `
            <div class="modal-section">
                <h3><i class="fas fa-list"></i> Available Facilities</h3>
                <div class="facilities-grid">
                    ${location.facilities.map(f => `
                        <div class="facility-item">
                            <i class="fas fa-check-circle" style="color: #10b981;"></i>
                            <span>${f}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    modalBody.innerHTML = `
        <div class="modal-header" style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 1.5rem; margin: -1.5rem -1.5rem 1.5rem; border-radius: 12px 12px 0 0;">
            <h2 style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas ${location.icon}"></i>
                ${location.name}
            </h2>
            <span class="location-category category-${location.category}" style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.85rem;">
                ${location.category.charAt(0).toUpperCase() + location.category.slice(1)}
            </span>
        </div>
        
        <div class="modal-section">
            <p style="color: #6b7280; line-height: 1.6;">${location.description}</p>
        </div>
        
        <div class="modal-section">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
                    <strong style="color: #6b7280; font-size: 0.85rem;">Building Code</strong>
                    <div style="font-size: 1.1rem; font-weight: 600; color: #111827;">${location.buildingCode}</div>
                </div>
                <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
                    <strong style="color: #6b7280; font-size: 0.85rem;">Category</strong>
                    <div style="font-size: 1.1rem; font-weight: 600; color: #111827;">${location.category}</div>
                </div>
            </div>
        </div>
        
        ${facilitiesHtml}
        
        <div class="modal-actions" style="display: flex; gap: 1rem; margin-top: 1.5rem;">
            <button class="location-btn btn-navigate" onclick="navigateToLocation(${location.id}); closeModal();" style="flex: 1; padding: 0.75rem;">
                <i class="fas fa-directions"></i> Get Directions
            </button>
            <button class="location-btn btn-info" onclick="showOnMap(${location.id}); closeModal();" style="flex: 1; padding: 0.75rem;">
                <i class="fas fa-map-marker-alt"></i> View on Map
            </button>
        </div>
    `;

    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('locationModal');
    modal.style.display = 'none';
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        } else {
            // Live search as user types
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                performSearch();
            } else if (query.length === 0) {
                loadLocations();
            }
        }
    });

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Load filtered locations
            const category = this.dataset.category;
            loadLocations(category);
        });
    });

    // Emergency buttons
    const emergencyButtons = document.querySelectorAll('.emergency-btn');
    emergencyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const emergencyType = this.dataset.location;
            handleEmergencyNavigation(emergencyType);
        });
    });

    // Map controls
    document.getElementById('locateMe').addEventListener('click', locateUser);
    document.getElementById('resetView').addEventListener('click', resetMapView);
    document.getElementById('toggleFullscreen').addEventListener('click', toggleFullscreen);

    // Clear route button
    document.getElementById('clearRoute').addEventListener('click', clearRoute);

    // Modal close button
    document.querySelector('.close-modal').addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('locationModal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Perform search
function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    if (query.length === 0) {
        loadLocations();
        return;
    }

    const results = campusLocations.filter(location => {
        return location.name.toLowerCase().includes(query) ||
               location.description.toLowerCase().includes(query) ||
               location.buildingCode.toLowerCase().includes(query) ||
               (location.facilities && location.facilities.some(f => f.toLowerCase().includes(query)));
    });

    const locationsList = document.getElementById('locationsList');
    locationsList.innerHTML = '';

    if (results.length === 0) {
        locationsList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #6b7280;">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No locations found for "${query}"</p>
            </div>
        `;
    } else {
        results.forEach(location => {
            const card = createLocationCard(location);
            locationsList.appendChild(card);
        });
        
        showNotification(`Found ${results.length} location(s)`, 'success');
    }
}

// Handle emergency navigation
function handleEmergencyNavigation(emergencyType) {
    const emergencyLocation = campusLocations.find(loc => 
        loc.isEmergency && loc.emergencyType === emergencyType
    );

    if (emergencyLocation) {
        navigateToLocation(emergencyLocation.id);
        showOnMap(emergencyLocation.id);
        showNotification(`Emergency route to ${emergencyLocation.name}`, 'warning');
    }
}

// Setup geolocation
function setupGeolocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition(
            updateUserLocation,
            handleLocationError,
            {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000
            }
        );
    }
}

// Update user location on map
function updateUserLocation(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    // Check if user is within campus bounds (approximate)
    const isOnCampus = lat >= 17.393 && lat <= 17.398 && 
                       lng >= 78.317 && lng <= 78.322;

    if (userLocationMarker) {
        userLocationMarker.setLatLng([lat, lng]);
    } else {
        userLocationMarker = L.marker([lat, lng], {
            icon: L.divIcon({
                className: 'user-location-marker',
                html: `<div style="position: relative;">
                        <div style="width: 20px; height: 20px; background: #2563eb; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>
                        <div style="position: absolute; top: -3px; left: -3px; width: 26px; height: 26px; border: 2px solid #2563eb; border-radius: 50%; opacity: 0.3; animation: pulse 2s infinite;"></div>
                       </div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            }),
            title: 'Your Location'
        }).addTo(map);

        if (isOnCampus) {
            userLocationMarker.bindPopup('You are here!').openPopup();
        }
    }

    currentLocation = [lat, lng];
}

// Handle location error
function handleLocationError(error) {
    console.warn('Location error:', error.message);
}

// Locate user on map
function locateUser() {
    if (currentLocation) {
        map.setView(currentLocation, 18);
        if (userLocationMarker) {
            userLocationMarker.openPopup();
        }
        showNotification('Showing your current location', 'success');
    } else {
        showNotification('Location services not available. Please enable GPS.', 'error');
    }
}

// Reset map view to campus center
function resetMapView() {
    map.setView(CAMPUS_CENTER, 17);
    showNotification('Map view reset to campus center', 'info');
}

// Toggle fullscreen mode
function toggleFullscreen() {
    const mapContainer = document.querySelector('.map-container');
    const btn = document.getElementById('toggleFullscreen');
    
    if (!document.fullscreenElement) {
        mapContainer.requestFullscreen().then(() => {
            btn.innerHTML = '<i class="fas fa-compress"></i>';
        });
    } else {
        document.exitFullscreen().then(() => {
            btn.innerHTML = '<i class="fas fa-expand"></i>';
        });
    }
}

// Clear current route
function clearRoute() {
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }
    
    document.getElementById('navigationInfo').style.display = 'none';
    showNotification('Route cleared', 'info');
}

// Show notification toast
function showNotification(message, type = 'info') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'fa-info-circle';
    let color = '#3b82f6';
    
    switch(type) {
        case 'success':
            icon = 'fa-check-circle';
            color = '#10b981';
            break;
        case 'warning':
            icon = 'fa-exclamation-triangle';
            color = '#f59e0b';
            break;
        case 'error':
            icon = 'fa-times-circle';
            color = '#ef4444';
            break;
    }
    
    toast.innerHTML = `
        <i class="fas ${icon}" style="color: ${color}; font-size: 1.2rem;"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add custom CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); opacity: 0.3; }
        50% { transform: scale(1.5); opacity: 0.1; }
        100% { transform: scale(1); opacity: 0.3; }
    }
    
    @keyframes slideDown {
        to { transform: translateY(100px); opacity: 0; }
    }
    
    .facilities-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 0.75rem;
        margin-top: 1rem;
    }
    
    .facility-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background: #f3f4f6;
        border-radius: 6px;
        font-size: 0.9rem;
    }
    
    .modal-section {
        margin-bottom: 1.5rem;
    }
    
    .modal-section h3 {
        font-size: 1rem;
        color: #111827;
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style);
