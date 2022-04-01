import React, { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import homeMovie from '../reducers/movieReducers'

const MovieShowing = () => {
    const dispatch = useDispatch()
    // Tên Reducer lấy từ rootReducer về
    const { data , isLoading, error} = useSelector(state => state.homeMovie)
  return (
    <div>MovieShowing</div>
  )
}

export default MovieShowing