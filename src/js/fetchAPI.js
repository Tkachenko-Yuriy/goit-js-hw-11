// import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31279729-f68fda383816d4b8eaf8d923a';

// export let page = 1;


// export async function getPhotos(q) {
//   try {
//     const response = await axios.get(`${BASE_URL}?q=${q}`, options);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

export function getPhotos(q, page) {
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
    .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
      return response.json();
  })
  
}

