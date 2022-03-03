const initialState = {
    hotels: []
  };
  
export default function payments(state = initialState, action) {

    switch (action.type) {
        case "POST_PAYMENT":
            return {
                bookings:action.payload,
                isLoading : false
            };
        case "DELETE_PAYMENT":
            return {
                bookings:action.payload,
                isLoading : true
            };
        case "GET_BOOKINGS":
            return {
                bookings:action.payload,
                isLoading : true
            };    
        default:
            return state;
    }
};
