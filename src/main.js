//імпорт бібліотек та окремих скриптів:

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImages } from './js/pixabay-api.js'; //← функція фетчу зображень з серверу
import { galleryRender} from './js/render-functions.js'; //← імпорт функції рендеру

//===============================================================================
// імпорт DOM елементів

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    initialLoader: document.querySelector('.initial-loader'),
    loadMoreBtn: document.querySelector('.load-more'),
}

let currentPage = 1; //← відображаємо номер поточної сторінки (після кожних 15 фото завантажуємо наступні 15, тобто додаємо нову сторінку)
let currentQuery = '';
let totalHits = 0;
let lightbox;

//===============================================================================
// Налаштовуємо SimpleLightbox

function initializeLightbox() {
      if (lightbox) {
        lightbox.refresh();
    } else {
        lightbox = new SimpleLightbox('.gallery a', {
            captionDelay: 250,
            captionsData: 'alt',
            captionPosition: 'bottom',
        });
    }
}
//===============================================================================
//IziToast notifications:

function totalHitsQuantity(totalHits) { // функц. кількості знайдених співпадінь за ключем в пошуку;
    iziToast.success({
        title: 'Success!',
        message: `We found ${totalHits} matches! Have fun!`,
        position: "topCenter",
        messageColor: 'white',
    });
}

function showNoResultsMessage() { //функц. для помилки пошуку;
    iziToast.error({
        title: 'Error!',
        message: `Sorry, there are no images matching your search query. Please try again!`,
        position: "center",
        messageColor: 'white',
        backgroundColor: '#f0bd40',
        progressBarColor: '#B51B1B',
    });
}

function endOfSearchResults() { // функц. для кінця пошуку;
    iziToast.warning({
        title: 'Caution!',
        message: `We're sorry, but you've reached the end of search results.`,
        position: "topCenter",
        messageColor: 'white',
        backgroundColor: '#2D4841',
        progressBarColor: '#658474',
    });
}
//=================================================================================
//Скрол вниз 

function getCardHeight() { // Робимо функцію яка визначає висоту фотокартки;
    const gallery = document.querySelector('.gallery');
    const firstCard = gallery.firstElementChild;
    const cardHeight = firstCard.getBoundingClientRect().height;
    return cardHeight;
}

function smoothScroll() { //функція скролу на висоту двох карток;
    const cardHeight = getCardHeight();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}

//===============================================================================
// Налаштовуємо слухач подій та визначаємо, що буде відбуватися при запиті

refs.form.addEventListener('submit', async event => {
    event.preventDefault();
    const query = event.target.elements.query.value.trim();
    currentPage = 1;
    currentQuery = query;

    refs.initialLoader.classList.remove('is-hidden'); //← видаляємо клас visually hidden щоб показати, що йде пошук, сторінка чекає на завантаження даних.
    refs.gallery.innerHTML = '';
    
    const data = await getImages(query, currentPage);
    refs.initialLoader.classList.add('is-hidden');
    
    if (data.hits.length === 0) { //якшо пошук не дав результату, тобто знайдено 0 співпадінь з введеним query тоді:
        refs.loadMoreBtn.classList.add('is-hidden'); // додаємо клас і ховаємо кнопку "Завантажити ще"
        showNoResultsMessage(); // виводимо алерт що за нашим запитом нічого немає
    } else { //якщо я маю якісь результати:
        const markup = galleryRender(data.hits); // створюю галерею
        refs.gallery.innerHTML = markup;
        
        initializeLightbox(); // підключаю лайтбокс
        totalHitsQuantity(data.totalHits); // ← Виводжу кількість знайдених зображень;

        if (data.hits.length < 15) { // якщо кількість зображень менше 15
            endOfSearchResults(); // Виводимо повідомлення про кінець результатів пошуку
        }

        if (data.totalHits > 15) {  // якщо результат пошуку видає більше 15 зображень
            refs.loadMoreBtn.classList.remove('is-hidden'); // знімаю клас приховування і виводжу кнопку "Завантажити ще"
        } else {
            refs.loadMoreBtn.classList.add('is-hidden'); //якщо меньше 15ти, тоді кнопка ховається
        }
    }
});
    
//============================================================================
// Додаємо наступну сторінку з 15ма зображеннями при кліку по кнопці

//Встановлюємо слухач подій на кнопку "Завантажити ще"↓
refs.loadMoreBtn.addEventListener('click', loadMoreImages);

async function loadMoreImages() {
    currentPage++;  //додаємо до поточної сторінки ще одну
    refs.loadMoreBtn.classList.add('is-hidden'); // ховаємо кнопку "Load more"
    refs.gallery.insertAdjacentHTML('beforeend', '<div class="loader"></div>'); // додаємо loader


    const data = await getImages(currentQuery, currentPage); //завантажуємо діні з серверу
    const loader = document.querySelector('.gallery .loader');
    if (loader) {
        loader.remove(); // Видаляємо loader після завантаження нових зображень
    }

    if (data.hits.length === 0) { //якщо більше даних не приходить:
        refs.loadMoreBtn.classList.add('is-hidden'); //ховаємо кнопку
        endOfSearchResults(); //виводимо алерт що ми досягли кінцевого результату пошуку і більше зображень немає
    } else {
        const markup = galleryRender(data.hits); //якщо дані є:
        refs.gallery.insertAdjacentHTML('beforeend', markup); //створюємо галерею з отриманих даних
        
        initializeLightbox(); // запускаємо бібліотеку перегляду зображень
        smoothScroll() // вмикаємо скрол до нових зображень

        totalHits += data.hits.length;

       if (totalHits >= data.totalHits) {
            refs.loadMoreBtn.classList.add('is-hidden');
            endOfSearchResults();
        } else {
            refs.loadMoreBtn.classList.remove('is-hidden'); // Показуємо кнопку "Load more" якщо є ще зображення
        }
    }
}