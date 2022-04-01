import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { getMovieShowing } from 'apis/movieAPI'

const initialState = {
    data: [],
    isLoading: false, 
    error: null,
}

// Tạo action thông qua createAsyncThunk
export const getShowing = createAsyncThunk(
    "home/movie/getShowing",
    // Lần đầu tiên nó sẽ tự động Action Request, thàn công thì nó se tự động success
    async () => {
        // async này không cần phải try...catch nó
        const {data} = await getMovieShowing();
        return {data: data.content};// viêt như vậy thì nó sẽ hiểu payload này có key là dâta
    }
)

// Mặc đinh trong toolkit thì action nó sẽ có 2 thuộc tính là type, payload
const homeMovieSlice = createSlice({
    name: "home/movie",
    initialState,
    reducers: {
        // Nếu là action bình thường thì viết trong đây, bản thân các action(name) thì nó cũng là types của action đó
    },
    extraReducers: {
        // Các actions types
        // Đối với action async cure crush
        [getShowing.pending]: (state, action) => {
            return {...state , isLoading: true,};
        },
        [getShowing.fulfilled]: (state, action) => {
            return {...state, isLoading: false, data: action.payload.data}
        },
        [getShowing.rejected]: (state, action) => {
            return {...state, isLoading: false, error: action.error}
        }
    },
})

// actions bình thường 

// action bất đồng bộ thì phải export như vậy
export default homeMovieSlice.reducer