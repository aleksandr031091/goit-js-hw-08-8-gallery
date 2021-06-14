// Разбей задание на несколько подзадач:
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
// пока грузится изображение, мы не видели предыдущее.

import dataImages from "./app.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  ightboxImage: document.querySelector(".lightbox__image"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  btnClose: document.querySelector(".lightbox__button"),
};

const renderMarkup = renderMarcupGallery(dataImages);
refs.gallery.innerHTML = renderMarkup;

refs.gallery.addEventListener("click", onClickImage);
refs.btnClose.addEventListener("click", removeClass);
refs.lightboxOverlay.addEventListener("click", removeClass);
window.addEventListener("keyup", onPress);

function renderMarcupGallery(galleryImages) {
  return galleryImages
    .map(
      ({ preview, original, description }) => `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
}

function onClickImage(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  refs.lightbox.classList.add("is-open");
  refs.ightboxImage.src = event.target.dataset.source;
  refs.ightboxImage.alt = event.target.alt;
}

function removeClass() {
  refs.lightbox.classList.remove("is-open");
  refs.ightboxImage.src = "";
  refs.ightboxImage.alt = "";
}
function onPress(event) {
  if (event.keyCode === 27) {
    removeClass();
  }
}
