// Root Reducer
import homeMovie from './modules/Home/reducers/movieReducers';
import { combineReducers } from 'redux';


// Sử dụng với Redux
// export default combineReducers({
//   // Các Reducer được gửi lên đây
//   homeMovie,
// });

// Sử dụng với redux toolkit
const rootReducer = {
  homeMovie,
}

export default rootReducer