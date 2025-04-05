// Menu functionality
function toggleMenu() {
    const menu = document.getElementById('flyout-menu');
    menu.classList.toggle('open');
    menu.classList.remove('hidden');
    
    if (menu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('flyout-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    
    if (menu.classList.contains('open') && 
        !menu.contains(event.target) && 
        !hamburger.contains(event.target)) {
        toggleMenu();
    }
});

// Enhanced carousel functionality
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const id = carousel.querySelector('.carousel-images').id.split('-')[1];
        const images = carousel.querySelectorAll('.carousel-images img');
        
        if (images.length > 0) {
            images[0].classList.add('active');
        }
        
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';
        
        images.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = index === 0 ? 'indicator active' : 'indicator';
            indicator.addEventListener('click', () => {
                goToSlide(id, index);
            });
            indicatorsContainer.appendChild(indicator);
        });
        
        carousel.querySelector('.carousel').appendChild(indicatorsContainer);
    });
}

function updateCarousel(id, direction) {
    const container = document.getElementById(`items-${id}`);
    const images = container.querySelectorAll('img');
    const indicators = container.closest('.carousel').querySelectorAll('.indicator');
    
    let currentIndex = parseInt(container.getAttribute('data-index'));
    const totalImages = images.length;
    
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % totalImages;
    } else {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    }
    
    goToSlide(id, currentIndex);
}

function goToSlide(id, index) {
    const container = document.getElementById(`items-${id}`);
    const images = container.querySelectorAll('img');
    const indicators = container.closest('.carousel').querySelectorAll('.indicator');
    
    images.forEach(img => img.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    images[index].classList.add('active');
    indicators[index].classList.add('active');
    
    container.setAttribute('data-index', index);
}

// Back to top button functionality
function initBackToTop() {
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== UPDATED FUNCTION =====
function addDescriptions() {
    const categories = {
        'nok': {
            'heads': 'Nok terracotta heads (500 BCE) show intricate hairstyles and facial scarification.',
            'figures': 'Full-bodied Nok figures often depict seated or kneeling poses.',
            'fragments': 'Fragments reveal technical details of Nok clay modeling.'
        },
        'bronzes': {
            'benin-bronzes': 'Benin bronzes (Nigeria, 16th century) depict royalty and court life.',
            'ife-bronzes': 'Ife bronzes (Nigeria, 12th–15th century) showcase naturalistic human figures.',
            'ritual-bronzes': 'Ceremonial objects used in rituals and ancestor worship.'
        },
        'artifacts': {
            'ritual-masks': 'Masks used in dances, initiations, and spiritual ceremonies.',
            'power-objects': 'Fetishes and sacred objects believed to hold supernatural power.',
            'textiles': 'Traditional woven fabrics with cultural symbolism.'
        }
    };

    document.querySelectorAll('.carousel-container').forEach(container => {
        const id = container.id;
        const mainCategory = id.split('-')[0];
        const description = categories[mainCategory]?.[id];
        
        if (description) {
            const descElement = document.createElement('p');
            descElement.className = 'category-description';
            descElement.textContent = description;
            container.appendChild(descElement);
        }
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    initCarousels();
    initBackToTop();
    addDescriptions();
});