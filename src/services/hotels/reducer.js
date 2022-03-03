const initialState = {
    hotels: []
  };
  
export default function fetchHotels(state = initialState, action) {

    switch (action.type) {
        case "FETCH_HOTELS":
            return {
                hotels:action.payload,
                isLoading : false
            };
        case "FETCH_IS_LOADING":
            return {
                ...state,
                isLoading : true
            };
        default:
            return state;
    }
};

export function fetchHotelDetail(state = initialState, action) {

    switch (action.type) {
        case "FETCH_HOTEL_DETAIL":
            return {
                hotel_detail:action.payload,
                isLoading : false
            };  
        default:
            return state;
    }
};