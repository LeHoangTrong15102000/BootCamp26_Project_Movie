import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMoviesShowing } from 'apis/movieAPI';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

// Tạo actions thông qua createAsyncThunk, gọi API để thực hiện các lệnh của actions
export const getShowing = createAsyncThunk(
  'home/movie/getShowing',// tên actions
  // Lần đầu tiên nó sẽ tự động Action Request, thành công thì nó se tự động success
  async () => {// function return về data
    // async này không cần phải try...catch nó
    const { data } = await getMoviesShowing();
    return { data: data.content }; // viết như vậy thì nó sẽ hiểu payload này có key là data, và truyền vào data(của initialState) data của API getMoviesShowing() gọi về
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
  // Thì ở dưới đây nó sẽ tự động generate ra cho mình những cái type tương ứng luôn, mà chúng ta không cần phải đi dispatch từng cái một nữa
  extraReducers: {
    // Các actions types
    // Đối với action asynchrounse, trong đây chứa action bất đồng bộ
    [getShowing.pending]: (state, action) => {
      return { ...state, isLoading: true };
    },
    [getShowing.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, data: action.payload.data };
    },
    [getShowing.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.error };
    },
  },
});

// Thông thường ở redux bình thường thì mình sẽ tạo ra types để tranh chỉnh sửa ở actions và reducers, còn bây giờ sử dụng redux-toolkit thì nó gộp chung actions và reducer cho mình

// actions bình thường sẽ dispatch như sau
// export const { increase, decrease, increaseByAmount } = homeMovieSlice.actions;// thì dispatch actions nó sẽ đi vào reducer thực hiện cái lệnh mã cho mình

// action bất đồng bộ thì phải export như vậy, export ra để đưa vào rootReducer
export default homeMovieSlice.reducer;
