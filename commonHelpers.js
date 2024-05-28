import{a as y,S as L,i as u}from"./assets/vendor-c493984e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}})();async function h(e,r=1){const o=new URLSearchParams({key:"44023178-1b17cf85b995cf2d6fd44a474",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15});try{return(await y.get(`https://pixabay.com/api/?${o}`)).data}catch(a){return console.error("Error fetching images:",a),{hits:[]}}}function b(e){return`<li class="gallery-item">
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
      </li>`}function g(e){return e.map(b).join("")}const s={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),initialLoader:document.querySelector(".initial-loader"),loadMoreBtn:document.querySelector(".load-more")};let l=1,m="",f=0,c;function p(){c?c.refresh():c=new L(".gallery a",{captionDelay:250,captionsData:"alt",captionPosition:"bottom"})}function v(e){u.success({title:"Success!",message:`We found ${e} matches! Have fun!`,position:"topCenter",messageColor:"white"})}function w(){u.error({title:"Error!",message:"Sorry, there are no images matching your search query. Please try again!",position:"center",messageColor:"white",backgroundColor:"#f0bd40",progressBarColor:"#B51B1B"})}function d(){u.warning({title:"Caution!",message:"We're sorry, but you've reached the end of search results.",position:"topCenter",messageColor:"white",backgroundColor:"#2D4841",progressBarColor:"#658474"})}function B(){return document.querySelector(".gallery").firstElementChild.getBoundingClientRect().height}function C(){const e=B();window.scrollBy({top:e*2,behavior:"smooth"})}s.form.addEventListener("submit",async e=>{e.preventDefault();const r=e.target.elements.query.value.trim();l=1,m=r,s.initialLoader.classList.remove("is-hidden"),s.gallery.innerHTML="";const o=await h(r,l);if(s.initialLoader.classList.add("is-hidden"),o.hits.length===0)s.loadMoreBtn.classList.add("is-hidden"),w();else{const a=g(o.hits);s.gallery.innerHTML=a,p(),v(o.totalHits),o.hits.length<15&&d(),o.totalHits>15?s.loadMoreBtn.classList.remove("is-hidden"):s.loadMoreBtn.classList.add("is-hidden")}});s.loadMoreBtn.addEventListener("click",M);async function M(){l++,s.loadMoreBtn.classList.add("is-hidden"),s.gallery.insertAdjacentHTML("beforeend",'<div class="loader"></div>');const e=await h(m,l),r=document.querySelector(".gallery .loader");if(r&&r.remove(),e.hits.length===0)s.loadMoreBtn.classList.add("is-hidden"),d();else{const o=g(e.hits);s.gallery.insertAdjacentHTML("beforeend",o),p(),C(),f+=e.hits.length,f>=e.totalHits?(s.loadMoreBtn.classList.add("is-hidden"),d()):s.loadMoreBtn.classList.remove("is-hidden")}}
//# sourceMappingURL=commonHelpers.js.map
