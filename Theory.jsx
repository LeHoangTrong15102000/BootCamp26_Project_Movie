// Tất cả các cấu hình để built ra giao diện đã được react tích hợp trong react-script

// Nếu qua sử dụng Redux toolkit rồi thì các redux tích vào project ta sẽ bỏ hết, dùng redux toolkit thay thế cho các thư viên Redux như thunk
/**
 * Redux toolkit là một cái thư viện bao bọc lấy thz Redux, nó được kế thừa từu logic của Redux
 *  - Redux toolkit nó sẽ giúp mình 2 điều
 *      + Việc cấu hình Redux store nó sẽ dễ dàng hơn rất là nhiều
 *  - Bên trong redux-toolkit sẽ có thầng createSlice, createSlice sẽ có 3 thành phần "name-initialState-reducers" -> thì chỉ cần thằng createSlice nó đã kết hợp cả 3 thằng: constants, actions , reducers
 *
 * - Do trong redux toolkit nó đã chứa redux thunk rồi, nên giờ muốn dispatch cái hàm lên thì chỉ cần rồi phương thức createAsyncThunk trong redux toolkit là được.
 *      + Nó sẽ giúp chúng ta tự động generate ra 3 action
 *
 */
