// Viết action thực hiện tác vụ liên quan đến đăng nhập vào đây, dùng middleware để call API
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from 'apis/authAPI';

const initialState = {
  user: null, // ban đầu chưa có nên là null
  isLoggedIn: false, // đã đăng nhập vào hay chưa
  isLoading: false,
  error: null,
};

// Viết hàm để call API, trên đây call APi xong thì xuống dưới chúng ta xử lý các action của nó
export const userLogin = createAsyncThunk(
  'auth/login',
  // tham số thứ 2 là một async function
  // cái params đầu tiền là giá trị mà user truyền vào, thứ 2 là thunk APi mình ko cần xài thì bỏ qua
  async (values) => {
    // values là những giá trị {'taiKhoan', 'matKhau'} khi mà người dùng đăng nhập vào
    const data = await authAPI.login(values);
    return data;
  }
);

// Viết hàm để xử lý dữ liệu
export const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  // extraReducers dùng cho những action có call APi
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      return { ...state, isLoading: true, error: null };
    },
    [userLogin.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, data: action.payload.data };
    },
    [userLogin.error]: (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    },
  },
});

export default authSlices.reducer;
