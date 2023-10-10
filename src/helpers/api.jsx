import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36050321-b79e46b27631ddd2509fd0134';
export const perPage = 12
export const fetchImages = async (page, query) => {
   
  
    const {data} = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
    return data;
}