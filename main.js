
import galleryItems from "./app.js";

   const galleryMain = document.querySelector('.gallery');
   const lightbox = document.querySelector('.lightbox');
   const lightboxOverlay = document.querySelector('.lightbox__overlay');
   const modal = document.querySelector('.lightbox__content');
   const lightboxImage = document.querySelector('.lightbox__image');
   const btn = document.querySelector('[data-action="close-lightbox"]');
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

function toTheSide(e) {
  if (e.code === "ArrowLeft") {

  }
  if (e.code === "ArrowRight") {
 
  }
}



  