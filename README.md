# ImgPopup

A javascript library used to pop-up images.

## Dependencies

- animejs
- @masatomiyoshi/fade

## Installation

Install from npm:

    $ npm install @masatomiyoshi/img-popup --save

## Usage

Import class:

```javascript
import ImgPopup from '@masatomiyoshi/img-popup'
```

Import css:
```css
@import '@masatomiyoshi/img-popup'
```

Build html as follows.
In case of \<a\> tags, image urls is set to data-image attributes.
In case of \<img\> tags, image urls is set to src attributes.
Image file extension must be gif, jpg, jpeg, png, bmp.

```html
<div>
  <ul>
    <li>
      <a href="/examples/images/sample.jpg" data-image="/examples/images/sample.jpg">
        <img src="/examples/images/sample.jpg" alt="JPEG image">
      </a>
    </li>
    <li>
      <img src="/examples/images/sample.jpg" alt="JPEG image">
    </li>
  </ul>
</div>
```

Build events to pop-up images:

```javascript
let imgPopup = new ImgPopup();
imgPopup.init();
let anchors = document.querySelectorAll('ul li a');
imgPopup.run(anchors);
let imgs = document.querySelectorAll('ul li img');
imgPopup.run(imgs);
```

## License

The library is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
