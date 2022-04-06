// Chứa các hàm gọi API liên quan đến movie

import axios from './axiosClient';

export const getMoviesShowing = () => {
  // Nên viêt thoe cách thứ 2 để có thể dễ quan sát hơn là viết nối chuỗi
  // Trước khi data trả về cho thằng này thì nó đi qua interceptor
  return axios.get('QuanLyPhim/LayDanhSachPhim', {
    params: {
      maNhom: 'GP01',
    },
  });
};

export const getMoviesDetails = (movieId) => {
  return axios.get('QuanLyPhim/LayThongTinPhim', {
    params: {
      maPhim: movieId,
    },
  });
};

// action
