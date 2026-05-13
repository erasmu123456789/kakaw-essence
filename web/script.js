/* ============================
   KAKAW-ESSENCE - SCRIPT
   Cart, Sidebar, Filters, Scroll animations
============================ */

/* ---------------------------
   CART STATE
---------------------------- */
let cart = [];

const cartModal = document.getElementById('cartModal');
const cartItemsList = document.getElementById('cartItemsList');
const cartOverlay = document.getElementById('cartOverlay');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotalEl = document.getElementById('cartTotal');

function openCart() {
  if (cartModal) cartModal.classList.add('open');
  if (cartOverlay) cartOverlay.classList.add('open');
  renderCart();
}

function closeCart() {
  if (cartModal) cartModal.classList.remove('open');
  if (cartOverlay) cartOverlay.classList.remove('open');
}

function addToCart(name, price, img, category) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, img, category, qty: 1 });
  }
  updateCartBadge();
  openCart();
}

function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  updateCartBadge();
  renderCart();
}

function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(name);
  else renderCart();
  updateCartBadge();
}

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  if (cartCount) {
    cartCount.textContent = total;
    cartCount.style.display = total > 0 ? 'flex' : 'none';
  }
}

function renderCart() {
  if (!cartItemsList) return;

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon"></div>
        <p>Tu carrito está vacío</p>
        <a href="#catalogo" class="btn-dark" onclick="closeCart()" style="margin-top:.5rem">Ver Catálogo</a>
      </div>
    `;
  } else {
    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <span class="item-cat">${item.category}</span>
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeQty('${item.name}', -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.name}', 1)">+</button>
          </div>
        </div>
        <span class="item-price">${(item.price * item.qty).toFixed(2)}€</span>
      </div>
    `).join('');
  }

  if (cartSubtotal)
    cartSubtotal.querySelector('span:last-child').textContent = subtotal.toFixed(2) + '€';

  if (cartTotalEl)
    cartTotalEl.querySelector('span:last-child').textContent = subtotal.toFixed(2) + '€';
}

/* ---------------------------
   SIDEBAR
---------------------------- */
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  if (sidebar) sidebar.classList.add('open');
  if (sidebarOverlay) sidebarOverlay.style.display = 'block';
}

function closeSidebar() {
  if (sidebar) sidebar.classList.remove('open');
  if (sidebarOverlay) sidebarOverlay.style.display = 'none';
}

if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) closeSidebar();
  });
});

/* ---------------------------
   ACTIVE NAV ON SCROLL
---------------------------- */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');

function setActiveNav() {
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + section.id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

/* ---------------------------
   SCROLL REVEAL
---------------------------- */
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* ---------------------------
   PRODUCT FILTER
---------------------------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.getAttribute('data-filter');

    productCards.forEach(card => {
      card.style.display = (cat === 'all' || card.getAttribute('data-category') === cat)
        ? ''
        : 'none';
    });
  });
});

/* ---------------------------
   NEWSLETTER
---------------------------- */
const newsForm = document.getElementById('newsletterForm');
if (newsForm) {
  newsForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = newsForm.querySelector('button');
    btn.textContent = '¡Suscrito!';
    setTimeout(() => {
      btn.textContent = 'Suscribirse';
      newsForm.reset();
    }, 2500);
  });
}

/* ---------------------------
   CART OVERLAY CLOSE
---------------------------- */
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
