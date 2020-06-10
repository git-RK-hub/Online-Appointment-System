/* eslint-disable*/

import '@babel/polyfill';
import GetNews from './apiRequest';
import { carousel, filterList } from './homePage';
import { elements, renderLoader, addFormHtml, removeFormHtml } from './base';
import { signIn, login, logout } from './authentication';
import { bookSlot } from './bookingSlots';
import { forgotPassword, resetPassword } from './forgotAndResetPassword';
const state = {};
carousel();

if (elements.selectDay) {
  const today = document.querySelector('.today');
  const tomorrow = document.querySelector('.tomorrow');
  const nextDay = document.querySelector('.nextday');

  if (today) {
    today.addEventListener('click', () => {
      today.classList.add('active');
      tomorrow.classList.remove('active');
      nextDay.classList.remove('active');
      if (elements.pickSlot) {
        elements.pickSlot.forEach((l) => {
          l.classList.remove('focus-slot');
        });
      }
    });
  }
  if (tomorrow) {
    tomorrow.addEventListener('click', () => {
      today.classList.remove('active');
      tomorrow.classList.add('active');
      nextDay.classList.remove('active');
      if (elements.pickSlot)
        elements.pickSlot.forEach((l) => {
          l.classList.remove('disabled-slot');
          l.classList.remove('focus-slot');
        });
    });
  }
  if (nextDay) {
    nextDay.addEventListener('click', () => {
      today.classList.remove('active');
      tomorrow.classList.remove('active');
      nextDay.classList.add('active');
      if (elements.pickSlot)
        elements.pickSlot.forEach((l) => {
          l.classList.remove('disabled-slot');
          l.classList.remove('focus-slot');
        });
    });
  }
}

if (elements.pickSlot) {
  elements.pickSlot.forEach((e) => {
    e.addEventListener('click', (e) => {
      elements.pickSlot.forEach((l) => l.classList.remove('focus-slot'));
      e.target.classList.add('focus-slot');
    });
  });
}

function findBookingDay() {
  const today = document.querySelector('.today');
  const tomorrow = document.querySelector('.tomorrow');
  const nextDay = document.querySelector('.nextday');
  let bookingDay;
  if (today.classList[1] === 'active') {
    bookingDay = `${new Date(Date.now()).toLocaleString('en-us', {
      weekday: 'long'
    })}`;
  } else if (tomorrow.classList[1] === 'active') {
    bookingDay = `${new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toLocaleString('en-us', { weekday: 'long' })}`;
  } else if (nextDay.classList[1] === 'active') {
    bookingDay = `${new Date(
      Date.now() + 48 * 60 * 60 * 1000
    ).toLocaleString('en-us', { weekday: 'long' })}`;
  }
  return bookingDay;
}

if (elements.bookSlotBtn) {
  for (let i = 0; i < elements.pickSlot.length; i++) {
    elements.pickSlot[i].addEventListener('click', function (e) {
      const slotItem = {
        bookingDay: findBookingDay(),
        bookingSlot: e.target.innerHTML,
        slotOfDay: e.target.id.split('-')[1]
      };
      elements.bookSlotBtn.addEventListener('click', () => {
        console.log(slotItem);
        bookSlot(slotItem, event.target.id);
      });
    });
  }
}

if (elements.optionList.length !== 0) {
  elements.optionList.forEach((e) => {
    e.addEventListener('click', () => {
      elements.selected.innerHTML = e.querySelector('label').innerHTML;
      elements.optionsContainer.classList.remove('active');
    });
  });
}

if (elements.logoutBtn) {
  elements.logoutBtn.addEventListener('click', logout);
}

if (elements.searchBox) {
  elements.searchBox.addEventListener('keyup', function (el) {
    filterList(el.target.value, elements.optionList);
  });
}

if (elements.selected) {
  elements.selected.addEventListener('click', () => {
    elements.optionsContainer.classList.toggle('active');
    elements.searchBox.value = '';
    filterList('', elements.optionList);
    if (elements.optionsContainer.classList.contains('active')) {
      elements.searchBox.focus();
    }
  });
}

if (elements.radioSelBtn.length !== 0) {
  elements.radioSelBtn[1].addEventListener('click', () => {
    removeFormHtml();
    addFormHtml();
  });
  elements.radioSelBtn[0].addEventListener('click', () => {
    removeFormHtml();
  });
}

if (elements.signinBtn) {
  elements.signinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const name =
      `${firstName} ${lastName}` !== ' '
        ? `${firstName} ${lastName}`
        : undefined;
    if (elements.radioSelBtn[1].checked) {
      let qualifications = document.getElementById('qualifications').value;
      let category = document.getElementById('category').value;
      qualifications =
        qualifications !== 'Qualifications' ? qualifications : undefined;
      category = category !== 'Category' ? category : undefined;
      const formObj = {
        name,
        email,
        contact,
        address,
        password,
        confirmPassword,
        qualifications,
        category
      };
      signIn(formObj, 'doctor');
    } else {
      const formObj = {
        name,
        email,
        contact,
        address,
        password,
        confirmPassword
      };
      signIn(formObj, 'patient');
    }
  });
}

if (elements.loginBtn) {
  elements.loginBtn.addEventListener('click', () => {
    let type;
    const dataObj = {
      email: document.getElementById('log-email').value,
      password: document.getElementById('log-password').value
    };
    const loginAs = document.getElementsByName('log-selector');
    if (loginAs[0].checked) {
      type = 'patient';
    } else {
      type = 'doctor';
    }
    login(dataObj, type);
  });
}

if (elements.loginForm) {
  elements.loginForm.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.login-container').style.display = 'block';
  });
}

if (elements.closeBtn) {
  elements.closeBtn.addEventListener('click', () => {
    document.querySelector('.login-container').style.display = 'none';
  });
}

if (elements.forgotPassword) {
  elements.forgotPassword.addEventListener('click', () => {
    const loginAs = document.getElementsByName('log-selector');
    let type;
    if (loginAs[0].checked) {
      type = 'patient';
    } else {
      type = 'doctor';
    }
    const email = prompt('Enter your email: ');
    if (email) {
      alert('Please Wait....');
    }
    forgotPassword(email, type);
  });
}

(async () => {
  if (elements.newsPanel) {
    renderLoader(elements.newsPanel);
    try {
      let newsObj;
      state.newsObj = new GetNews();
      await state.newsObj.getInfo();
    } catch (err) {
      console.log(err);
    }
    if (elements.newsCards && state.newsObj.title) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let r = Math.floor(Math.random() * state.newsObj.title.length) + 1;
          if (r < 0 || r > state.newsObj.title.length) r = 0;
          elements.newsCards[j].childNodes[
            i
          ].src = `${state.newsObj.imgUrl[r]}`;
          elements.newsCards[j].childNodes[
            i + 1
          ].innerHTML = `${state.newsObj.title[r]}`;
          elements.newsCards[j].childNodes[
            i + 2
          ].href = `${state.newsObj.url[r]}`;
        }
        break;
      }
    }
  }
})();
