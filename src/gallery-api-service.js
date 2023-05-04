import axios from 'axios';
export class GalleryApiService {
  constructor() {
    this.textToSearch = '';
    this.page = 1;
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
        per_page: 40,
        page: this.page,
      };

      const resp = await axios({ params });
      const data = resp.data;
      console.log(data);
      this.setNextPage();
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
    this.page += 1;
  }

  setFirstPage() {
    this.page = 1;
  }
}
