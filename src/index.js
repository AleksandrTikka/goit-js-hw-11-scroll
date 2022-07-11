import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './js/fetchImages.js';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    form: document.getElementById('search-form'),
    gallery: document.querySelector('.gallery'),
    moreImgBtn: document.querySelector('.load-more'),
};

let gallery = new SimpleLightbox('.gallery a');


let searchInput = '';
let page = null;
const perPage = 40;
export { page, perPage, searchInput };
refs.moreImgBtn.classList.add('hidden');
refs.form.addEventListener('submit', onSubmitBtn);
// refs.moreImgBtn.addEventListener('click', onClickMoreImgBtn);

async function onSubmitBtn(e) {
  e.preventDefault();  
  clearGallery(); 
    
  searchInput = e.currentTarget.elements.searchQuery.value.trim().toLowerCase();
  page = 1;  
  console.log(searchInput);
  if (searchInput === "") {
      refs.moreImgBtn.classList.add('hidden');
     return Notify.info("Search input is empty... Please enter a new word");
    };
  try {       
    const images = await fetchImages(searchInput);
    console.log(images);
    if (images.totalHits === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      refs.moreImgBtn.classList.add('hidden');
      clearGallery();
    };
      Notify.success(`Hooray! We found ${images.totalHits} images.`);
      console.log(images.totalHits);      
    galleryMarkup(images.hits);     
    refs.moreImgBtn.classList.remove('hidden');
    checkMessageAboutEnd(images);
      gallery.refresh();
                           
  }
  catch (error) {    
    console.log(error.message);
  };
   
};  

function galleryMarkup(images) {
  const markup = images.map(image => renderGallery(image)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
};
   
function renderGallery({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, } = image) {
  return `
 
  <div class="photo-card">
   <a class="gallery__link" href="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}
      </p>
      <p class="info-item">
        <b>Views</b>${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>
  `
};



async function onClickMoreImg(images) {
  try {
    refs.moreImgBtn.classList.add('hidden');
    page += 1;
  images = await fetchImages(searchInput);
  
    galleryMarkup(images.hits);
    refs.moreImgBtn.classList.remove('hidden');
    checkMessageAboutEnd(images);
  gallery.refresh();
  }
  catch (error) {
    console.log(error.message);
  }
};

function clearGallery() {
    refs.gallery.innerHTML = '';
};

const optionsObserve = {
  rootMargin: '0px',
  treshold: 1.0,
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Шляпа');
      //1. делаем HTTP-запрос


      //2. добавляем разметку
      onClickMoreImg()
      
    }
  });
}, optionsObserve);

observer.observe(document.querySelector('.scroll-quard'));

function checkMessageAboutEnd(images) {
  const totalPage = Math.ceil(images.totalHits / perPage);
  if (page === totalPage) {
    refs.moreImgBtn.classList.add('hidden');
    return Notify.warning("We're sorry, but you've reached the end of search results.");
  }
};



