import{S as f,i as m}from"./assets/vendor-8c59ed88.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();async function c(e,s=1){const i=new URLSearchParams({key:"44023178-1b17cf85b995cf2d6fd44a474",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15});try{return(await axios.get(`https://pixabay.com/api/?${i}`)).data}catch(l){showNoResultsMessage(),console.error("Error fetching images:",l)}}function h(e){return`<li class="gallery-item">
        <a class="gallery-link" href="${e.largeImageURL}"
          ><img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}"
        /></a>
        <ul class="image-description">
          <li class="info-item">
            <h3 class="info-title">Likes</h3>
            <p class="info-value">${e.likes}</p>
          </li>
          <li class="info-item">
            <h3 class="info-title">Views</h3>
            <p class="info-value">${e.views}</p>
          </li>
          <li class="info-item">
            <h3 class="info-title">Comments</h3>
            <p class="info-value">${e.comments}</p>
          </li>
          <li class="info-item">
            <h3 class="info-title">Downloads</h3>
            <p class="info-value">${e.downloads}</p>
          </li>
        </ul>
      </li>`}function u(e){return e.map(h).join("")}const r={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let n=1;function g(){new f(".gallery a",{captionDelay:250,captionsData:"alt",captionPosition:"bottom"}).refresh()}function d(){m.error({title:"Error!",message:"Sorry, there are no images matching your search query. Please try again!",position:"center",messageColor:"white",backgroundColor:"#ff3d00",progressBarColor:"#B51B1B"})}r.form.addEventListener("submit",e=>{e.preventDefault();const s=e.target.elements.query.value.trim();n=1,r.loader.classList.remove("is-hidden"),c(s).then(i=>{if(i.hits.length===0)r.loadMoreBtn&&r.loadMoreBtn.remove(),d(),r.gallery.innerHTML="";else{const l=u(i.hits);r.gallery.innerHTML=l,g(),i.totalHits>15&&(r.loadMoreBtn.classList.remove("is-hidden"),r.loadMoreBtn.addEventListener("click",p))}r.loader.classList.add("is-hidden")})});function p(){n++;const e=r.form.elements.query.value.trim();r.loader.classList.remove("is-hidden"),c(e,n).then(s=>{if(s.hits.length===0)d();else{const i=u(s.hits);r.gallery.insertAdjacentHTML("beforeend",i),r.loader.classList.add("is-hidden")}})}
//# sourceMappingURL=commonHelpers.js.map
