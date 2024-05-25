export async function getImages(query, page = 1) {
    // const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        key: '44023178-1b17cf85b995cf2d6fd44a474', // ← Персональний ключ
        q: query, //← Введений нами запит
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
    });

//     const url = `${BASE_URL}?${params}`;

// return fetch(url).then(response => {
//         if (!response.ok) {
//             throw new Error(response.statusText)
//         }
//         return response.json();
//     })
//     .then(data => {
//         return data; //← виводимо отриману інформацію з серверу
//     })
//     .catch(error => {
//         showNoResultsMessage()
//         console.error("Error fetching images:", error);
//     });
}
    