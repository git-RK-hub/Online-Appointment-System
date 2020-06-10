/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
const slotObj = {
  daySlots: [
    {
      slotOfDay: 'Morning',
      timeSlots: [
        '10:20 AM',
        '10:40 AM',
        '11:00 AM',
        '11:20 AM',
        '11:40 AM',
        '12:00 PM'
      ]
    },
    {
      slotOfDay: 'Afternoon',
      timeSlots: [
        '01:40 PM',
        '02:00 PM',
        '02:20 PM',
        '02:40 PM',
        '03:00 PM',
        '03:20 PM',
        '03:40 PM',
        '04:00 PM',
        '04:20 PM',
        '04:40 PM',
        '05:00 PM'
      ]
    },
    {
      slotOfDay: 'Evening',
      timeSlots: [
        '06:00 PM',
        '06:20 PM',
        '06:40 PM',
        '07:00 PM',
        '07:20 PM',
        '07:40 PM',
        '08:00 PM',
        '08:20 PM',
        '08:40 PM',
        '09:00 PM'
      ]
    }
  ]
};
export const signIn = async (obj, type) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:80/api/v1/${type}/signup`,
      data: obj
    });
    if (type === 'doctor') {
      const makeSlot = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:80/api/v1/slots',
        data: slotObj
      });
    }
    if (res.data.status === 'success') {
      showAlert('success', 'Signup success');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const login = async (obj, type) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:80/api/v1/${type}/login`,
      data: obj
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Login Succesful');
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url:
        'http://127.0.0.1:80/api/v1/doctor/logout' ||
        'http://127.0.0.1:80/api/v1/patient/logout'
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response);
  }
};
