(() => {
  const root = document.documentElement;
  const storageKey = 'portfolio-theme';
  const current = new URL(location.href);
  const valid = value => value === 'light' || value === 'dark';
  let stored;
  try {
    stored = localStorage.getItem(storageKey);
  } catch {
    // Local files can be opened with storage disabled.
  }

  const linkedTheme = current.searchParams.get('theme');
  let preference = valid(linkedTheme) ? linkedTheme : valid(stored) ? stored : null;
  root.dataset.siteTheme = preference ?? 'dark';

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('[data-site-theme-toggle]');
    const chrome = document.querySelector('meta[name="theme-color"]');
    const directory = new URL('.', current).href;

    function render() {
      const light = root.dataset.siteTheme === 'light';
      button.setAttribute('aria-pressed', String(light));
      chrome.content = light ? '#38383c' : '#22383c';
      if (!preference) return;

      // Carry the theme between pages when a browser partitions storage by file URL.
      for (const link of document.querySelectorAll('a[href]')) {
        if (link.getAttribute('href').startsWith('#')) continue;
        const target = new URL(link.href);
        if (!target.pathname.endsWith('.html') || new URL('.', target).href !== directory) continue;
        target.searchParams.set('theme', preference);
        link.href = target.href;
      }
    }

    button.hidden = false;
    button.addEventListener('click', () => {
      preference = root.dataset.siteTheme === 'dark' ? 'light' : 'dark';
      root.dataset.siteTheme = preference;
      try {
        localStorage.setItem(storageKey, preference);
      } catch {
        // The selected theme remains active on this page and its navigation links.
      }
      if (current.protocol === 'file:' || current.searchParams.has('theme')) {
        current.hash = location.hash;
        current.searchParams.set('theme', preference);
        try {
          history.replaceState(history.state, '', current.href);
        } catch {
          // Some browsers restrict history updates for local files.
        }
      }
      render();
    });
    render();
  });
})();
