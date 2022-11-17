import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getPhotos, options } from './js/fetchAPI';
import tempGallery from './templates/gallery.hbs';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let query = '';
// let gallery = new SimpleLightbox('.gallery a');

refs.loadMoreBtn.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onMoreClick);

function onSearchForm(evt) {
  evt.preventDefault();
  options.params.page = 1;
  refs.loadMoreBtn.classList.remove('is-hidden');
  const q = evt.currentTarget.searchQuery.value.trim();

  refs.gallery.innerHTML = '';

  if (q === '') {
    loadMore.classList.add('is-hidden');
    Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }

  getPhotos(q).then(data => {
    if (data.totalHits === 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        markupGallery(data.hits);
        // gallery.refresh();
          Notify.success(`Hooray! We found ${data.totalHits} images.`);
        query = q;
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      refs.searchForm.reset();
    });
}

function markupGallery(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', tempGallery(hits));
}

function onMoreClick(e) {
  options.params.page += 1;
  getPhotos(query)
    .then( data  => {
      markupGallery(data.hits);
      // gallery.refresh();

      const totalPages = Math.ceil(data.totalHits / options.params.per_page);

      if (options.params.page > totalPages) {
           refs.loadMoreBtn.classList.add('is-hidden');
        Notify.success(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}


