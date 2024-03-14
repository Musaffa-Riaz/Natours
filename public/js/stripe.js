// /* eslint-disable */
// const stripe = Stripe('pk_test_51OtXnlFhRQH53ZQC8vndBQmz0VRnctAUSXzR8NAdmyrNV7u77SVoP6W88UgmeXu7Y6kP3r9njaVQBh5VEGXRGie8001HT6ry8o');
// import axios from 'axios';
// import { showAlert } from './alerts';

// export const bookTour = async tourId => {
//   try {
//     // 1) Get checkout session from API
//     const session = await axios(
//       `http://127.0.0.1:3000/api/v1/booking/checkout-session/${tourId}`
//     );
//     console.log(session);

//     // 2) Create checkout form + chanre credit card
//     await stripe.redirectToCheckout({
//       sessionId: session.data.session.id
//     });
//   } catch (err) { 
//     console.log(err); 
//     showAlert('error', err);
//   }
// };