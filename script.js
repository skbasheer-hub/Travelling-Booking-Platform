// script.js — Interactions: search filtering, mobile menu, dark mode, toast

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const darkToggle = document.getElementById('darkToggle');
  const searchForm = document.getElementById('searchForm');
  const hotelsGrid = document.getElementById('hotelsGrid');
  const hotels = Array.from(document.querySelectorAll('.card.hotel'));
  const toast = document.getElementById('toast');

  // MOBILE menu toggle
  mobileToggle && mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navMenu.style.display = navMenu.classList.contains('open') ? 'flex' : '';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.right = '18px';
    navMenu.style.top = '72px';
    navMenu.style.background = '#003a6b';
    navMenu.style.padding = '12px';
    navMenu.style.borderRadius = '8px';
  });

  // DARK MODE toggle (persisted)
  const saved = localStorage.getItem('tb-dark');
  if (saved === '1') document.documentElement.classList.add('tb-dark');
  darkToggle.addEventListener('click', () => {
    const is = document.documentElement.classList.toggle('tb-dark');
    localStorage.setItem('tb-dark', is ? '1' : '0');
    showToast(is ? 'Dark mode on' : 'Dark mode off');
  });

  // Simple toast
  function showToast(msg, t = 2200) {
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
    }, t);
  }

  // Search handling — local filtering demo
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const dest = document.getElementById('destination').value.trim().toLowerCase();
    const type = document.getElementById('type').value;
    // show relevant section
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    if (type === 'stays') document.getElementById('stays').style.display = '';
    if (type === 'flights') document.getElementById('flights').style.display = '';
    if (type === 'cabs') document.getElementById('cabs').style.display = '';
    // filter hotels by destination
    hotels.forEach(card => {
      const destAttr = (card.dataset.destination || '').toLowerCase();
      if (!dest) {
        card.style.display = '';
      } else {
        card.style.display = destAttr.includes(dest) ? '' : 'none';
      }
    });
    showToast(`Showing results for "${dest || 'anywhere'}" in ${type}`);
    // smooth scroll to section
    setTimeout(() => {
      const section = document.getElementById(type === 'stays' ? 'stays' : type);
      section && section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 250);
  });

  // Sort hotels
  const sortHotels = document.getElementById('sortHotels');
  sortHotels && sortHotels.addEventListener('change', (e) => {
    const val = e.target.value;
    const arr = hotels.slice();
    arr.sort((a,b) => {
      const pa = Number(a.dataset.price||0), pb = Number(b.dataset.price||0);
      const ra = Number(a.dataset.rating||0), rb = Number(b.dataset.rating||0);
      if (val === 'price-low') return pa - pb;
      if (val === 'price-high') return pb - pa;
      if (val === 'rating') return rb - ra;
      return 0;
    });
    // re-append
    arr.forEach(n => hotelsGrid.appendChild(n));
  });

  // Sample: attach click handlers for view/book buttons
  document.querySelectorAll('.view-btn, .book-btn').forEach(b => {
    b.addEventListener('click', (ev) => {
      const card = ev.target.closest('.card');
      const title = card?.querySelector('.card-title')?.textContent || 'Item';
      showToast(`${title} — booking flow not implemented (demo)`);
    });
  });

  // Dark mode CSS class behavior — apply simple theme
  const style = document.createElement('style');
  style.textContent = `
    .tb-dark {
      --blue:#0b74b2; --deep:#021f35; --bg:#051523; --card:#072038; --muted:#9fb9d6; --accent:#f7b500;
      background:var(--bg) !important; color:#cfe6ff !important;
    }
    .tb-dark .booking-header { background: #01223e !important; box-shadow: none !important; }
    .tb-dark .search-bar { background: rgba(2,10,20,0.85) !important; }
    .tb-dark .card{ background: var(--card) !important; color: #e3f2ff !important;}
  `;
  document.head.appendChild(style);

});
