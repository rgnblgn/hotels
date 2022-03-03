export default function fetchHotelDetail(state = [], action) {

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