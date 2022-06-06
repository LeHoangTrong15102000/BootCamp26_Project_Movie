import axios from './axiosClient';

//  Values là nhận vào cái giá trị mà người dùng đăng nhập ({taiKhoan, matKhau})
export const login = (values) => {
    return axios.post('QuanLyNguoiDung/DangNhap', values)
};

// Xây dựng APi đăng ký cho người dùng
export const register = (values) => {
    return axios.post('QuanLyNguoiDung/DangKy', values)
};
