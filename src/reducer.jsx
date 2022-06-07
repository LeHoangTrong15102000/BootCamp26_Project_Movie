// Root Reducer
import homeMovie from './modules/Home/reducers/movieReducers';
import { combineReducers } from 'redux';

// Sử dụng với Redux
// export default combineReducers({
//   // Các Reducer được gửi lên đây
//   homeMovie,
// });

// Sử dụng với redux toolkit
// Reducers tổng này sử dụng cho thằng redux cũ về redux thunk
const rootReducer = {
  // homeMovie, 
};
// Thay vì sử dụng thz rootReducer bên đây thì ta có thể qua store để import thẳng nó vào
// Nếu đã sử dụng với reduxtoolkit rồi thì có thể bỏ file rootReducer này đi

export default rootReducer;
