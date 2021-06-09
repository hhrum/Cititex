require('@splidejs/splide');

document.addEventListener('DOMContentLoaded', function () {
  new Splide('#main-slider', {
    arrows: false,
    classes: {
      pagination: 'splide__pagination splide__my-custom-pagination', // container
      page      : 'splide__pagination__page splide__my-custom-page', // each button
    }
  }).mount();
});