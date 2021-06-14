let modalIsOpen = false;
let currentModal = null;

function openModal(e) {
  if (currentModal) {
    currentModal.classList.toggle('is-active', false);
  }
  currentModal = document.getElementById(e);
  modalIsOpen = true;
  modalToggle();
}

function closeModal() {
  modalIsOpen = false;
  modalToggle();
  currentModal = null;
}

function modalToggle() {
  document.body.classList.toggle('modal-open', modalIsOpen);
  currentModal && currentModal.classList.toggle('is-active', modalIsOpen);
}

let last_scroll = 0;
window.addEventListener('scroll', function (e) {

  if (modalIsOpen) {
    window.scrollTo({
      top: last_scroll
    })
  }

  last_scroll = window.scrollY;
  return false;
});

module.exports.openModal = openModal;
module.exports.closeModal = closeModal;