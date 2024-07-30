import anime from 'animejs/lib/anime.es.js';
import { fadeIn, fadeOut } from '@masatomiyoshi/fade';
import './index.scss';

export default class ImgPopup {
  constructor(options) {
    this.currentImage = { url: '', title: '' };
    this.options = Object.assign(this.defaultOptions, options);
  }

  get defaultOptions() {
    return { containerID: 'img_popup',
             fadeDuration: 600,
             imageFadeDuration: 600,
             positionFromTop: 50,
             resizeDuration: 700 };
  }

  get containerID() {
    return this.options.containerID;
  }

  init() {
    document.querySelector('body').insertAdjacentHTML('beforeend', this.overlayHTML);
    document.querySelector('body').insertAdjacentHTML('beforeend', this.containerHTML);

    this.popup = document.querySelector(`#${this.containerID}`);
    this.overlay = document.querySelector(`#${this.containerID}-overlay`);
    this.outerContainer = this.popup.querySelector('.img_popup-outer_container');
    this.container = this.popup.querySelector('.img_popup-container');
    this.image = this.popup.querySelector('img.img_popup-image');

    this.containerPadding = {
      top: parseInt(this.computedStyle(this.container, 'padding-top'), 10),
      right: parseInt(this.computedStyle(this.container, 'padding-right'), 10),
      bottom: parseInt(this.computedStyle(this.container, 'padding-bottom'), 10),
      left: parseInt(this.computedStyle(this.container, 'padding-left'), 10)
    };

    this.imageBorderWidth = {
      top: parseInt(this.computedStyle(this.image, 'border-top-width'), 10),
      right: parseInt(this.computedStyle(this.image, 'border-right-width'), 10),
      bottom: parseInt(this.computedStyle(this.image, 'border-bottom-width'), 10),
      left: parseInt(this.computedStyle(this.image, 'border-left-width'), 10)
    };

    this.overlay.addEventListener('click', (e) => {
      e.preventDefault();
      this.end();
    });

    this.popup.style.display = 'none';
    this.popup.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.getAttribute('id') == this.containerID) this.end();
    });

    this.outerContainer.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.getAttribute('id') == this.containerID) this.end();
    });

    this.popup.querySelector('.img_popup-image_link')
              .addEventListener('click', (e) => {
      e.preventDefault();
      window.open(e.currentTarget.getAttribute('href'), '_blank');
    });

    Array.prototype.forEach.call(
      this.popup.querySelectorAll('.img_popup-loader, .img_popup-cancel, .img_popup-close'),
      (selector) => {
        selector.addEventListener('click', (e) => {
          e.preventDefault();
          this.end();
        });
      }
    );
  }

  get overlayHTML() {
    return `<div id="${this.containerID}-overlay" class="img_popup-overlay"></div>`;
  }

  get containerHTML() {
    return `
    <div id="${this.containerID}" class="img_popup">
      <div class="img_popup-outer_container">
        <div class="img_popup-container">
          <a class="img_popup-image_link" href="" target="_blank">
            <img class="img_popup-image" src="" />
          </a>
          <div class="img_popup-loader">
            <a class="img_popup-cancel"></a>
          </div>
        </div>
        <div class="img_popup-data_container">
          <div class="img_popup-data">
            <div class="img_popup-details">
              <span class="img_popup-caption"></span>
            </div>
            <div class="img_popup-close_container">
              <a class="img_popup-close"></a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  run(elems) {
    if (elems.length == 0) return;

    Array.prototype.forEach.call(elems, (elem) => {
      let imageUrl = undefined;
      let linkUrl = undefined;
      let tagName = elem.tagName;
      if (tagName == 'A') {
        imageUrl = elem.getAttribute('data-image');
        linkUrl = elem.getAttribute('href');
      } else if (tagName == 'IMG') {
        imageUrl = elem.getAttribute('src');
        linkUrl = elem.getAttribute('src');
      } else {
        return;
      }

      if (imageUrl === undefined || imageUrl == null) return;

      let url = undefined;
      try {
        url = new URL(imageUrl, window.location);
      } catch(e) {}
      if (url && url.pathname.match(/\.(gif|jpe?g|png|bmp|webp)$/i)) {
        let title = undefined;
        if (tagName == 'A') {
          title = elem.querySelector('img').getAttribute('alt');
        } else if (tagName == 'IMG') {
          title = elem.getAttribute('alt');
        }
        title = (title || elem.getAttribute('title') || '');

        elem.addEventListener('click', (e) => {
          e.preventDefault();
          this.start(imageUrl, linkUrl, title);
        });
      }
    });
  }

  start(imageUrl, linkUrl, title) {
    let image = this.popup.querySelector('img.img_popup-image');

    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let top = scrollTop + this.options.positionFromTop;
    let left = document.documentElement.scrollLeft || document.body.scrollLeft;

    this.popup.style.top = top + 'px';
    this.popup.style.left = left + 'px';
    fadeIn(this.popup, { duration: this.options.fadeDuration });

    fadeIn(this.overlay,
      { duration: this.options.fadeDuration,
        beginFunc: () => { this.showOverlay(); } });

    fadeIn(this.popup.querySelector('.img_popup-loader'), { duration: 600 });
    Array.prototype.forEach.call(
      this.popup.querySelectorAll('.img_popup-data_container, .img_popup-caption'),
      (selector) => { selector.style.display = 'none'; }
    );
    image.style.display = 'none';

    this.outerContainer.classList.add('img_popup-animating');

    let preloader = new Image();
    preloader.onload = () => {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      let maxImageWidth = windowWidth -
                          this.containerPadding.left -
                          this.containerPadding.right -
                          this.imageBorderWidth.left -
                          this.imageBorderWidth.right -
                          20;
      let maxImageHeight = windowHeight -
                           this.containerPadding.top -
                           this.containerPadding.bottom -
                           this.imageBorderWidth.top -
                           this.imageBorderWidth.bottom -
                           120;

      image.setAttribute('src', preloader.src);
      image.style.width = preloader.width + 'px';
      image.style.height = preloader.height + 'px';

      if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
        if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
          let imageWidth = maxImageWidth;
          let imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
          image.style.width = imageWidth + 'px';
          image.style.height = imageHeight + 'px';
        } else {
          let imageHeight = maxImageHeight;
          let imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
          image.style.width = imageWidth + 'px';
          image.style.height = imageHeight + 'px';
        }
      }

      this.sizeContainer(image);
    };

    this.currentImage.url = linkUrl;
    this.currentImage.title = title;

    preloader.src = imageUrl;
  }

  sizeContainer(image) {
    let oldWidth = this.outerContainer.offsetWidth;
    let oldHeight = this.outerContainer.offsetHeight;
    let newWidth = parseInt(this.computedStyle(image, 'width'), 10) +
                   this.containerPadding.left +
                   this.containerPadding.right +
                   this.imageBorderWidth.left +
                   this.imageBorderWidth.right;
    let newHeight = parseInt(this.computedStyle(image, 'height'), 10) +
                    this.containerPadding.top +
                    this.containerPadding.bottom +
                    this.imageBorderWidth.top +
                    this.imageBorderWidth.bottom;

    image.style.width = newWidth + 'px';
    image.style.height = newHeight + 'px';

    if (oldWidth !== newWidth || oldHeight !== newHeight) {
      anime({
        targets: this.outerContainer,
        width: newWidth,
        height: newHeight,
        duration: this.options.resizeDuration,
        easing: 'easeOutSine',
        complete: (a) => {
          this.postResize(newWidth);
        }
      });
    } else {
      this.postResize(newWidth);
    }
  }

  postResize(newWidth){
    let popupDataContainer = this.popup.querySelector('.img_popup-data_container');
    popupDataContainer.style.width = newWidth + 'px';
    this.showImage();
    this.updateLink();
    this.updateDetails();
  }

  showImage() {
    let popupLoader = this.popup.querySelector('.img_popup-loader');
    anime.remove(popupLoader);
    popupLoader.style.display = 'none';
    fadeIn(this.popup.querySelector('.img_popup-image'),
      { duration: this.options.imageFadeDuration });
  }

  showOverlay() {
    this.overlay.style.display = 'block';
  }

  updateLink() {
    let link = this.popup.querySelector('.img_popup-image_link');
    link.setAttribute('href', this.currentImage.url);
  }

  updateDetails() {
    let caption = this.popup.querySelector('.img_popup-caption');

    caption.innerHTML = this.currentImage.title;
    fadeIn(caption, { duration: 200 });
    this.outerContainer.classList.remove('img_popup-animating');
    fadeIn(this.popup.querySelector('.img_popup-data_container'),
      { duration: this.options.resizeDuration,
        completeFunc: () => { this.showOverlay(); } });
  }

  end() {
    window.removeEventListener('resize', this.sizeOverlay);
    fadeOut(this.popup, { duration: this.options.fadeDuration });
    fadeOut(this.overlay, { duration: this.options.fadeDuration });
  }

  computedStyle(element, property) {
    return document.defaultView.getComputedStyle(element).getPropertyValue(property);
  }
}
