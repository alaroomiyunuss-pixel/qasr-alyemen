// NAV SCROLL
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
});

navToggle.addEventListener('click', () => navList.classList.toggle('open'));
document.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => navList.classList.remove('open')));

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  document.querySelectorAll('.nav__link').forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}

// MENU FILTER
document.querySelectorAll('.menu__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu__tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    document.querySelectorAll('.menu-card').forEach(c => c.classList.toggle('hidden', cat !== 'all' && c.dataset.cat !== cat));
  });
});

// ORDER BUTTON
document.querySelectorAll('.menu-card .btn--primary').forEach(btn => {
  btn.addEventListener('click', () => {
    const orig = btn.textContent;
    btn.textContent = '✓ تمت الإضافة';
    btn.style.background = '#27ae60';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 2000);
  });
});

// RESERVATION FORM
document.getElementById('reservationForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '✓ تم تأكيد الحجز!';
  btn.style.background = '#27ae60';
  setTimeout(() => { btn.textContent = 'تأكيد الحجز'; btn.style.background = ''; e.target.reset(); }, 3500);
});

// SCROLL ANIMATIONS
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.menu-card, .testimonial-card, .contact__card, .about__feature, .gallery__item, .hours__info-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
