
let currentImages = [];
let currentIndex = 0;

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalColor = document.getElementById('modal-color');
const closeBtn = document.querySelector('.close');
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');
const modalDots = document.getElementById('modal-dots');

function updateModalImage() {
    if (currentImages.length > 0) {
        modalImg.src = currentImages[currentIndex];
    }
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
    
    if (sliderPrev && sliderNext) {
        const hide = currentImages.length <= 1;
        sliderPrev.style.display = hide ? 'none' : 'flex';
        sliderNext.style.display = hide ? 'none' : 'flex';
    }
}

function createDots(count) {
    if (!modalDots) return;
    modalDots.innerHTML = '';
    
    if (count <= 1) {
        modalDots.style.display = 'none';
        return;
    }
    
    modalDots.style.display = 'flex';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.onclick = () => {
            currentIndex = i;
            updateModalImage();
        };
        modalDots.appendChild(dot);
    }
}

function openProductModal(card) {
    const title = card.querySelector('h3, h4')?.innerText || 'Товар';
    const desc = card.querySelector('p:not(.color p)')?.innerText || '';
    const price = card.querySelector('.price-tag')?.innerText || '';
    const colorText = card.querySelector('.color')?.innerText || '';
    
    const gallery = card.querySelector('.product-gallery');
    const images = [];
    
    if (gallery) {
        gallery.querySelectorAll('img').forEach(img => {
            if (img.src) images.push(img.src);
        });
    } else {
        const singleImg = card.querySelector('.product-image img');
        if (singleImg?.src) images.push(singleImg.src);
    }
    
    if (images.length === 0) images.push('images/product-dachshund.jpg');
    
    modalTitle.innerText = title;
    modalDesc.innerText = desc;
    modalPrice.innerText = price;
    modalColor.innerText = colorText;
    modalColor.style.display = colorText ? 'block' : 'none';
    
    currentImages = images;
    currentIndex = 0;
    createDots(images.length);
    updateModalImage();
    
    modal.style.display = 'block';
}

sliderPrev?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateModalImage();
});

sliderNext?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateModalImage();
});

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('order-button') || 
            e.target.closest('.order-button')) return;
        openProductModal(card);
    });
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

modalImg.onerror = () => modalImg.src = 'images/product-dachshund.jpg';

(function initMobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
        nav.classList.toggle('nav-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Меню');
        document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('nav-open')));

    nav.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => setOpen(false));
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) setOpen(false);
    });
})();