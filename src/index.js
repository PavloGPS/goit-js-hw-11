import axios from 'axios';
import Notiflix from 'notiflix';

import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { GalleryApiService } from './gallery-api-service.js';


const searchFormEl = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

let simpleLightbox = new SimpleLightbox('.gallery .photo-card-wraper__link', {
    captionsData: 'alt',
    captionDelay: 250,
  })

const galleryApiService = new GalleryApiService();
console.dir(galleryApiService);

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onloadMoreBtnElClick);

async function onSearchFormSubmit(evt) {
  evt.preventDefault();
  try {
    const currentQueryText =
      evt.currentTarget.elements.searchQuery.value.trim();
    if (!currentQueryText) {
        removeGalleryMarkup();
      return;
    }
    galleryApiService.query = currentQueryText;
    removeGalleryMarkup();
    galleryApiService.setFirstPage();
    const data = await galleryApiService.fetchItems();
    if (!data.totalHits) {
      throw new Error('no hits');
    }
    renderGalleryMarkup(data.hits);
    simpleLightbox.refresh();
    
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  } catch (error) {
    if (error.message === 'no hits') {
      // loadMoreBtnEl must be hided
      onNoHitsErr();
    }
  }
}
async function onloadMoreBtnElClick(evt){
           
    try {
        galleryApiService.setNextPage();
        const data = await galleryApiService.fetchItems();
        renderGalleryMarkup(data.hits);
        simpleLightbox.refresh();            
            if (data.totalHits<= galleryApiService.page*galleryApiService.perPage) {
                loadMoreBtnEl.style.display = 'none';
            }
            smoothScroll();
          
        
    } catch (error) {
        
    }
}

function onNoHitsErr() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function removeGalleryMarkup() {
  galleryContainer.innerHTML = '';
//   simpleLightbox.refresh();
}

function createGalleryMarkup(array) {
  return array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {        
        return `
        <div class="photo-card">
        <a href="${largeImageURL}" class="photo-card-wraper__link link">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-card__image" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${downloads}
              </p>
            </div>
            </a>
        </div>
    `;
      }
    )
    .join('');
}

function renderGalleryMarkup(array) {
  galleryContainer.insertAdjacentHTML('beforeend', createGalleryMarkup(array));
  simpleLightbox.refresh();
}

function flowScrollOnLoadMore() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1.5,
    behavior: 'smooth',
  });
}
