/* ==========================================================================
   EDEN & BLOOMS - INTERACTIVE SCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header & Mobile Navigation Toggle
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const mobileNav = document.getElementById('mobile-nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    // Close mobile nav when link clicked
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }

  // 2. Gallery Filtering & Masonry Animation
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });

  // 3. Lightbox Preview Modal
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close-btn');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || '';
      const sub = item.getAttribute('data-sub') || '';

      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="font-size: 0.9rem; opacity: 0.8;">${sub}</span>`;
        lightboxModal.classList.add('open');
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('open');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('open');
      }
    });
  }

  // 4. Interactive Quote Calculator Wizard Modal
  const quoteModal = document.getElementById('quote-modal');
  const openQuoteBtns = document.querySelectorAll('.open-quote-modal-btn');
  const closeQuoteBtn = document.getElementById('modal-close-btn');

  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quoteModal) {
        quoteModal.classList.add('open');
      }
    });
  });

  if (closeQuoteBtn && quoteModal) {
    closeQuoteBtn.addEventListener('click', () => {
      quoteModal.classList.remove('open');
    });

    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        quoteModal.classList.remove('open');
      }
    });
  }

  // Wizard State & Step Transitions
  let currentStep = 1;
  let selectedBasePrice = 450;
  let activeAddons = new Set();

  const step1 = document.getElementById('wizard-step-1');
  const step2 = document.getElementById('wizard-step-2');
  const step3 = document.getElementById('wizard-step-3');

  const dot1 = document.getElementById('dot-step-1');
  const dot2 = document.getElementById('dot-step-2');
  const dot3 = document.getElementById('dot-step-3');

  const next1 = document.getElementById('wizard-next-1');
  const prev2 = document.getElementById('wizard-prev-2');
  const next2 = document.getElementById('wizard-next-2');
  const prev3 = document.getElementById('wizard-prev-3');

  function updateStepView() {
    if (step1 && step2 && step3) {
      step1.style.display = currentStep === 1 ? 'block' : 'none';
      step2.style.display = currentStep === 2 ? 'block' : 'none';
      step3.style.display = currentStep === 3 ? 'block' : 'none';

      dot1.classList.toggle('active', currentStep >= 1);
      dot2.classList.toggle('active', currentStep >= 2);
      dot3.classList.toggle('active', currentStep >= 3);
    }
  }

  if (next1) next1.addEventListener('click', () => { currentStep = 2; updateStepView(); });
  if (prev2) prev2.addEventListener('click', () => { currentStep = 1; updateStepView(); });
  if (next2) next2.addEventListener('click', () => { currentStep = 3; updateStepView(); });
  if (prev3) prev3.addEventListener('click', () => { currentStep = 2; updateStepView(); });

  // Option Card Selection in Step 1 & Step 2
  const optionCards = document.querySelectorAll('.option-select-card:not(.toggle-card)');
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      const field = card.getAttribute('data-field');
      
      // Deselect brothers in same field
      document.querySelectorAll(`.option-select-card[data-field="${field}"]`).forEach(c => {
        c.classList.remove('selected');
      });
      card.classList.add('selected');

      const price = card.getAttribute('data-price');
      if (price) {
        selectedBasePrice = parseInt(price, 10);
        calculateLiveTotal();
      }
    });
  });

  // Toggle Addon Cards in Step 3
  const toggleCards = document.querySelectorAll('.option-select-card.toggle-card');
  toggleCards.forEach(card => {
    card.addEventListener('click', () => {
      const addon = card.getAttribute('data-addon');
      if (card.classList.contains('selected')) {
        card.classList.remove('selected');
        activeAddons.delete(addon);
      } else {
        card.classList.add('selected');
        activeAddons.add(addon);
      }
      calculateLiveTotal();
    });
  });

  function calculateLiveTotal() {
    let total = selectedBasePrice;
    toggleCards.forEach(card => {
      if (card.classList.contains('selected')) {
        const addonPrice = parseInt(card.getAttribute('data-price') || '0', 10);
        total += addonPrice;
      }
    });

    const liveTotalEl = document.getElementById('live-total-price');
    if (liveTotalEl) {
      liveTotalEl.textContent = `$${total.toFixed(2)}`;
    }
  }

  // Quote Wizard Form Submit
  const wizardForm = document.getElementById('quote-wizard-form');
  if (wizardForm) {
    wizardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-name')?.value || 'Valued Client';
      
      if (quoteModal) {
        quoteModal.classList.remove('open');
      }

      showToast(`Thank you, ${name}! Your custom decor estimate request has been received. We will contact you within 2 hours!`);

      // Reset wizard
      currentStep = 1;
      updateStepView();
      wizardForm.reset();
    });
  }

  // 5. Footer Contact Form Handling
  const footerForm = document.getElementById('footer-lead-form');
  if (footerForm) {
    footerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('footer-name')?.value || 'there';
      showToast(`Thank you ${name}! Your inquiry has been sent to Eden & Blooms.`);
      footerForm.reset();
    });
  }

  // 6. Toast Notification Helper
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B86B77" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }
});
