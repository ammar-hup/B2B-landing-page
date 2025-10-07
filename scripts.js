document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceModal = document.getElementById('service-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModal = document.getElementById('close-modal');
  const contactForm = document.querySelector('#contact form');
  const focusableSelector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  let previouslyFocusedElement = null;

  const serviceData = {
    insurance: {
      title: '🛡 Insurance Companies',
      subtitle: 'Lower claim costs. Retain clients. Differentiate your plans.',
      benefits: [
        {
          title: 'Cost Saving',
          description:
            'Reducing high claim costs through minimizing misdiagnosis, incorrect treatment plans and eliminating unnecessary surgical procedures',
        },
        {
          title: 'Enhanced Customer Satisfaction',
          description:
            'Offering new high-end products for corporates and VIP clients, improving market leadership',
        },
        {
          title: 'Enhanced Premium Plans',
          description:
            'Add value to your premium health packages with international medical expertise',
        },
      ],
      cta: 'Contact us now',
    },
    hospitals: {
      title: '🏥 Hospitals & Clinics',
      subtitle: 'Expand your capabilities. Increase revenue. Strengthen your clinical brand.',
      benefits: [
        {
          title: 'Market Leadership',
          description: 'Boosting market leadership and popularity with international expertise',
        },
        {
          title: 'Revenue Growth',
          description:
            'Increase revenue without adding infrastructure by selling new services using your existing facilities',
        },
        {
          title: 'International Expertise',
          description:
            'Bringing international expertise closer with consultations on demand without waiting periods',
        },
      ],
      cta: 'Contact us now',
    },
    corporates: {
      title: '🏢 Corporates & Employers',
      subtitle: 'Improve workforce health. Cut long-term costs. Retain top talent.',
      benefits: [
        {
          title: 'Employee Loyalty',
          description: 'Increasing employee loyalty through premium healthcare benefits',
        },
        {
          title: 'Cost Reduction',
          description:
            'Reducing annual premiums by eliminating spending on wasteful medications and procedures',
        },
        {
          title: 'Productivity Boost',
          description:
            'Reducing absenteeism and increasing productivity through better healthcare',
        },
      ],
      cta: 'Contact us now',
    },
    travel: {
      title: '✈️ Treatment-for-Travel (T4T)',
      subtitle: 'Coordinate high-quality care abroad — seamlessly.',
      benefits: [
        {
          title: 'Global Network',
          description: 'Access top hospitals in the US, UK, Germany, Spain, Italy, and Turkey',
        },
        {
          title: 'Full Support',
          description: 'Complete assistance with visas, appointments, and logistics',
        },
        {
          title: 'Continuity Care',
          description: 'Maintain post-treatment continuity via virtual follow-ups',
        },
      ],
      cta: 'Contact us now',
    },
  };

  serviceCards.forEach((card) => {
    const serviceKey = card.dataset.service;
    if (!serviceKey || !serviceData[serviceKey]) {
      return;
    }

    card.addEventListener('click', () => {
      const data = serviceData[serviceKey];

      modalContent.innerHTML = `
        <h2 id="service-modal-title" class="text-3xl font-bold text-primary mb-4 pr-12">${data.title}</h2>
        <p class="text-xl text-gold font-semibold mb-8">${data.subtitle}</p>
        <div class="space-y-6 mb-8">
          ${data.benefits
            .map(
              (benefit) => `
            <div class="bg-primary p-6 rounded-xl border-l-4 border-accent">
              <h4 class="text-xl font-semibold text-cream mb-3">${benefit.title}</h4>
              <p class="text-gray-300 leading-relaxed">${benefit.description}</p>
            </div>
          `,
            )
            .join('')}
        </div>
        <div class="text-center pt-6 border-t border-gold">
          <button class="bg-secondary text-cream px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg mb-4">
            ${data.cta}
          </button>
          <div class="text-gray-600 text-sm">
            <span>📞 Phone</span> | <span>📧 Email</span> | <span>💬 WhatsApp</span>
          </div>
        </div>
      `;

      serviceModal.classList.remove('hidden');
      serviceModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      previouslyFocusedElement = document.activeElement;
      const focusable = serviceModal.querySelectorAll(focusableSelector);
      requestAnimationFrame(() => {
        (focusable[0] || serviceModal).focus();
      });
    });
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeServiceModal();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusable = Array.from(serviceModal.querySelectorAll(focusableSelector));
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusable[0];
    const lastElement = focusable[focusable.length - 1];
    const isShift = event.shiftKey;
    const { activeElement } = document;

    if (!isShift && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    } else if (isShift && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
  };

  const closeServiceModal = () => {
    serviceModal.classList.add('hidden');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    modalContent.innerHTML = '';
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
      previouslyFocusedElement = null;
    }
  };

  closeModal.addEventListener('click', closeServiceModal);

  serviceModal.addEventListener('click', (event) => {
    if (event.target === serviceModal) {
      closeServiceModal();
    }
  });

  serviceModal.addEventListener('keydown', handleKeyDown);

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      console.log('Form submitted:', data);
      alert('Thank you for your inquiry! We will contact you soon.');
      contactForm.reset();
    });
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});
