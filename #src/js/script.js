require('@splidejs/splide');
const AOS = require('aos');

let dropDownMenuIsActive = false;
const dropDownMenuToggle = document.getElementById('drop-down-menu-toggle');
const dropDownMenu = document.getElementById('drop-down-menu');

dropDownMenuToggle.onclick = () => {
  dropDownMenuIsActive = !dropDownMenuIsActive;

  toggleDropDownMenu();
}

function toggleDropDownMenu() {
  dropDownMenu.classList.toggle('is-active', dropDownMenuIsActive);
  dropDownMenuToggle.classList.toggle('is-active', dropDownMenuIsActive);
}

window.addEventListener('scroll', function () {
  if (dropDownMenuIsActive) {
    dropDownMenuIsActive = false;
    toggleDropDownMenu();
  }
})

document.addEventListener('DOMContentLoaded', function () {

  AOS.init({
    offset: -500,
    duration: 1000
  });
  initSliders();
});

function initSliders() {
  //product-swiper product-swiper--slim  main-slider
  const mainSwiper = new Swiper('.main-slider', {
    direction: 'horizontal',
    speed: 1000,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  const productSwiper = new Swiper('.product-swiper--big', {
    direction: 'horizontal',
    speed: 1000,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      // width >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
        slidesPerGroup: 1,
      },
      // width is >= 640px
      660: {
        slidesPerView: 2,
        spaceBetween: 16,
        slidesPerGroup: 2,
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 32,
        slidesPerGroup: 3,
      },
      1300: {
        slidesPerView: 4,
        spaceBetween: 32,
        slidesPerGroup: 4,
      },
      1600: {
        slidesPerView: 5,
        spaceBetween: 32,
        slidesPerGroup: 5,
      }
    },
  });

  const productSwiperSlim = new Swiper('.product-swiper--slim', {
    direction: 'horizontal',
    speed: 1000,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      // width >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
        slidesPerGroup: 1,
      },
      // width is >= 640px
      660: {
        slidesPerView: 2,
        spaceBetween: 16,
        slidesPerGroup: 2,
      },
      // width is >= 640px
      960: {
        slidesPerView: 2,
        spaceBetween: 32,
        slidesPerGroup: 2,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 32,
        slidesPerGroup: 3,
      },
    },
  });
}
