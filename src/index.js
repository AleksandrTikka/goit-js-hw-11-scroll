import {Notify} from 'notiflix/build/notiflix-notify-aio';

refs = {
    form: document.getElementById('search-form'),
    input: document.getElementsByTagName('searchQuery'),
    submitBtn: document.querySelector('.submit'),
    gallery: document.querySelector('.gallery'),
    moreBtn: document.querySelector('.load-more'),

};

refs.form.addEventListener('submit', onSubmitBtn);

function onSubmitBtn(e) {
    e.preventDefault();
    const searchInput = e.currentTarget.elements.searchQuery.value;
    console.log(searchInput);
    if (searchInput === "") {
        Notify.info("Search input is empty... Please enter a new word");
        clearGallery();
                
    };
    fetchImages(searchInput)
    .then((images) => {
        const galleryMarkup = images.map(image => renderGallery(image));
        refs.gallery.i
    })

};

function clearGallery() {
    refs.gallery.innerHTML = '';
};