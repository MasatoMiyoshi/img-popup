import t from"animejs/lib/anime.es.js";import{fadeIn as e,fadeOut as i}from"@masatomiyoshi/fade";class o{constructor(t){this.currentImage={url:"",title:""},this.options=Object.assign(this.defaultOptions,t)}get defaultOptions(){return{containerID:"img_popup",fadeDuration:600,imageFadeDuration:600,positionFromTop:50,resizeDuration:700}}get containerID(){return this.options.containerID}init(){document.querySelector("body").insertAdjacentHTML("beforeend",this.overlayHTML),document.querySelector("body").insertAdjacentHTML("beforeend",this.containerHTML),this.popup=document.querySelector(`#${this.containerID}`),this.overlay=document.querySelector(`#${this.containerID}-overlay`),this.outerContainer=this.popup.querySelector(".img_popup-outer_container"),this.container=this.popup.querySelector(".img_popup-container"),this.image=this.popup.querySelector("img.img_popup-image"),this.containerPadding={top:parseInt(this.computedStyle(this.container,"padding-top"),10),right:parseInt(this.computedStyle(this.container,"padding-right"),10),bottom:parseInt(this.computedStyle(this.container,"padding-bottom"),10),left:parseInt(this.computedStyle(this.container,"padding-left"),10)},this.imageBorderWidth={top:parseInt(this.computedStyle(this.image,"border-top-width"),10),right:parseInt(this.computedStyle(this.image,"border-right-width"),10),bottom:parseInt(this.computedStyle(this.image,"border-bottom-width"),10),left:parseInt(this.computedStyle(this.image,"border-left-width"),10)},this.overlay.addEventListener("click",t=>{t.preventDefault(),this.end()}),this.popup.style.display="none",this.popup.addEventListener("click",t=>{t.preventDefault(),t.target.getAttribute("id")==this.containerID&&this.end()}),this.outerContainer.addEventListener("click",t=>{t.preventDefault(),t.target.getAttribute("id")==this.containerID&&this.end()}),this.popup.querySelector(".img_popup-image_link").addEventListener("click",t=>{t.preventDefault(),window.open(t.currentTarget.getAttribute("href"),"_blank")}),Array.prototype.forEach.call(this.popup.querySelectorAll(".img_popup-loader, .img_popup-cancel, .img_popup-close"),t=>{t.addEventListener("click",t=>{t.preventDefault(),this.end()})})}get overlayHTML(){return`<div id="${this.containerID}-overlay" class="img_popup-overlay"></div>`}get containerHTML(){return`\n    <div id="${this.containerID}" class="img_popup">\n      <div class="img_popup-outer_container">\n        <div class="img_popup-container">\n          <a class="img_popup-image_link" href="" target="_blank">\n            <img class="img_popup-image" src="" />\n          </a>\n          <div class="img_popup-loader">\n            <a class="img_popup-cancel"></a>\n          </div>\n        </div>\n        <div class="img_popup-data_container">\n          <div class="img_popup-data">\n            <div class="img_popup-details">\n              <span class="img_popup-caption"></span>\n            </div>\n            <div class="img_popup-close_container">\n              <a class="img_popup-close"></a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>`}run(t){0!=t.length&&Array.prototype.forEach.call(t,t=>{let e,i,o,r=t.tagName;if("A"==r)e=t.getAttribute("data-image"),i=t.getAttribute("href");else{if("IMG"!=r)return;e=t.getAttribute("src"),i=t.getAttribute("src")}if(void 0!==e&&null!=e){try{o=new URL(e,window.location)}catch(t){}if(o&&o.pathname.match(/\.(gif|jpe?g|png|bmp|webp)$/i)){let o;"A"==r?o=t.querySelector("img").getAttribute("alt"):"IMG"==r&&(o=t.getAttribute("alt")),o=o||t.getAttribute("title")||"",t.addEventListener("click",t=>{t.preventDefault(),this.start(e,i,o)})}}})}start(t,i,o){let r=this.popup.querySelector("img.img_popup-image"),n=document.documentElement.scrollTop||document.body.scrollTop,p=document.documentElement.scrollLeft||document.body.scrollLeft;this.popup.style.top=n+this.options.positionFromTop+"px",this.popup.style.left=p+"px",e(this.popup,{duration:this.options.fadeDuration}),e(this.overlay,{duration:this.options.fadeDuration,beginFunc:()=>{this.showOverlay()}}),e(this.popup.querySelector(".img_popup-loader"),{duration:600}),Array.prototype.forEach.call(this.popup.querySelectorAll(".img_popup-data_container, .img_popup-caption"),t=>{t.style.display="none"}),r.style.display="none",this.outerContainer.classList.add("img_popup-animating");let a=new Image;a.onload=()=>{let t=window.innerWidth,e=window.innerHeight,i=t-this.containerPadding.left-this.containerPadding.right-this.imageBorderWidth.left-this.imageBorderWidth.right-20,o=e-this.containerPadding.top-this.containerPadding.bottom-this.imageBorderWidth.top-this.imageBorderWidth.bottom-120;if(r.setAttribute("src",a.src),r.style.width=a.width+"px",r.style.height=a.height+"px",a.width>i||a.height>o)if(a.width/i>a.height/o){let t=i,e=parseInt(a.height/(a.width/t),10);r.style.width=t+"px",r.style.height=e+"px"}else{let t=o,e=parseInt(a.width/(a.height/t),10);r.style.width=e+"px",r.style.height=t+"px"}this.sizeContainer(r)},this.currentImage.url=i,this.currentImage.title=o,a.src=t}sizeContainer(e){let i=this.outerContainer.offsetWidth,o=this.outerContainer.offsetHeight,r=parseInt(this.computedStyle(e,"width"),10)+this.containerPadding.left+this.containerPadding.right+this.imageBorderWidth.left+this.imageBorderWidth.right,n=parseInt(this.computedStyle(e,"height"),10)+this.containerPadding.top+this.containerPadding.bottom+this.imageBorderWidth.top+this.imageBorderWidth.bottom;e.style.width=r+"px",e.style.height=n+"px",i!==r||o!==n?t({targets:this.outerContainer,width:r,height:n,duration:this.options.resizeDuration,easing:"easeOutSine",complete:t=>{this.postResize(r)}}):this.postResize(r)}postResize(t){this.popup.querySelector(".img_popup-data_container").style.width=t+"px",this.showImage(),this.updateLink(),this.updateDetails()}showImage(){let i=this.popup.querySelector(".img_popup-loader");t.remove(i),i.style.display="none",e(this.popup.querySelector(".img_popup-image"),{duration:this.options.imageFadeDuration})}showOverlay(){this.overlay.style.display="block"}updateLink(){this.popup.querySelector(".img_popup-image_link").setAttribute("href",this.currentImage.url)}updateDetails(){let t=this.popup.querySelector(".img_popup-caption");t.innerHTML=this.currentImage.title,e(t,{duration:200}),this.outerContainer.classList.remove("img_popup-animating"),e(this.popup.querySelector(".img_popup-data_container"),{duration:this.options.resizeDuration,completeFunc:()=>{this.showOverlay()}})}end(){window.removeEventListener("resize",this.sizeOverlay),i(this.popup,{duration:this.options.fadeDuration}),i(this.overlay,{duration:this.options.fadeDuration})}computedStyle(t,e){return document.defaultView.getComputedStyle(t).getPropertyValue(e)}}export{o as default};
//# sourceMappingURL=index.modern.mjs.map
