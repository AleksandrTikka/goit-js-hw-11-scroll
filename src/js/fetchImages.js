import Axios from 'axios';
import { page, perPage, searchInput } from '../index.js';
export async function fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '28424420-2580f7fdb9c775c114ec2d9bf';
    const searchParams = new URLSearchParams({
        q: searchInput,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        key: API_KEY,
        page,
        per_page: perPage,
    });
    
    const response = await Axios.get(`${BASE_URL}?${searchParams}`);
    
    
    return response.data;
       
};