import axios from 'axios';

export const postPayment = (payment) => dispatch => {
  return axios
    .post("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/",payment)
    .then(res => {
      let results  = res.data;

      return dispatch({
        type: "POST_PAYMENT",
        payload: results
      });
    })
    .catch(err => {
      console.log('Could not fetch hotels. Try again later.');
    });
};

export const deletePayment = (id) => dispatch => {
  return axios
    .delete("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/"+id)
    .then(res => {
      let results  = res.data;

      return dispatch({
        type: "DELETE_PAYMENT",
        payload: results
      });
    })
    .catch(err => {
      console.log('Could not fetch hotels. Try again later.');
    });
};


