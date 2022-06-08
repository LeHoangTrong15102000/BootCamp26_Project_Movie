import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from 'apis/authAPI';

const initialState = {
  data: {},
};

// Viết hàm xử lý đăng ký cho người dùng
export const userRegister = createAsyncThunk(
  'auth/register',
  async (values) => {
    const data = await authAPI.register(values);
    return { data };
  }
);

export const registerSlices = createSlice({});

export default registerSlices.reducer;
