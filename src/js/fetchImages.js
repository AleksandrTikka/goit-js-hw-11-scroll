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
    return fetch(`${BASE_URL}?${searchParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};