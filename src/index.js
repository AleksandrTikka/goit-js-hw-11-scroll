import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './js/fetchImages.js';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

refs = {
    form: document.getElementById('search-form'),
    input: document.getElementsByTagName('searchQuery'),
    submitBtn: document.querySelector('.submit'),
    gallery: document.querySelector('.gallery'),
    moreBtn: document.querySelector('.load-more'),

};

let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', function () {
	// do something…
});

gallery.on('error.simplelightbox', function (e) {
	console.log(e); // some usefull information
});

refs.form.addEventListener('submit', onSubmitBtn);
let searchInput = '';

async function onSubmitBtn(e) {
  
    e.preventDefault();
    
  console.log(searchInput);
  try {
    searchInput = e.currentTarget.elements.searchQuery.value.trim().toLowerCase();
    if (searchInput === "") {
      Notify.info("Search input is empty... Please enter a new word");
      clearGallery();                
    };
    const response = await fetchImages(searchInput);
    const images = await response.data;
    console.log(images);      
    galleryMarkup(images.hits);        
    
    
      
  }
  catch (error) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    console.log(error);
  }
};
  

  function galleryMarkup(images) {
    const markup = images.map(image => renderGallery(image)).join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup);
}
  
   



function renderGallery({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, } = image) {
  return `
<div class="photo-card">
<a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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



function clearGallery() {
    refs.gallery.innerHTML = '';
};