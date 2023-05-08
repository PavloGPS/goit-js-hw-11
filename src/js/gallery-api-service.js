import axios from 'axios';
export class GalleryApiService {
  constructor() {
    this.textToSearch = '';
    this.page = 1;
    this.perPage = 40;
    this.totalPages = 50;
  }

  async fetchItems() {
    try {
      axios.defaults.baseURL = 'https://pixabay.com/api/';
      const params = {
        key: '35881425-29f70e74d3fcf7112678d9ed3',
        q: this.textToSearch,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.perPage,
        page: this.page,
      };

      const resp = await axios({ params });
      const data = resp.data;
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  get query() {
    return this.textToSearch;
  }

  set query(newQuery) {
    this.textToSearch = newQuery;
  }

  setNextPage() {
    // if(!pageIsLast()){
    this.page += 1;
    // }
  }

  setFirstPage() {
    this.page = 1;
  }

  calculateTotalPages({ totalHits }) {
    this.totalPages = Math.ceil(totalHits / this.perPage);
  }

  pageIsLast() {
    return this.page == this.totalPages;
  }
}
