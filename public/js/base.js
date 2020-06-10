/* eslint-disable */
export const elements = {
  selected: document.querySelector('.selected'),
  optionsContainer: document.querySelector('.options-container'),
  searchBox: document.querySelector('.search-box input'),
  optionList: document.querySelectorAll('.option'),
  logoutBtn: document.getElementById('logout'),
  newsPanel: document.querySelector('.news-panel'),
  newsCards: document.querySelectorAll('.news-card'),
  signupCard: document.querySelector('.signup-card'),
  signinBtn: document.getElementById('signin-btn'),
  loginForm: document.getElementById('login'),
  loginBtn: document.getElementById('login-btn'),
  radioSelBtn: document.getElementsByName('selector'),
  closeBtn: document.querySelector('.fa-times'),
  selectDay: document.querySelectorAll('.select-day-slot'),
  pickSlot: document.querySelectorAll('.pick-slot'),
  bookSlotBtn: document.querySelector('.book-slot-btn'),
  bookings: document.querySelector('.bookings'),
  forgotPassword: document.querySelector('.forgot-password')
};

export const renderLoader = (parent) => {
  const markup = `
            <div class="spinner-grow text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
  `;
  parent.insertAdjacentHTML('afterbegin', markup);
};

export const clearLoader = () => {
  const loader = document.querySelector('.spinner-grow');
  if (loader) loader.parentNode.removeChild(loader);
};

export const removeFormHtml = () => {
  elements.signupCard.style.removeProperty('background-image');
  document.querySelector('.addTwoMore').style.display = 'none';
};

export const addFormHtml = () => {
  elements.signupCard.style.backgroundImage = `url('/img/signup-card-bg-d.jpg')`;
  document.querySelector('.addTwoMore').style.display = 'block';
};
