import * as actionTypes from '../constants/MovieConstants';
import { getMoviesShowing } from 'apis/movieAPI';

export const getMovieShowing = () => {
  // Đây là asyncurush action

  // Thường CRUD sẽ viết với format bên dưới
  return async (dispatch) => {
    // Dispatch lên để gọi về API chứa danh sach phim
    dispatch({
      type: actionTypes.GET_MOVIES_SHOWING_REQUEST,
    });
    try {
      // lấy về data của API đó
      const { data } = await getMoviesShowing();
      // Sau khi lấy về data rồi thì dispatch lên nếu thành công
      dispatch({
        type: actionTypes.GET_MOVIES_SHOWING_SUCCESS,
        // thường trong công ty mọi người sẽ dùng chung một cái form khi mà gọi API, nên hãy tập quen đần với cách này
        payload: {
          data, // thành công thì là action.payload.data
        },
      });
    } catch (error) {
      // Dispatch lên nếu thất bại
      dispatch({
        type: actionTypes.GET_MOVIES_SHOWING_FAILURE,
        payload: {
          error: error.response.data, // thất bại thì action.payload.error
        },
      });
    }
  };
};
