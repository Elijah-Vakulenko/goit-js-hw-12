
function imageTamplate(image) {
    return `<li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}"
          ><img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}"
        /></a>
        <ul class="image-description">
          <li class="info-item">
            <h3 class="info-title">Likes</h3>
            <p class="info-value">${image.likes}</p>
          </li>
          <li class="info-item">
            <h3 class="info-title">Views</h3>
            <p class="info-value">${image.views}</p>
          </li>
          <li class="info-item">
            <h3 class="info-title">Comments</h3>
            <p class="info-value">${image.comments}</p>
          </li>
          <li class="info-item">
            <h3 class="info-title">Downloads</h3>
            <p class="info-value">${image.downloads}</p>
          </li>
        </ul>
      </li>`
}

export function galleryRender(array) {
    return array.map(imageTamplate).join('');
    }
