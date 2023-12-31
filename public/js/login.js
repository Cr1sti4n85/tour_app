import axios from 'axios';
import { showAlert } from './alerts.js';
// const loginForm = document.querySelector('.form--login');
// const logoutBtn = document.querySelector('.nav__el--logout');

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'You have been succesfully logged in');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
      showAlert('success', 'You are logging out...');
      window.setTimeout(() => {
        location.reload(true);
      }, 3000);
    }
  } catch (error) {
    showAlert('error', 'Error logging out! Try Again.');
    console.error(error);
  }
};
