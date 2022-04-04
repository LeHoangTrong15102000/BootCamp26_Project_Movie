import * as actionTypes from '../constants/movieConstants';
import { getMoviesShowing } from 'apis/movieAPI';

export const getMovieShowing = () => {
  // Đây là asyncurush action

  // Thường CRUD sẽ viết với format bên dưới, các phương thức gọi API trong action này
  return async (dispatch) => {
    // Dispatch lên để gọi về API chứa danh sach phim
    dispatch({
      type: actionTypes.GET_MOVIES_SHOWING_REQUEST,
    });
    const { data } = await getMoviesShowing();
    try {
      // lấy về data của API đó
      // Sau khi lấy về data rồi thì dispatch lên nếu thành công
      dispatch({
        type: actionTypes.GET_MOVIES_SHOWING_SUCCESS,
        // thường trong công ty mọi người sẽ dùng chung một cái form khi mà gọi API, nên hãy tập quen đần với cách này
        payload: {
          data: data.content, // thành công thì là action.payload.data, phải lấy ra cái content mà backEnd trả về thì mới được
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
