/* eslint-disable*/

import axios from 'axios';
import { showAlert } from './alert';

export const bookSlot = async (obj, docID) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:80/api/v1/doctor/${docID}/bookings`,
      data: obj
    });
    if (res.data.status === 'success') {
      console.log('Booking Confirmed');

      window.setTimeout(() => {
        location.assign(`../${docID}/payment-page`);
      }, 1000);
    } else if (res.data.status === 'fail') {
      showAlert('error', res.data.message);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};
