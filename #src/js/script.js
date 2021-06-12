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

window.addEventListener('scroll', function (e) {
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
    spaceBetween: 32,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      // width >= 320px
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      500: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      // width is >= 640px
      800: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1100: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1500: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      }
    },
  });

  const productSwiperSlim = new Swiper('.product-swiper--slim', {
    direction: 'horizontal',
    speed: 1000,
    spaceBetween: 32,
    slidesPerView: 3,
    slidesPerGroup: 3,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      // width >= 320px
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      500: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1100: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
  });
}
