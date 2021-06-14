require('@splidejs/splide');
const {openModal, closeModal} = require('./modules/modals');
const AOS = require('aos');

[...document.getElementsByClassName('button-login')].forEach(item => item.onclick = openModal);
document.getElementById('modal-bg').onclick = closeModal;

let last_scroll = 0;
let headerHidden = false;
const header = document.getElementById('header');

let mobileSearchShow = false;
const mobileHeader = document.getElementById('header-mobile');
const mobileSearchOpener = document.getElementById('mobile-search-opener');
const mobileSearchInput = document.getElementById('mobile-search-input');
const mobileSearchCloser = document.getElementById('mobile-search-closer');

let dropDownMenuIsActive = false;
const dropDownMenuToggle = document.getElementById('drop-down-menu-toggle');
const dropDownMenu = document.getElementById('drop-down-menu');


// search
mobileSearchOpener.onclick = () => {
  mobileSearchShow = true;
  mobileSearchToggle();
  mobileSearchInput.focus();
}

mobileSearchInput.onblur = () => {
  if (mobileSearchInput.value.trim() !== '')
    return;

  mobileSearchShow = false;
  mobileSearchInput.value = '';
  mobileSearchToggle();
}

mobileSearchCloser.onclick = () => {
  mobileSearchShow = false;
  mobileSearchInput.value = '';
  mobileSearchToggle();
}

dropDownMenuToggle.onclick = () => {
  dropDownMenuIsActive = !dropDownMenuIsActive;
  toggleDropDownMenu();
}

function toggleHeaderHidden() {
  header.classList.toggle('hide', headerHidden);
}

function mobileSearchToggle() {
   mobileHeader.classList.toggle('show-search', mobileSearchShow) // show-search
}

function toggleDropDownMenu() {
  dropDownMenu.classList.toggle('is-active', dropDownMenuIsActive);
  dropDownMenuToggle.classList.toggle('is-active', dropDownMenuIsActive);
}

window.addEventListener('scroll', function (e) {

  const current_scroll = window.scrollY;

  if ((last_scroll < current_scroll && !headerHidden) || (last_scroll > current_scroll && headerHidden)) {
    headerHidden = last_scroll < current_scroll;
    toggleHeaderHidden();
  }

  if (dropDownMenuIsActive) {
    dropDownMenuIsActive = false;
    toggleDropDownMenu();
  }

  last_scroll = window.scrollY;
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
      dynamicBullets: true,
    },
  });

  const productSwiper = new Swiper('.product-swiper--big', {
    direction: 'horizontal',
    speed: 1000,
    spaceBetween: 32,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
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
      dynamicBullets: true,
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
