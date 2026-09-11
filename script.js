document.addEventListener('DOMContentLoaded', function () {

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Mobile nav toggle */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Google Reviews placeholder link -> maps search for the business */
  var googleReviewsLink = document.getElementById('googleReviewsLink');
  if (googleReviewsLink) {
    googleReviewsLink.href = 'https://www.google.com/maps/search/?api=1&query=Vijaya%27s+Physio+World+Goregaon+West+Mumbai';
    googleReviewsLink.target = '_blank';
    googleReviewsLink.rel = 'noopener';
  }

  /* Contact form: no backend — route to WhatsApp with the entered details */
  var contactForm = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('cf-name').value.trim();
      var phone = document.getElementById('cf-phone').value.trim();
      var date = document.getElementById('cf-date').value;
      var message = document.getElementById('cf-message').value.trim();

      var text = 'Hello Dr. Vijaya, I would like to request an appointment.\n' +
        'Name: ' + name + '\n' +
        'Phone: ' + phone +
        (date ? '\nPreferred Date: ' + date : '') +
        (message ? '\nMessage: ' + message : '');

      var waUrl = 'https://wa.me/919869521900?text=' + encodeURIComponent(text);

      if (formNote) {
        formNote.textContent = 'Opening WhatsApp to send your appointment request…';
      }

      window.open(waUrl, '_blank', 'noopener');
      contactForm.reset();
    });
  }

  /* Single, restrained reveal-on-scroll for section headings only */
  var revealTargets = document.querySelectorAll('.section-title, .hero-copy, .appointment-inner');
  if ('IntersectionObserver' in window) {
    revealTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealTargets.forEach(function (el) { observer.observe(el); });
  }

});
