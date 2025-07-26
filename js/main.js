// 🌟 Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 📬 Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const subject = document.getElementById('subject')?.value;
    const message = document.getElementById('message')?.value;

    console.log({ name, email, subject, message });

    alert('✅ Your message has been sent successfully!');
    this.reset();
  });
}

// ✨ Intersection Observer for Scroll Animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;

      if (el.classList.contains('animate-on-scroll-left')) {
        el.classList.add('animate-slide-left');
      }

      if (el.classList.contains('animate-on-scroll-right')) {
        el.classList.add('animate-slide-right');
      }
      if (el.classList.contains('fade-in-up')) {
    el.classList.add('visible');
      }

      el.classList.remove('opacity-0', 'translate-x-20', '-translate-x-20');
      observer.unobserve(el);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(
  '.animate-on-scroll-left, .animate-on-scroll-right, .transition-section, .delay-1, .delay-2, .delay-3, .fade-in-up'
).forEach(el => {
  observer.observe(el);
});

// 🌓 Dark/Light Mode Toggle using checkbox switch
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  // Apply saved theme on load
  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark');
    themeToggle.checked = true;
  } else {
    document.documentElement.classList.remove('dark');
    themeToggle.checked = false;
  }

  // Toggle theme on checkbox change
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  });
}

// 🌀 SwiperJS Configuration for Certifications
const swiper = new Swiper('.mySwiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 150,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  speed: 2000,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

function toggleDetails(button) {
  const details = button.parentElement.nextElementSibling;
  details.classList.toggle('hidden');
}

document.querySelectorAll('.read-more-btn').forEach((btn, index, allBtns) => {
  btn.addEventListener('click', () => {
    const allContents = document.querySelectorAll('.read-more-content');

    allContents.forEach((content, idx) => {
      const isSame = idx === index;

      if (isSame) {
        const isOpen = content.classList.contains('opacity-100');
        content.style.maxHeight = isOpen ? '0px' : '160px';
        content.classList.toggle('opacity-0');
        content.classList.toggle('opacity-100');
      } else {
        content.style.maxHeight = '0px';
        content.classList.remove('opacity-100');
        content.classList.add('opacity-0');
      }
    });
  });
});

// 🔁 Flip Cards
document.querySelectorAll('.flip-card').forEach(card => {
  const readMore = card.querySelector('.read-more-btn');
  const backBtn = card.querySelector('.back-btn');

  readMore.addEventListener('click', () => {
    // Collapse other flipped cards
    document.querySelectorAll('.flip-card').forEach(c => c.classList.remove('flipped'));
    card.classList.add('flipped');
  });

  backBtn.addEventListener('click', () => {
    card.classList.remove('flipped');
  });
});

// 🎯 Animate Skill Bars on Scroll
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.progress-bar');
      const percent = parseInt(entry.target.getAttribute('data-percentage'), 10);
      bar.style.width = percent + '%';
      bar.classList.add('transition-all', 'duration-1000');
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-bar').forEach(skill => {
  progressObserver.observe(skill);
});
