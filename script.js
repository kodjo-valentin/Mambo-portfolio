document.addEventListener('DOMContentLoaded', () => {
  const sections = [...document.querySelectorAll('main .sheet[id]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const topButton = document.createElement('button');
  topButton.className = 'to-top';
  topButton.type = 'button';
  topButton.setAttribute('aria-label', 'Revenir en haut de la page');
  topButton.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.append(topButton);

  const updateTopButton = () => {
    topButton.classList.toggle('is-visible', window.scrollY > 420);
  };

  topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    sections.forEach((section) => {
      section.classList.add('reveal');
      revealObserver.observe(section);
    });
  } else {
    sections.forEach((section) => section.classList.add('is-visible'));
  }

  window.addEventListener('scroll', updateTopButton, { passive: true });
  updateTopButton();
});
