import ImgPopup from 'index';

describe('index', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <ul>
          <li>
            <a href="/examples/images/sample.bmp" data-image="/examples/images/sample.bmp">
              <img src="/examples/images/sample.bmp" alt="BMPリンク">
            </a>
          </li>
          <li>
            <a href="/examples/images/sample.jpg" title="JPEGリンク" data-image="/examples/images/sample.jpg">
              <img src="/examples/images/sample.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="/examples/images/sample.gif" title="GIFリンク" data-image="/examples/images/sample.gif">
              <img src="/examples/images/sample.gif">
            </a>
          </li>
          <li>
            <a href="/examples/images/sample.png" data-image="/examples/images/sample.png">
              <img src="/examples/images/sample.png" alt="PNGリンク">
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <img src="/examples/images/sample.bmp" alt="BMP画像">
          </li>
          <li>
            <img src="/examples/images/sample.jpg" title="JPEG画像" alt="">
          </li>
          <li>
            <img src="/examples/images/sample.gif" title="GIF画像">
          </li>
          <li>
            <img src="/examples/images/sample.png" alt="PNG画像">
          </li>
        </ul>
      </div>
    `;
  });

  it('pop-ups anchor images', () => {
    let imgPopup = new ImgPopup();
    let elems = document.querySelectorAll('ul li > a');
    imgPopup.run(elems);
  });

  it('pop-ups inline images', () => {
    let imgPopup = new ImgPopup();
    let elems = document.querySelectorAll('ul li > img');
    imgPopup.run(elems);
  });
});
