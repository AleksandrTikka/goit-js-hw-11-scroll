import Axios from 'axios';
export function fetchImages(searchInput) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '28424420-2580f7fdb9c775c114ec2d9bf';
    const searchParams = new URLSearchParams({
        q: searchInput,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        key: API_KEY
    });
    return Axios(`${BASE_URL}?${searchParams}`)
       
};