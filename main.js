
import galleryItems from "./app.js";

   const galleryMain = document.querySelector('.gallery');
   const lightbox = document.querySelector('.lightbox');
   const lightboxOverlay = document.querySelector('.lightbox__overlay');
   const modal = document.querySelector('.lightbox__content');
   const lightboxImage = document.querySelector('.lightbox__image');
   const btn = document.querySelector('[data-action="close-lightbox"]');
  //  const lightboxButton = document.querySelector('.lightbox__button');
   const imageMarkup = createGalleryItems(galleryItems);


  galleryMain.insertAdjacentHTML("beforeend", imageMarkup);
  galleryMain.addEventListener("click", onGalleryMainClick);
  btn.addEventListener("click", onCloseBtn);
  lightboxOverlay.addEventListener("click", onBackdropClick);

function createGalleryItems(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
        <a class="gallery__link">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li> `;
    }) .join("");
}
function onGalleryMainClick(e) {
const isGalleryImageEl = !e.target.classList.contains("gallery__image");
  if (isGalleryImageEl) {
    return;
  }
  window.addEventListener("keydown", onEscapePress);
  

  onClickImage(e);
 
}
function onClickImage(e) {
  e.preventDefault();
  lightboxImage.dataset.index = e.target.dataset.index;
  addClassIsOpen();
  window.addEventListener("keydown", toTheSide);
  addImgAttribute(e);


}

function addImgAttribute(e) {
  const attrImg = e.target.dataset.source;
  lightboxImage.src = attrImg;
}

function addClassIsOpen() {
  lightbox.classList.add("is-open");
}

function onCloseBtn() {
  lightbox.classList.remove("is-open");
  emptyImgAtribute();
}

function emptyImgAtribute() {
  if (!lightbox.classList.contains("is-open")) {
    lightboxImage.setAttribute("src", "");
  }
}

// ////////////////////////////

function onBackdropClick(e){
  if(e.currentTarget === e.target){
    onCloseBtn();
  }
}

function onEscapePress(e) {
  if (e.code === "Escape") {
    onCloseBtn(e);
  }
}
// ///////////////////////////////////////////////////////////////////////////
function onEnterOpener(e) {
  if (e.code === "Enter") {
   
  }
}


function toTheSide(e) {
  if (e.code === "ArrowLeft") {
    onArrowLeft();
  }
  if (e.code === "ArrowRight") {
    onArrowRight();
  }
}

function onArrowLeft() {
  let index = Number(lightboxImage.dataset.index);
  if (index === 0) {
    findNewIndex(galleryItems.length - 1);
    return;
  }
  findNewIndex(index, -1);
}

function onArrowRight() {
  let index = Number(lightboxImage.dataset.index);
  if (index === galleryItems.length - 1) {
    findNewIndex(0);
    return;
  }
  findNewIndex(index, 1);
}

function findNewIndex(index, i = 0) {
  lightboxImage.dataset.index = `${index + i}`;
  lightboxImage.src = galleryItems[index + i].original;
}

  