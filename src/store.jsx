// Redux Store configuration

// import { createStore, compose, applyMiddleware } from 'redux';

// import ReduxThunk from 'redux-thunk';
// import reducer from './reducer';
// // import homeMovie from '@reduxjs/toolkit'

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const middlewares = applyMiddleware(ReduxThunk);
// const enhancer = composeEnhancers(middlewares);

// const store = createStore(reducer, enhancer);

// export default store;

// Redux toolkit Configuration
// Khi mà dùng Reducer của Redux toolkit thì về bản chất thì nó sẽ bỏ qua combineReducers cho mình luôn
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import homeMovieSlice from './modules/Home/slices/movieSlice';
import movieDetailsSlice from './modules/Movies/slices/movieDetails';

// Mặc định configureStore đã bao gồm redux-devtool và redux thunk
// Hàm configureStore nó đã làm hết cho chúng ta, chỉ cần truyền reducer vào thôi
const store = configureStore({
  // reducer nó sẽ nhận vào một cái object, khi mà mình truyền cái object vào đây thì nó sẽ tự động combine tất cả các reducer đó vào trong combineReducer cho mình
  // reducer: rootReducer, // reducer trong đây là một thuộc tính của configureStore
  // Nếu mà muốn xài cái middleware khác không phải là redux thunk, mình sẽ cấu hình Middleware nó trong cái store của toolkit này.
  //redux-devtool trong store mặc định nó đã là true

  // Tự động combine các child reducer
  reducer: {
    // home modules
    homeMovieSlice,
    // movie modules
    movieDetailsSlice,
  },
});

export default store;
