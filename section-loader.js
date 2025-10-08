(() => {
  const loadTargets = [
    { path: 'sections/hero.html', target: '#page-sections' },
    { path: 'sections/vision-mission.html', target: '#page-sections' },
    { path: 'sections/services.html', target: '#page-sections' },
    { path: 'sections/statistics.html', target: '#page-sections' },
    { path: 'sections/about.html', target: '#page-sections' },
    { path: 'sections/testimonials.html', target: '#page-sections' },
    { path: 'sections/contact.html', target: '#page-sections' },
    { path: 'sections/modals.html', target: '#modals-root' },
  ];

  const loadFragment = async ({ path, target }) => {
    const container = document.querySelector(target);
    if (!container) {
      console.warn(`Section loader: target "${target}" not found for "${path}".`);
      return;
    }

    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
      }
      const html = await response.text();
      container.insertAdjacentHTML('beforeend', html);
    } catch (error) {
      console.error(`Section loader error for ${path}:`, error);
    }
  };

  const loadSections = async () => {
    for (const entry of loadTargets) {
      // Sequential loading preserves the original section order.
      await loadFragment(entry);
    }

    document.body.dataset.sectionsLoaded = 'true';
    document.dispatchEvent(new Event('sections:loaded'));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSections, { once: true });
  } else {
    loadSections();
  }
})();
