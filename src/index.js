import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getPhotos} from './js/fetchAPI';
import tempGallery from './templates/gallery.hbs';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};


let page = 1;
let query = '';

// const simpleLightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   scrollZoomFactor: false,
// });

refs.loadMoreBtn.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onMoreClick);

function onSearchForm(evt) {
  evt.preventDefault();
  page = 1;
  refs.loadMoreBtn.classList.remove('is-hidden');
  const request = evt.currentTarget.searchQuery.value.trim();

  refs.gallery.innerHTML = '';

    if (request === '') {
      loadMore.classList.add('is-hidden');
      Notify.failure(
        'The search string cannot be empty. Please specify your search query.'
      );
      return;
    }

  getPhotos(request,page).then(data => {
    if (data.totalHits === 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }else {
        markupGallery(data.hits);
        // simpleLightbox().refresh()
          Notify.success(`Hooray! We found ${data.totalHits} images.`);
        query = request;
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
  page += 1;
  getPhotos(query, page)
    .then( data  => {
      markupGallery(data.hits);
      // simpleLightbox().refresh()

      const totalPages = Math.ceil(data.totalHits / data.hits.length);

      if (page >= totalPages) {
          refs.loadMoreBtn.classList.add('is-hidden');
        Notify.success(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}


