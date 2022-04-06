import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMoviesShowing } from 'apis/movieAPI';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

// Tạo actions thông qua createAsyncThunk, gọi API để thực hiện các lệnh của actions
// createAsyncThunk chỉ sử dụng cho các hàm xử lý trước khi dispatch
export const getShowing = createAsyncThunk(
  'home/movie/getShowing', // tên actions, tên actions type sẽ tư động nối lại cho chúng ta
  // Lần đầu tiên nó sẽ tự động Action Request, thành công thì nó se tự động success
  async (_, { rejectWithValue }) => {
    // Tham số thứ 2 là payload creator là một cái hàm, thì trong đây dùng để gọi API
    // function return về data
    // async này không cần phải try...catch nó sẽ tự trả về cho chúng ta, nếu thành công thì trả về data còn lỗi thì trả về lỗi
    try {
      const { data } = await getMoviesShowing();
      /**
       * // Bốc tách thẳng data từ thằng getMoviesShowing lấy về luôn
       * // Mặc định thằng axios trả về một cái object {statucode, header,..} trong đó có cái key là data nữa
       */
      // Nếu mà return data -> thì nó sẽ hiểu payload là data còn nếu return {data } thì nó sẽ hiểu payload có cái key là data
      // Lí do mà mình để nó trong một cái object là có thể mình sẽ trả nó về nhiều cái key
      return { data: data.content }; // viết như vậy thì nó sẽ hiểu payload này có key là data(content là nội dung bên trong data trả về, thường do bên phía backEnd quy định), và truyền vào data(của initialState) data của API getMoviesShowing() gọi về
      // Backend trả về có cái key là content nữa

      // Tại vì error của thằng axios trả về nó hơi đặc biệt nên phải tự xử lý
    } catch (error) {
      console.log(error);
      return rejectWithValue({ error: error.response.data.content }); // Bắt lỗi cho chúng ta, trường hợp sử dụng rejectWithValue(error) thì cái data trả về là payload luôn
    }
  }
);

// Mặc định trong toolkit thì action nó sẽ có 2 thuộc tính là type, payload
const homeMovieSlice = createSlice({
  name: 'home/movie', // bắt buộc phải có, thì về bản chất slice nó sẽ đi phân biệt từng cái reducer với nhau thông qua tên mình truyền vào
  initialState, // StateDefault mặc định của slice
  reducers: {
    // vd như increasement() {} nó sẽ hiểu cái types(increase) là tên của cái actions đó luôn, vừa là actions vừa là cái case cửa Reducer
    // Nếu là action bình thường thì viết trong đây, bản thân các action(name) thì nó cũng là types của action đó
    /**
     * increase() {// dispatch cái actions
     *  state.value++ // thì nó sẽ vào reducers thực hiện cái đoạn mã này cho mình
     * }
     */
  },
  // Thì ở dưới đây nó sẽ tự động generate ra cho mình những cái type tương ứng luôn, mà chúng ta không cần phải đi dispatch từng cái type một trong Reducers nữa
  extraReducers: {
    // Các actions types
    // Đối với action asynchrounse, trong đây chứa action bất đồng bộ
    [getShowing.pending]: (state, action) => {
      return { ...state, isLoading: true };
    },
    [getShowing.fulfilled]: (state, action) => {
      // cái data dưới đây là cái biến data trong initialState của chúng ta
      return { ...state, isLoading: false, data: action.payload.data };
    },
    [getShowing.rejected]: (state, action) => {
      // sao cái này nó không bắt lỗi và trả ra lỗi
      return { ...state, isLoading: false, error: action.payload.error };
    },
  },
});

// Thông thường ở redux bình thường thì mình sẽ tạo ra types để tranh chỉnh sửa ở actions và reducers, còn bây giờ sử dụng redux-toolkit thì nó gộp chung actions và reducer cho mình

// actions bình thường sẽ dispatch như sau
// export const { increase, decrease, increaseByAmount } = homeMovieSlice.actions;// thì dispatch actions nó sẽ đi vào reducer thực hiện cái lệnh mã cho mình

export default homeMovieSlice.reducer; // export tất cả các actions bao gồm cả action bất đồng bộ ra reducers
