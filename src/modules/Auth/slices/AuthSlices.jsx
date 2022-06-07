// Viết action thực hiện tác vụ liên quan đến đăng nhập vào đây, dùng middleware để call API
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from 'apis/authAPI';

const initialState = {
  user: null, // ban đầu chưa có nên là null
  isLoggedIn: false, // đã đăng nhập vào hay chưa
  isLoading: false,
  error: null,
};

// Viết hàm để call API
export const userLogin = createAsyncThunk('auth/login');

// Viết hàm để xử lý dữ liệu
export const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  // extraReducers dùng cho những action có call APi
  extraReducers: {},
});
