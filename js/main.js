// Main JavaScript file
// Add any interactive functionality here if needed

document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu functionality
  const menuToggle = document.querySelector('.header__menu-toggle');
  const nav = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.header__nav-link');
  const body = document.body;
  
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'header__overlay';
  body.appendChild(overlay);

  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    nav.setAttribute('aria-hidden', isExpanded);
    overlay.classList.toggle('active', !isExpanded);
    body.style.overflow = !isExpanded ? 'hidden' : '';
    
    // Add class to header when menu is open for positioning
    if (!isExpanded) {
      document.querySelector('.header').classList.add('menu-open');
    } else {
      document.querySelector('.header').classList.remove('menu-open');
    }
  }

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('active');
    body.style.overflow = '';
    document.querySelector('.header').classList.remove('menu-open');
  }

  // Toggle menu on button click
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking overlay
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.getAttribute('aria-hidden') === 'false') {
      closeMenu();
    }
  });

  console.log('EAP Website loaded');
});

