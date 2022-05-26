import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieDetails } from '../slices/movieDetails';

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state) => state.movieDetailsSlice
  );

  const { movieId } = useParams(); //movieId là key đằng sau dấu ":" mình sẽ lấy được khi mà dùng useParams

  // Dùng useEffect để call API, khi mà chương trình chạy thì thầng này sẽ chạy và dispatch lên reducer 1 hàm để gọi API
  useEffect(() => {
    // dispatch lên reducer cái getMovieDetails
    dispatch(getMovieDetails(movieId)); // truyền cái movieId vào đây
  }, []);

  return (
    <div>
      <h3 className="text-info">MovieDetails</h3>
      <p>
        Tên phim: <span className="text-orange-500">{data.tenPhim}</span>
      </p>
      <span className="text-secondary">Tóm tắt nội dung: {data.moTa}</span>
    </div>
  );
};

export default MovieDetails;
