import axios from 'axios';
import { showAlert } from './alert';

export const forgotPassword = async (email, type) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:80/api/v1/${type}/forgotPassword`,
      data: {
        email
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Email Sent');
    }
  } catch (err) {
    showAlert('error', `Error in sending mail : ${err.response.data.message}`);
  }
};
