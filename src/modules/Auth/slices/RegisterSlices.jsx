import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from 'apis/authAPI';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

// Viết hàm xử lý đăng ký cho người dùng
export const userRegister = createAsyncThunk(
  'auth/register',
  async (values) => {
    const data = await authAPI.register(values);
    return { data }; // nên return về key data của payload luôn
  }
);

export const registerSlices = createSlice({
  name: 'authRegister',
  initialState,
  reducers: {},
  extraReducers: {
    // Action để xử lý khi gọi API
    [userRegister.pending]: (state, action) => {
      return { ...state, isLoading: true, error: null };
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      return { ...state, isLoading: false, data: payload.data };
    },
    [userRegister.rejected]: (state, { error }) => {
      return { ...state, isLoading: false, error: error.message };
    },
  },
});

export default registerSlices.reducer;
