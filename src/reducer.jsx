// Root Reducer
import homeMovie from './modules/Home/reducers/movieReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  // Các Reducer được gửi lên đây
  homeMovie,
});
