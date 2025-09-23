document.addEventListener('DOMContentLoaded', function() {
  // Gestion du thème sombre/clair
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Vérifier la préférence de thème de l'utilisateur
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Vérifier le thème sauvegardé dans localStorage
  const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // Appliquer le thème
  if (currentTheme === 'dark') {
    html.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    html.classList.remove('dark');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  
  // Basculer entre les thèmes
  themeToggle.addEventListener('click', function() {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });
  
  // Menu mobile
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
      
      // Changer l'icône du bouton
      const icon = mobileMenuButton.querySelector('i');
      if (isExpanded) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
    });
  }
  
  // Fermer le menu mobile lors du clic sur un lien
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 768) { // Seulement sur mobile
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
  
  // Animation au défilement
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate-fade-in');
      }
    });
  };
  
  // Écouter l'événement de défilement
  window.addEventListener('scroll', animateOnScroll);
  
  // Lancer une première fois au chargement de la page
  animateOnScroll();
  
  // Lisser le défilement pour les liens d'ancrage
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Gestion du formulaire de contact
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Récupérer les données du formulaire
      const formData = new FormData(contactForm);
      const formObject = Object.fromEntries(formData.entries());
      
      // Ici, vous pouvez ajouter le code pour envoyer les données à votre serveur
      console.log('Formulaire soumis:', formObject);
      
      // Afficher un message de succès
      alert('Merci pour votre message ! Je vous répondrai dès que possible.');
      contactForm.reset();
    });
  }
  
  // Animation des compétences au survol
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    });
  });
  
  // Détecter le système d'exploitation pour le style des barres de défilement
  function detectOS() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    
    if (macosPlatforms.indexOf(platform) !== -1) {
      document.documentElement.classList.add('macos');
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      document.documentElement.classList.add('windows');
    } else if (/Linux/.test(platform)) {
      document.documentElement.classList.add('linux');
    }
  }
  
  detectOS();

  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Gestion du chargement paresseux des images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback pour les navigateurs qui ne prennent pas en charge le chargement paresseux natif
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Animation fluide au défilement
function smoothScroll() {
  const currentScroll = window.pageYOffset;
  
  window.requestAnimationFrame(() => {
    window.scrollTo(0, currentScroll);
  });
}

window.addEventListener('scroll', smoothScroll);
