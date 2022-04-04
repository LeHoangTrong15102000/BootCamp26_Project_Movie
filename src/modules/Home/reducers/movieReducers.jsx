import * as actionTypes from '../constants/movieConstants';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    // Reducer của thằng getMovieShowing
    // Return không có 2 dấu ngoặc vẫn được
    case actionTypes.GET_MOVIES_SHOWING_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case actionTypes.GET_MOVIES_SHOWING_SUCCESS: {
      return { ...state, isLoading: false, data: payload.data };
    }
    case actionTypes.GET_MOVIES_SHOWING_FAILURE: {
      return { ...state, isLoading: false, data: payload.data };
    }

    default:
      return state;
  }
};
