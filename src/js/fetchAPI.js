// import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31279729-f68fda383816d4b8eaf8d923a';

export let options = {
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: 40,
  },
};

// export async function getPhotos(q) {
//   try {
//     const response = await axios.get(`${BASE_URL}?q=${q}`, options);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

export function getPhotos(q) {
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${q}`, options)
    .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
      return response.json();
  })
  
}
