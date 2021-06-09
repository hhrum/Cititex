require('@splidejs/splide');
const products = require('./data/products');
const {productMaker} = require('./utilities/makers');

document.addEventListener('DOMContentLoaded', function () {
  new Splide('#main-slider', {
    arrows: false,
    classes: {
      pagination: 'splide__pagination splide__my-custom-pagination', // container
      page: 'splide__pagination__page splide__my-custom-page', // each button
    }
  }).mount();

  new Splide('#new-items-slider', {
    width: "calc(100vw - 34px)",
    cover: true,
    arrows: false,
    classes: {
      pagination: 'splide__pagination splide__my-custom-pagination', // container
      page: 'splide__pagination__page splide__my-custom-page', // each button
    }
  }).mount();
});

function showProductsAtSlider(products, slider) {
  const productsForShow = [...products];
  const list = slider.getElementsByClassName('splide__list')[0];
  list.innerHTML = "";
  const productAtPageCount = Math.floor(window.screen.width / 320);
  const pages = [];

  while (productsForShow.length > 0 && pages.length < 5) {
    pages.push(productsForShow.splice(0, productAtPageCount));
  }

  pages.forEach(page => {
    const li = document.createElement('li');
    li.className = 'splide__slide';

    page.forEach(product => li.appendChild(productMaker(product)));

    list.appendChild(li);
  })

}