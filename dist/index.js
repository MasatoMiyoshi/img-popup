function t(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var e=/*#__PURE__*/t(require("animejs/lib/anime.es.js"));function i(t,i,o){var{beginFunc:n,completeFunc:r}=o,p=getComputedStyle(t).opacity;p=void 0===p?1:parseFloat(p),t.style.opacity=0,e.default({targets:t,opacity:p,duration:i,easing:"linear",begin:function(e){t.style.display="",void 0!==n&&n()},complete:function(e){t.style.opacity=null,void 0!==r&&r()}})}function o(t,i,o){var{beginFunc:n,completeFunc:r}=o;e.default({targets:t,opacity:0,duration:i,easing:"linear",begin:function(t){void 0!==n&&n()},complete:function(e){t.style.opacity=null,t.style.display="none",void 0!==r&&r()}})}module.exports=class{constructor(t){this.currentImage={url:"",title:""},this.options=Object.assign(this.defaultOptions,t)}get defaultOptions(){return{containerID:"img_popup",fadeDuration:600,imageFadeDuration:600,positionFromTop:50,resizeDuration:700}}get containerID(){return this.options.containerID}init(){document.querySelector("body").insertAdjacentHTML("beforeend",this.overlayHTML),document.querySelector("body").insertAdjacentHTML("beforeend",this.containerHTML),this.popup=document.querySelector("#"+this.containerID),this.overlay=document.querySelector("#"+this.containerID+"-overlay"),this.outerContainer=this.popup.querySelector(".img_popup-outer_container"),this.container=this.popup.querySelector(".img_popup-container"),this.image=this.popup.querySelector("img.img_popup-image"),this.containerPadding={top:parseInt(this.computedStyle(this.container,"padding-top"),10),right:parseInt(this.computedStyle(this.container,"padding-right"),10),bottom:parseInt(this.computedStyle(this.container,"padding-bottom"),10),left:parseInt(this.computedStyle(this.container,"padding-left"),10)},this.imageBorderWidth={top:parseInt(this.computedStyle(this.image,"border-top-width"),10),right:parseInt(this.computedStyle(this.image,"border-right-width"),10),bottom:parseInt(this.computedStyle(this.image,"border-bottom-width"),10),left:parseInt(this.computedStyle(this.image,"border-left-width"),10)},this.overlay.style.display="none",this.overlay.addEventListener("click",t=>{t.preventDefault(),this.end()}),this.popup.style.display="none",this.popup.addEventListener("click",t=>{t.preventDefault(),t.target.getAttribute("id")==this.containerID&&this.end()}),this.outerContainer.addEventListener("click",t=>{t.preventDefault(),t.target.getAttribute("id")==this.containerID&&this.end()}),this.popup.querySelector(".img_popup-image_link").addEventListener("click",t=>{t.preventDefault(),window.open(t.currentTarget.getAttribute("href"),"_blank")}),Array.prototype.forEach.call(this.popup.querySelectorAll(".img_popup-loader, .img_popup-cancel, .img_popup-close"),t=>{t.addEventListener("click",t=>{t.preventDefault(),this.end()})})}get overlayHTML(){return'<div id="'+this.containerID+'-overlay" class="img_popup-overlay"></div>'}get containerHTML(){return'\n    <div id="'+this.containerID+'" class="img_popup">\n      <div class="img_popup-outer_container">\n        <div class="img_popup-container">\n          <a class="img_popup-image_link" href="" target="_blank">\n            <img class="img_popup-image" src="" />\n          </a>\n          <div class="img_popup-loader">\n            <a class="img_popup-cancel"></a>\n          </div>\n        </div>\n        <div class="img_popup-data_container">\n          <div class="img_popup-data">\n            <div class="img_popup-details">\n              <span class="img_popup-caption"></span>\n            </div>\n            <div class="img_popup-close_container">\n              <a class="img_popup-close"></a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>'}run(t){0!=t.length&&Array.prototype.forEach.call(t,t=>{var e=void 0,i=void 0,o=t.tagName;if("A"==o)e=t.getAttribute("data-image"),i=t.getAttribute("href");else{if("IMG"!=o)return;e=t.getAttribute("src"),i=t.getAttribute("src")}if(void 0!==e&&null!=e&&e.match(/\.(gif|jpe?g|png|bmp|gif\?\d+|jpe?g\?\d+|png\?\d+|bmp\?\d+)$/i)){var n=void 0;"A"==o?n=t.querySelector("img").getAttribute("alt"):"IMG"==o&&(n=t.getAttribute("alt")),n=n||t.getAttribute("title")||"",t.addEventListener("click",t=>{t.preventDefault(),this.start(e,i,n)})}})}start(t,e,o){var n=this.popup.querySelector("img.img_popup-image");window.addEventListener("resize",this.sizeOverlay),this.sizeOverlay();var r=document.documentElement.scrollTop||document.body.scrollTop,p=document.documentElement.scrollLeft||document.body.scrollLeft;this.popup.style.top=r+this.options.positionFromTop+"px",this.popup.style.left=p+"px",i(this.popup,this.options.fadeDuration,{}),i(this.overlay,this.options.fadeDuration,{beginFunc:()=>{this.overlay.style.display="block"}}),i(this.popup.querySelector(".img_popup-loader"),600,{}),Array.prototype.forEach.call(this.popup.querySelectorAll(".img_popup-data_container, .img_popup-caption"),t=>{t.style.display="none"}),n.style.display="none",this.outerContainer.classList.add("img_popup-animating");var a=new Image;a.onload=()=>{var t=window.innerWidth,e=window.innerHeight,i=t-this.containerPadding.left-this.containerPadding.right-this.imageBorderWidth.left-this.imageBorderWidth.right-20,o=e-this.containerPadding.top-this.containerPadding.bottom-this.imageBorderWidth.top-this.imageBorderWidth.bottom-120;if(n.setAttribute("src",a.src),n.style.width=a.width+"px",n.style.height=a.height+"px",a.width>i||a.height>o)if(a.width/i>a.height/o){var r=i,p=parseInt(a.height/(a.width/r),10);n.style.width=r+"px",n.style.height=p+"px"}else{var s=o,d=parseInt(a.width/(a.height/s),10);n.style.width=d+"px",n.style.height=s+"px"}this.sizeContainer(n)},this.currentImage.url=e,this.currentImage.title=o,a.src=t}sizeOverlay(){this.overlay.style.width=document.body.clientWidth+"px",this.overlay.style.height=document.body.clientHeight+"px"}sizeContainer(t){var i=this.outerContainer.offsetWidth,o=this.outerContainer.offsetHeight,n=parseInt(this.computedStyle(t,"width"),10)+this.containerPadding.left+this.containerPadding.right+this.imageBorderWidth.left+this.imageBorderWidth.right,r=parseInt(this.computedStyle(t,"height"),10)+this.containerPadding.top+this.containerPadding.bottom+this.imageBorderWidth.top+this.imageBorderWidth.bottom;t.style.width=n+"px",t.style.height=r+"px",i!==n||o!==r?e.default({targets:this.outerContainer,width:n,height:r,duration:this.options.resizeDuration,easing:"easeOutSine",complete:t=>{this.postResize(n)}}):this.postResize(n)}postResize(t){this.popup.querySelector(".img_popup-data_container").style.width=t+"px",this.showImage(),this.updateLink(),this.updateDetails()}showImage(){var t=this.popup.querySelector(".img_popup-loader");e.default.remove(t),t.style.display="none",i(this.popup.querySelector(".img_popup-image"),this.options.imageFadeDuration,{})}updateLink(){this.popup.querySelector(".img_popup-image_link").setAttribute("href",this.currentImage.url)}updateDetails(){var t=this.popup.querySelector(".img_popup-caption");t.innerHTML=this.currentImage.title,i(t,200,{}),this.outerContainer.classList.remove("img_popup-animating"),i(this.popup.querySelector(".img_popup-data_container"),this.options.resizeDuration,{completeFunc:()=>{this.sizeOverlay()}})}end(){window.removeEventListener("resize",this.sizeOverlay),o(this.popup,this.options.fadeDuration,{}),o(this.overlay,this.options.fadeDuration,{})}computedStyle(t,e){return document.defaultView.getComputedStyle(t).getPropertyValue(e)}};
//# sourceMappingURL=index.js.map
