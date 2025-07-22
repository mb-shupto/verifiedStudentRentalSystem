document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery Functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Set clicked thumbnail as active
            this.classList.add('active');
            
            // Update main image
            if(this.classList.contains('virtual-tour')) {
                // Handle virtual tour click
                window.open('virtual-tour-url', '_blank');
            } else {
                mainImage.src = this.src;
                mainImage.alt = this.alt;
            }
        });
    });
    
    // Initialize Google Map
    function initMap() {
        const propertyLocation = { lat: 23.8103, lng: 90.4125 };
        const map = new google.maps.Map(document.getElementById("property-map"), {
            zoom: 15,
            center: propertyLocation,
            styles: [
                {
                    featureType: "poi",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });
        
        new google.maps.Marker({
            position: propertyLocation,
            map: map,
            title: "Property Location",
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }
        });
        
        // Add nearby points of interest
        const campusLocation = { lat: 23.7333, lng: 90.4176 };
        new google.maps.Marker({
            position: campusLocation,
            map: map,
            title: "University Campus",
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
        });
    }
    
    // Initialize map when API is loaded
    if(typeof google !== 'undefined') {
        initMap();
    }
    
    // Wishlist Functionality
    const wishlistButton = document.getElementById('save-listing');
    wishlistButton.addEventListener('click', function() {
        const propertyId = window.location.pathname.split('/').pop();
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        if(wishlist.includes(propertyId)) {
            wishlist = wishlist.filter(id => id !== propertyId);
            this.innerHTML = '<i class="icon-heart"></i> Save to Wishlist';
            this.classList.remove('active');
        } else {
            wishlist.push(propertyId);
            this.innerHTML = '<i class="icon-heart-filled"></i> Saved';
            this.classList.add('active');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    });
    
    // Contact Owner Modal
    const contactButton = document.getElementById('contact-owner');
    contactButton.addEventListener('click', function() {
        // In a real app, this would open a modal
        alert('Contact form would open here with pre-filled property details');
    });
    
    // Schedule Tour Functionality
    document.getElementById('schedule-tour').addEventListener('click', function() {
        // This would open a calendar booking interface
        alert('Tour scheduling modal would appear with available time slots');
    });
});

// DOM Elements
const modal = document.getElementById('compatibilityModal');
const openModalBtn = document.querySelector('.match-details');
const closeModalBtn = document.querySelector('.modal-close');
const factorsContainer = document.querySelector('.compatibility-factors');

// Compatibility Data (would come from backend in real app)
const compatibilityData = {
  factors: [
    { name: "Sleep Schedule", score: 75 },
    { name: "Study Habits", score: 60 },
    { name: "Cleanliness", score: 85 },
    { name: "Guest Policy", score: 40 },
    { name: "Music Preference", score: 65 }
  ]
};

// Open Modal Function
function openModal() {
  // Populate factors
  factorsContainer.innerHTML = compatibilityData.factors.map(factor => `
    <div class="factor-item">
      <div class="factor-name">
        <span>${factor.name}</span>
        <span>${factor.score}%</span>
      </div>
      <div class="factor-bar">
        <div class="factor-progress" style="width: ${factor.score}%"></div>
      </div>
    </div>
  `).join('');

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent page scrolling
}

// Close Modal Function
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Event Listeners
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Close when clicking outside modal
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Close with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});