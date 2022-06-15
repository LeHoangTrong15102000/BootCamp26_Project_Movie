// Viết action thực hiện tác vụ liên quan đến đăng nhập vào đây, dùng middleware để call API
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "apis/authAPI";

// Lấy từ localStorage cái user của người dùng đã đăng nhập vào, có thể viết gộp lại cũng được
// const user = localStorage.getItem('user')
//   ? JSON.parse(localStorage.getItem('user'))
//   : null;

const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  // ta sẽ truyền động giá trị của user luôn, nếu đã có KH đăng nhập vào thì user sẽ lấy từ local, nếu không có thì se là null
  user, // ban đầu chưa có nên là null
  // isLoggedIn: !!user, // đã đăng nhập vào hay chưa, "!!" nghĩa là phủ định của phủ định có nghĩa là ban đầu chưa có thì biến isLoggedIn là false, khi mà có người dùng đăng nhập vào rồi thì là true
  isLoggedIn: Boolean(user),// cũng có thể viết lại như sau, - dùng để xác định user đã đăng nhập hay chưa(Boolean của một object có dữ liệu bên trong là true)
  isLoading: false,
  error: null,
};

// Viết hàm để call API, trên đây call APi xong thì xuống dưới chúng ta xử lý các action của nó
export const userLogin = createAsyncThunk(
  "auth/login",
  // tham số thứ 2 là một async function
  // cái params đầu tiền là giá trị mà user truyền vào, thứ 2 là thunk APi mình ko cần xài thì bỏ qua
  async (values) => {
    // values là những giá trị {'taiKhoan', 'matKhau'} khi mà người dùng đăng nhập vào
    const data = await authAPI.login(values); // biến data ở đây chính là phthuc payload
    // Nếu muốn user không cần đăng nhập lại khi refresh hoặc close browser
    // Đăng nhập thành công => Lưu thông tin user vào localStorage
    localStorage.setItem("user", JSON.stringify(data));

    // Tại vì return không thì nó đã trả về cái payload, nên mới return về object có chứa data(nên bóc tách phần tử data trong payload và return về luôn)
    return { data };
  }
);

// Viết hàm để xử lý dữ liệu
export const loginSlices = createSlice({
  name: "authLogin", // name dùng để khai báo trong store reducer tổng
  initialState,
  reducers: {},
  // extraReducers dùng cho những action có call APi
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      return { ...state, isLoading: true, error: null };
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      // isLoggedIn là true khi mà loggin thành công thì là  true
      return {
        ...state,
        isLoading: false,
        user: payload.data,
        isLoggedIn: true,
      };
    },
    // Trong error có cái key là message
    [userLogin.rejected]: (state, { error }) => {
      return { ...state, isLoading: false, error: error.message };
    },
  },
});

export default loginSlices.reducer;
