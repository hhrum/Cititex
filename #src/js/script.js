require('@splidejs/splide');
const AOS = require('aos');
const products = require('./data/products');
const { productMaker } = require('./utilities/makers');

let dropDownMenuIsActive = false;
const dropDownMenuToggle = document.getElementById('drop-down-menu-toggle');
const dropDownMenu = document.getElementById('drop-down-menu');

dropDownMenuToggle.onclick = () => {
  dropDownMenuIsActive = !dropDownMenuIsActive;

  dropDownMenu.classList.toggle('is-active');
  dropDownMenuToggle.classList.toggle('is-active');
}

document.addEventListener('DOMContentLoaded', function () {

  // Главный слайдер

  new Splide('#main-slider', {
    arrows: false,
    classes: {
      pagination: 'splide__pagination splide__my-custom-pagination', // container
      page: 'splide__pagination__page splide__my-custom-page', // each button
    }
  }).mount();


  // Новинки

  new Splide('#new-items-slider', {
    width: "calc(100vw - 34px)",
    cover: true,
    arrows: false,
    classes: {
      pagination: 'splide__pagination splide__my-custom-pagination', // container
      page: 'splide__pagination__page splide__my-custom-page', // each button
    }
  }).mount();


  // Распродажа

  new Splide('#sale-slider', {
    width: 1008,
    cover: true,
    arrows: false,
    classes: {
      pagination: 'splide__pagination splide__my-custom-pagination', // container
      page: 'splide__pagination__page splide__my-custom-page', // each button
    }
  }).mount();

  const saleImage = document.getElementById('sale-image');
  const saleContent = document.getElementById('sale-content');

  saleImage.style.height = saleContent.offsetHeight + 'px';
  // 56 отступы TODO: Поправил это говнище
  saleImage.style.width = window.screen.width - saleContent.offsetWidth - 56 + 'px';


  // Популярное

  new Splide('#popular-slider', {
    width: "calc(100vw - 34px)",
    cover: true,
    arrows: false,
    classes: {
      pagination: 'splide__pagination splide__my-custom-pagination', // container
      page: 'splide__pagination__page splide__my-custom-page', // each button
    }
  }).mount();

  AOS.init({
    // offset: 500,
    duration: 1000
  });
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