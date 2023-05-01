import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// https://pixabay.com/api/
// Your API key: 35881425-29f70e74d3fcf7112678d9ed3

function flowScrollOnLoadMore(){
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 1.5,
  behavior: "smooth",
});
}
// axios.get('/users')
//   .then(res => {
//     console.log(res.data);
//   });