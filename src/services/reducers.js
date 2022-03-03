import { combineReducers } from 'redux';
import hotelsReducer from './hotels/reducer';
import hotelDetailReducer from './hotel_detail/reducer'

export default combineReducers({
    hotelsReducer,
    hotelDetailReducer
});