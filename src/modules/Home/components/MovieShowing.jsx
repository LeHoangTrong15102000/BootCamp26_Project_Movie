import React, { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getMovieShowing } from '../actions/movieActions'
// import homeMovie from '../reducers/movieReducers'

const MovieShowing = () => {
    const dispatch = useDispatch()
    // Tên Reducer lấy từ rootReducer về
    const { data , isLoading, error} = useSelector(state => state.homeMovie);// Gọi tử rootReducers về

    // Sử dụng useEffect để call API
    useEffect(() => {
      // dispatch lên cái getMovieShowing
      dispatch(getMovieShowing());
    }, [] )

    // Nếu isLoading là true thì nó cứ load như này hoài
    if (isLoading) {
      return <p>Loading ...</p>
    }
    if (error) {
      // Cho nó một cái fallBack, để không may cái err nó ko hiện ra
      return <p>{error || "Something went wrong"}</p>
    }

  return (
    // Render ra giao diện
    <div>
      <h3>MovieShowing</h3>
      {data.map((movie, index) => (
       <>
         <p>{movie.tenPhim}</p>
         <button>Details</button>
       </>
       
      ))}
    </div>
  )
}

export default MovieShowing