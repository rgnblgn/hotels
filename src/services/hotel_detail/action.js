import axios from 'axios';

export const fetchHotelDetails = () => dispatch => {
    return axios
      .get("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details")
      .then(res => {
        let results  = res.data;
  
        return dispatch({
          type: "FETCH_HOTEL_DETAIL",
          payload: results
        });
      })
      .catch(err => {
        console.log('Could not fetch hotels. Try again later.');
      });
  };