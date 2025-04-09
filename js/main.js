document.addEventListener('DOMContentLoaded', function() {
    // Load the content into the main content area
    fetch('content.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            
            // Add smooth scrolling for navigation links
            document.querySelectorAll('#main-nav a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                        
                        // Hide mobile menu after clicking a link
                        document.querySelector('#main-nav ul').classList.remove('show');
                    }
                });
            });
            
            // Add active class to navigation items on scroll
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                
                document.querySelectorAll('section').forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        document.querySelectorAll('#main-nav a').forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === '#' + sectionId) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
                
                // Show/hide back to top button
                const backToTopButton = document.getElementById('back-to-top');
                if (scrollPosition > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });
            
            // Add collapsible functionality to phase cards
            document.querySelectorAll('.phase-header').forEach(header => {
                header.addEventListener('click', function() {
                    this.parentElement.classList.toggle('collapsed');
                });
            });
            
            // Mobile navigation toggle
            document.getElementById('mobile-nav-toggle').addEventListener('click', function() {
                document.querySelector('#main-nav ul').classList.toggle('show');
            });
            
            // Back to top button functionality
            document.getElementById('back-to-top').addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Format phase and milestone sections for better interactivity
            document.querySelectorAll('h3').forEach(heading => {
                if (heading.textContent.includes('Phase')) {
                    const phaseContent = document.createElement('div');
                    let nextElement = heading.nextElementSibling;
                    
                    // Create phase card structure
                    const phaseCard = document.createElement('div');
                    phaseCard.className = 'phase-card';
                    
                    const phaseHeader = document.createElement('div');
                    phaseHeader.className = 'phase-header';
                    phaseHeader.innerHTML = heading.innerHTML;
                    
                    const phaseContentDiv = document.createElement('div');
                    phaseContentDiv.className = 'phase-content';
                    
                    // Move content into phase content div until next h3
                    while (nextElement && nextElement.tagName !== 'H3') {
                        const clone = nextElement.cloneNode(true);
                        phaseContentDiv.appendChild(clone);
                        const temp = nextElement;
                        nextElement = nextElement.nextElementSibling;
                        temp.remove();
                    }
                    
                    // Assemble phase card
                    phaseCard.appendChild(phaseHeader);
                    phaseCard.appendChild(phaseContentDiv);
                    
                    // Replace heading with phase card
                    heading.parentNode.replaceChild(phaseCard, heading);
                }
            });
            
            // Format milestone sections
            document.querySelectorAll('h4').forEach(heading => {
                if (heading.textContent.includes('Milestone')) {
                    const milestoneDiv = document.createElement('div');
                    milestoneDiv.className = 'milestone';
                    
                    const milestoneHeader = document.createElement('div');
                    milestoneHeader.className = 'milestone-header';
                    milestoneHeader.innerHTML = heading.innerHTML;
                    
                    const milestoneContent = document.createElement('div');
                    milestoneContent.className = 'milestone-content';
                    
                    // Move content into milestone content div until next h4 or end of parent
                    let nextElement = heading.nextElementSibling;
                    while (nextElement && nextElement.tagName !== 'H4' && nextElement.tagName !== 'H3') {
                        const clone = nextElement.cloneNode(true);
                        milestoneContent.appendChild(clone);
                        const temp = nextElement;
                        nextElement = nextElement.nextElementSibling;
                        temp.remove();
                    }
                    
                    // Assemble milestone
                    milestoneDiv.appendChild(milestoneHeader);
                    milestoneDiv.appendChild(milestoneContent);
                    
                    // Replace heading with milestone div
                    heading.parentNode.replaceChild(milestoneDiv, heading);
                }
            });
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById('content').innerHTML = '<p>Error loading content. Please try again later.</p>';
        });
});
