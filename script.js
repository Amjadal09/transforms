// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's a hash link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Tracking Form Submission
    const trackingForm = document.querySelector('.tracking-form form');
    
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const trackingInput = this.querySelector('input');
            const trackingNumber = trackingInput.value.trim();
            
            if (trackingNumber === '') {
                alert('Please enter a tracking number');
                return;
            }
            
            // Simulate tracking result
            alert(`Searching for shipment number: ${trackingNumber}\nShipment Status: In Transit\nCurrent Location: Riyadh Warehouse\nExpected Delivery Date: Within 24 hours`);
            
            // Reset form
            trackingInput.value = '';
        });
    }
    
    // Scroll Animation for Elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature, .fleet-item, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation class to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .service-card, .feature, .fleet-item, .testimonial {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .service-card.animate, .feature.animate, .fleet-item.animate, .testimonial.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on load
    animateOnScroll();
    
    // Sticky Header
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
        
        // Add sticky header styles
        const stickyStyle = document.createElement('style');
        stickyStyle.innerHTML = `
            header.sticky {
                background-color: rgba(255, 255, 255, 0.95);
                padding: 10px 0;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            
            header.sticky .logo h1 {
                font-size: 1.5rem;
            }
            
            header.sticky .logo p {
                font-size: 0.8rem;
            }
        `;
        document.head.appendChild(stickyStyle);
    }
    
    // Get Quote Form in CTA Section
    const ctaButton = document.querySelector('.cta .primary-btn');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create modal overlay
            const modal = document.createElement('div');
            modal.className = 'quote-modal';
            
            modal.innerHTML = `
                <div class="quote-form">
                    <span class="close-modal">&times;</span>
                    <h2>Get a Quote</h2>
                    <form>
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" required>
                        </div>
                        <div class="form-group">
                            <label for="service">Service Type</label>
                            <select id="service" required>
                                <option value="">Select Service</option>
                                <option value="land">Road Transport</option>
                                <option value="sea">Sea Freight</option>
                                <option value="air">Air Freight</option>
                                <option value="logistics">Storage & Logistics</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="message">Shipment Details</label>
                            <textarea id="message" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn primary-btn">Submit Request</button>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add modal styles
            const modalStyle = document.createElement('style');
            modalStyle.innerHTML = `
                .quote-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1001;
                }
                
                .quote-form {
                    background-color: white;
                    padding: 30px;
                    border-radius: 10px;
                    width: 90%;
                    max-width: 500px;
                    position: relative;
                }
                
                .close-modal {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 24px;
                    cursor: pointer;
                }
                
                .form-group {
                    margin-bottom: 15px;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                
                .form-group input,
                .form-group select,
                .form-group textarea {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                
                .form-group textarea {
                    resize: vertical;
                }
            `;
            document.head.appendChild(modalStyle);
            
            // Close modal functionality
            const closeBtn = document.querySelector('.close-modal');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close when clicking outside the form
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            // Form submission
            const quoteForm = document.querySelector('.quote-form form');
            quoteForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Your request has been received successfully! We will contact you soon.');
                document.body.removeChild(modal);
            });
        });
    }
});
