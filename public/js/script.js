(() => {
  'use strict';

  // --- Bootstrap form validation ---
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // --- Dark Mode Logic ---
  const htmlTag = document.documentElement;
  const currentTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  htmlTag.setAttribute('data-bs-theme', currentTheme);

  function applyThemeIcon(theme) {
    document.querySelectorAll('#theme-toggle i, #theme-toggle-mobile i').forEach(icon => {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
  }
  applyThemeIcon(currentTheme);

  document.querySelectorAll('#theme-toggle, #theme-toggle-mobile').forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isDark = htmlTag.getAttribute('data-bs-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      htmlTag.setAttribute('data-bs-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      applyThemeIcon(newTheme);
    });
  });

  // --- Mobile Bottom Nav: highlight active tab ---
  const path = window.location.pathname;
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href && path === href) item.classList.add('active');
  });

  // --- Wishlist / Heart toggle (localStorage) ---
  document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
    const id = btn.dataset.id;
    const saved = JSON.parse(localStorage.getItem('wl_wishlist') || '[]');
    if (saved.includes(id)) {
      btn.classList.add('saved');
      btn.querySelector('i').className = 'fa-solid fa-heart';
    }
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const list = JSON.parse(localStorage.getItem('wl_wishlist') || '[]');
      const idx = list.indexOf(id);
      const icon = btn.querySelector('i');
      if (idx === -1) {
        list.push(id);
        btn.classList.add('saved');
        icon.className = 'fa-solid fa-heart';
        icon.style.color = '#ff385c';
      } else {
        list.splice(idx, 1);
        btn.classList.remove('saved');
        icon.className = 'fa-regular fa-heart';
        icon.style.color = '';
      }
      localStorage.setItem('wl_wishlist', JSON.stringify(list));
      // pulse animation
      btn.style.transform = 'scale(1.3)';
      setTimeout(() => btn.style.transform = '', 200);
    });
  });

})();