const cards = document.querySelectorAll('.product-card');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalColor = document.getElementById('modal-color');
const closeBtn = document.querySelector('.close');

cards.forEach(card => {
    card.addEventListener('click', () => {
        modalImg.src = card.querySelector('img').src;
        modalTitle.innerText = card.querySelector('h3, h4').innerText;
        modalDesc.innerText = card.querySelector('p').innerText;
        modalPrice.innerText = card.querySelector('.price-tag').innerText;
        const colorElement = card.querySelector('.color');
        if (colorElement) {
            modalColor.innerText = colorElement.innerText;
            modalColor.style.display = 'block';
        } else {
            modalColor.style.display = 'none';
        }
        
        modal.style.display = 'block';
    });
});

closeBtn.onclick = () => modal.style.display = 'none';

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
};
