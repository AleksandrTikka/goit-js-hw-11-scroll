import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './js/fetchImages.js';
import SimpleLightbox from "simplelightbox";

refs = {
    form: document.getElementById('search-form'),
    input: document.getElementsByTagName('searchQuery'),
    submitBtn: document.querySelector('.submit'),
    gallery: document.querySelector('.gallery'),
    moreBtn: document.querySelector('.load-more'),

};

refs.form.addEventListener('submit', onSubmitBtn);
let searchInput = '';
function onSubmitBtn(e) {
    e.preventDefault();
    searchInput = e.currentTarget.elements.searchQuery.value.trim().toLowerCase();
    console.log(searchInput);
    if (searchInput === "") {
        Notify.info("Search input is empty... Please enter a new word");
        clearGallery();
                
    };
  fetchImages(searchInput)
    .then((images) => {
      const galleryMarkup = images.map(image => renderGallery(image)).join('')
        

      
      refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup)
    })
    .catch((error) => {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return error
    });
    
    let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox', function () {
        // do something…
    });

    gallery.on('error.simplelightbox', function (e) {
        console.log(e); // some usefull information
    });

};

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