// Переменные для слайдера
let currentImages = [];
let currentIndex = 0;

// Элементы модального окна
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

// Обновление фото и точек
function updateModalImage() {
    if (currentImages.length > 0) {
        modalImg.src = currentImages[currentIndex];
    }
    
    // Обновляем точки
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
    
    // Прячем стрелки если фото мало
    if (sliderPrev && sliderNext) {
        const hide = currentImages.length <= 1;
        sliderPrev.style.display = hide ? 'none' : 'flex';
        sliderNext.style.display = hide ? 'none' : 'flex';
    }
}

// Создание точек
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

// Открытие модального окна
function openProductModal(card) {
    // Собираем данные из карточки
    const title = card.querySelector('h3, h4')?.innerText || 'Товар';
    const desc = card.querySelector('p:not(.color p)')?.innerText || '';
    const price = card.querySelector('.price-tag')?.innerText || '';
    const colorText = card.querySelector('.color')?.innerText || '';
    
    // Собираем все фото из карточки
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
    
    // Заглушка если нет фото
    if (images.length === 0) images.push('images/product-dachshund.jpg');
    
    // Заполняем модалку
    modalTitle.innerText = title;
    modalDesc.innerText = desc;
    modalPrice.innerText = price;
    modalColor.innerText = colorText;
    modalColor.style.display = colorText ? 'block' : 'none';
    
    // Запускаем слайдер
    currentImages = images;
    currentIndex = 0;
    createDots(images.length);
    updateModalImage();
    
    modal.style.display = 'block';
}

// Стрелки
sliderPrev?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateModalImage();
});

sliderNext?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateModalImage();
});

// Клик по карточкам
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Не открывать при клике на кнопку
        if (e.target.classList.contains('order-button') || 
            e.target.closest('.order-button')) return;
        openProductModal(card);
    });
});

// Закрытие модалки
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Обработка ошибки загрузки фото
modalImg.onerror = () => modalImg.src = 'images/product-dachshund.jpg';