export async function getImages(query, page = 1) {
    const params = new URLSearchParams({
        key: '44023178-1b17cf85b995cf2d6fd44a474', // ← Персональний ключ
        q: query, //← Введений нами запит
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
    });
    
    try {
        const imageRequest = await axios.get(`https://pixabay.com/api/?${params}`)
        return imageRequest.data; //← виводимо отриману інформацію з серверу
    } catch(error) {
                showNoResultsMessage()
        console.error("Error fetching images:", error);
    };
};

    