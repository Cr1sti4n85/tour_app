import { showAlert } from './alerts.js';

const stripe = Stripe(
  'pk_test_51O3TxHIkjI9eOA45hfqQxUuULNbJBHWvaNULoIwe7ua0aqPnJo7sLDrFn1MZbeBuLpHG0OTl4LrlHMNJhmp2P26a00jb2RcQIk'
);

const bookTour = async (tourId) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(response.data.session.url);
    location.href = response.data.session.url;
  } catch (error) {
    showAlert('error', error);
  }
};

const bookBtn = document.getElementById('book-tour');

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
