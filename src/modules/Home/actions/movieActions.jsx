import * as actionTypes from '../constants/MovieConstants'
import { getMoviesShowing } from 'apis/movieAPI'


export const getMoviesaShowing = () => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_MOVIES_SHOWING_REQUEST
        })
    }
}
