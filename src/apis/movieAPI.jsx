// Chứa các hàm gọi API liên quan đến movie

import axios from "./axiosClient";

export const getMoviesShowing = () => {
  // Nên viêt thoe cách thứ 2 để có thể dễ quan sát hơn là viết nối chuỗi
  // Trước khi data trả về cho thằng này thì nó đi qua interceptor
  return axios.get("QuanLyPhim/LayDanhSachPhim", {
    params: {
      maNhom: "GP01",
    },
  });
};

// Call api lấy
export const getMoviesDetails = (movieId) => {
  return axios.get("QuanLyPhim/LayThongTinPhim", {
    params: {
      maPhim: movieId,
    },
  });
};

// call APi thêm Movie vào trong quản lí của admin
export const addMovie = (movie) => {
  // Nếu bên trong Object movie có chứa data là định dạng File thì không thể upload như bình thường được mà cần chuyển về định dạng formData để upload

  // Việc đầu tiên phải chuyển nó về định dạng string
  const formData = new FormData();// Đây là đối tượng của thằng javascript nó sẽ cung cấp cho chúng ta những cách xử lý những cái request mà nó có formData trong đó
  formData("maNhom", 'GP01')
  for (let key in movie) {
    formData.apppend(key, movie[key]);// thêm các cái định dạng Blob vào trong formData
  }

  // JSon thì nó sẽ bỏ qua những kiểu dữ liệu đặc biệt(function, file, fileDefault là nó bỏ qua hết)
  return axios.post("QuanLyPhim/ThemPhimUploadHinh", formData);// Nếu mà ghi như vậy thì nó sẽ bỏ qua các kiểu dữ liệu của file, function, fileDèfault
};

// call APi cho form đăng kí đăng nhập

// action
