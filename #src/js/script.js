require('@splidejs/splide');
const {openModal, closeModal} = require('./modules/modals');
const AOS = require('aos');

[...document.getElementsByClassName('button-login')].forEach(item => item.onclick = () => openModal('modal-login'));
[...document.getElementsByClassName('button-signup')].forEach(item => item.onclick = () => openModal('modal-signup'));
[...document.getElementsByClassName('button-contact')].forEach(item => item.onclick = () => openModal('modal-contact'));
const modalCloser = document.getElementById('modal-bg');

if (modalCloser) {
  modalCloser.onclick = closeModal;
}

let last_scroll = 0;
let headerHidden = false;
const header = document.getElementById('header');

let searchShow = false;
const mobileHeader = document.getElementById('header-mobile');
const searchWrapper = document.getElementsByClassName('header-search-wrapper');
const searchOpener = document.getElementsByClassName('header-search-opener');
const searchInput = document.getElementsByClassName('header-search-input');
const searchCloser = document.getElementsByClassName('header-search-closer');

let dropDownMenuIsActive = false;
const dropDownMenuToggle = document.getElementById('drop-down-menu-toggle');
const dropDownMenu = document.getElementById('drop-down-menu');

// search
if (searchOpener.length > 0) {
  [...searchOpener].forEach(el => {
    el.onclick = () => {
      searchShow = true;
      searchToggle(el.dataset.wrapper);
      document.getElementById(el.dataset.focus).focus();
    }
  });
}

if (searchInput.length > 0) {
  [...searchInput].forEach(el => {
    el.onblur = () => {
      if (el.value.trim() !== '')
        return;

      searchShow = false;
      el.value = '';
      searchToggle();
    }
  })
}

if (searchCloser.length > 0) {
  [...searchCloser].forEach(el => {
    el
      .onclick = () => {
      searchShow = false;

      [...searchInput].forEach(el => {
        el.value = '';
      })

      searchToggle();
    }
  })
}

dropDownMenuToggle.onclick = () => {
  dropDownMenuIsActive = !dropDownMenuIsActive;
  toggleDropDownMenu();
}

function toggleHeaderHidden() {
  header.classList.toggle('hide', headerHidden);
}

function searchToggle(wrapper) {

  if (!searchShow) {
    [...searchWrapper].forEach(el => {
      el.classList.toggle('is-active', searchShow) // show-search
    })

    return null;
  }

  const _searchWrapper = document.getElementById(wrapper);
  if (_searchWrapper) {
    _searchWrapper.classList.toggle('is-active', searchShow)
  }
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
    // offset: -500,
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
    slidesPerView: 1,
    slidesPerGroup: 1,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    breakpoints: {
      540: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      720: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      960: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1200: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      }
    },
  });

  const productSwiperSlim = new Swiper('.product-swiper--slim', {
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
      1100: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
  });
}
