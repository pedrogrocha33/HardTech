// HardTech Landing Page - JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }

  // Close mobile menu on link click
  const navLinkElements = document.querySelectorAll('.nav-link');
  navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });

  // Scroll to Top Button
  const scrollTopBtn = document.getElementById('scrollTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Portfolio Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      portfolioItems.forEach(item => {
        const category = item.dataset.category;
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Pricing Toggle
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const prices = document.querySelectorAll('.price');
  const installments = document.querySelectorAll('.price-installment span');
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const period = this.dataset.period;
      
      toggleBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      prices.forEach(price => {
        price.textContent = period === 'anual' ? price.dataset.yearly : price.dataset.monthly;
      });
      
      installments.forEach(installment => {
        installment.textContent = period === 'anual' ? installment.dataset.yearly : installment.dataset.monthly;
      });
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Animated Counter
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCounter = (element) => {
    const target = parseFloat(element.dataset.target);
    const isDecimal = element.dataset.decimal === 'true';
    const duration = 2000;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out function
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = easeOut * target;
      
      if (isDecimal) {
        element.textContent = current.toFixed(1);
      } else {
        element.textContent = Math.floor(current);
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  // Intersection Observer for counters
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '-50px'
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(number => {
    counterObserver.observe(number);
  });

  // Scroll animations
  const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });
  
  animateOnScroll.forEach(element => {
    scrollObserver.observe(element);
  });

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Phone mask
    const phoneInput = contactForm.querySelector('input[name="phone"]');
    
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length <= 2) {
        value = value;
      } else if (value.length <= 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length <= 11) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
      }
      
      e.target.value = value;
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Basic validation
      let isValid = true;
      const inputs = contactForm.querySelectorAll('input[required], select[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#ef4444';
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (!isValid) return;
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loading">Enviando...</span>';
      
      setTimeout(() => {
        contactForm.innerHTML = `
          <div style="text-align: center; padding: 40px 0;">
            <div style="width: 64px; height: 64px; background: rgba(0,200,83,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00C853" stroke-width="2" width="32" height="32">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">Mensagem Enviada!</h3>
            <p style="color: #737373;">Nossa equipe entrará em contato em até 24 horas.</p>
          </div>
        `;
      }, 1500);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

const toggleBtns = document.querySelectorAll('.toggle-btn');
const prices = document.querySelectorAll('.price');

toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // UI Update
    document.querySelector('.toggle-btn.active').classList.remove('active');
    btn.classList.add('active');

    // Price Update
    const period = btn.getAttribute('data-period');
    prices.forEach(price => {
      const value = period === 'mensal' 
        ? price.getAttribute('data-monthly') 
        : price.getAttribute('data-yearly');
      price.innerText = value;
    });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const lightbox = document.getElementById('portfolioLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.querySelector('.lightbox-close');

  // =========================
  // 🔥 FILTRO
  // =========================
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // =========================
  // 🔥 LIGHTBOX
  // =========================

  // abrir pelo botão
  const openButtons = document.querySelectorAll('.open-lightbox');

  openButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.portfolio-item');
      const imgSrc = card.querySelector('img').src;

      lightboxImg.src = imgSrc;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // 🔥 abrir clicando na imagem (MOBILE ESSENCIAL)
  const images = document.querySelectorAll('.portfolio-image img');

  images.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // =========================
  // 🔥 FECHAR LIGHTBOX
  // =========================
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // botão X
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  // clicar no fundo (fora da imagem)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // 🔥 fechar com ESC (extra profissional)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

});
