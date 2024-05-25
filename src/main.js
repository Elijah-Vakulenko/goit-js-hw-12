import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from 'axios';


// import { getImages } from './js/pixabay-api.js'; //← функція фетчу зображень з серверу
// import { galleryRender} from './js/render-functions.js'; //← імпорт функції рендеру

//===============================================================================
// імпорт DOM елементів

// const refs = {
//     form: document.querySelector('.search-form'),
//     gallery: document.querySelector('.gallery'),
//     loader: document.querySelector('.loader'),
//     loadMoreBtn: null,
// }

// let currentPage = 1; //← відображаємо номер поточної сторінки (після кожних 20 фото завантажуємо наступні 20, тобто додаємо нову сторінку)

// //===============================================================================
// // Налаштовуємо SimpleLightbox

// function initilizeLightbox() {
//     let lightbox = new SimpleLightbox('.gallery a', {
//     captionDelay: 250,
//     captionsData: 'alt',
//     captionPosition: 'bottom',
//     });
    
//      lightbox.refresh();
// }
// //===============================================================================
// //IziToast Alert

// function showNoResultsMessage() {
//     iziToast.error({
//         title: 'Error!',
//         message: `Sorry, there are no images matching your search query. Please try again!`,
//         position: "center",
//         messageColor: 'white',
//         backgroundColor: '#ff3d00',
//         progressBarColor: '#B51B1B',
//     });
// }

// //===============================================================================
// // Налаштовуємо слухач подій та визначаємо, що буде відбуватися при запиті

// refs.form.addEventListener('submit', event => {
//     event.preventDefault();
//     const query = event.target.elements.query.value.trim();
//     currentPage = 1;

//     refs.loader.classList.remove('is-hidden'); //← видаляємо клас visually hidden щоб показати, що йде пошук, сторінка чекає на завантаження даних.
    
//     getImages(query).then(data => {
//            if (data.hits.length === 0) {
//             // якщо немає результатів пошуку:
//                if (refs.loadMoreBtn) {
//                     refs.loadMoreBtn.remove(); // ← видаляю кнопку load more
//                 }
//                showNoResultsMessage(); //← запускаємо функцію оповіщення від iziToast;
//                refs.gallery.innerHTML = '';//← очищуємо галерею, якщо там лишився результат минулого пошуку;
//         } else {
//             //Якщо пошук за ключем дає результат, запускаємо рендер та виводимо зображення за допомогою Lightbox
//             const markup = galleryRender(data.hits);
//             refs.gallery.innerHTML = markup;
//                initilizeLightbox(); //← підключаємо Лайтбокс

//                //Тепер, після того як в нас вже завантажилися 20 зображень, ми створюємо кнопку "Завантажити ще"


//                if (data.totalHits > 20) {
//                 if (refs.loadMoreBtn) { //← якщо кнопка завантажити ще лишилася з минулого запиту то видаляємо її
//                     refs.loadMoreBtn.remove(); 
//                 }
//                 refs.loadMoreBtn = document.createElement('button');
//                 refs.loadMoreBtn.textContent = 'Load More';
//                 refs.loadMoreBtn.classList.add('load-more');
//                 refs.gallery.insertAdjacentElement('afterend', refs.loadMoreBtn); // ← додаємо кнопку після галереї
//                 refs.loadMoreBtn.addEventListener('click', loadMoreImages); // ← Викликаємо функцію завантаження наступних 20 зображень
//             }
//         }
//         // Ховаємо індикатор завантаження даних після завантаження зображень
//         refs.loader.classList.add('is-hidden');
//     });
// });

// //============================================================================
// // Додаємо наступну сторінку з 20ма зображеннями при кліку по кнопці

// function loadMoreImages() {
//     currentPage++; // 
//     const query = refs.form.elements.query.value.trim();

//     refs.loader.classList.remove('is-hidden');

//     getImages(query, currentPage).then(data => {
//         if (data.hits.length === 0) {
//             showNoResultsMessage();
//         } else {
//             const markup = galleryRender(data.hits);
//             refs.gallery.insertAdjacentHTML('beforeend', markup);

//             let lightbox = new SimpleLightbox('.gallery a',
//                 {
//                     captionDelay: 250,
//                     captionsData: 'alt',
//                     captionPosition: 'bottom',
//                 });
            
//             lightbox.refresh();
//         }

//         refs.loader.classList.add('is-hidden');
//     });
// }