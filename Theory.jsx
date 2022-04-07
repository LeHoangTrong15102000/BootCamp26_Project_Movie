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
 * - Khi mà sử dụng cái createAsyncThunk(action của chúng ta) thì nó sẽ tự động làm hết, lần đầu tiên khi mà gọi thì nó sẽ tự động dispatch cái request, thành công thì nó sẽ tự động dispatch cái success, thất bại thì nó sẽ tự động dispatch cái failure -> để mà nhận được 3 cái actions đó thì chúng ta phải viết nó trong một cái keys(extraReducers của createSlice)
 * - Tại createAsyncThunk mình muốn tự xử lý lỗi thì chắc mình phải dùng try...catch thôi
 *      + Dùng rejectWithValue tham số thứ 2 của hàm async thunk, tham số thứ 1 là cái giá trị mình thực hiện với nó\
 * - Bây giờ chúng ta sẽ thay thế actions reducer, types bằng cái slice, asynchrounse actions thì sẽ thay bằng createAsyncThunk
 * 
 * - Thì tác dụng của interceptor là can thiệp vào quá trình response trả về từ nơi gọi axios, sau đó nó đi làm gì đó có quyền thay đổi data trả ra -> thì công việc này nó sẽ giúp mình chuẩn hóa cái format chung, thay vì nơi nào gọi axios cũng response.data.content
 *      - Việc này giúp giảm thiểu lặp code, và nơi gọi axios chắc chắn nó sẽ nhận được cái data đó rồi
 * 
 * - Tất cả các project nếu mà xài axios thì sẽ là: 
 *          + response.data -> trả về data -> còn phần đuôi của data do bên phía backEnd cung cấp
 *          + error.response.data -> trả về lỗi khi có lỗi
 * 
 * - Một điều nữa khi mà dùng reduxtoolkit thì không cần phải cài redux và redux-thunk nữa
 */

/**
 * Luyện tập thêm một chút từ details -> nhấn vào details chuyển sang /movies/:movieId
 * Thông thường redux devtool nó sẽ đi theo: tên Modules - chức năng trong modules - tên actions - state của action(pending, fulfilled, rejected)
 * 
 * 
 * 
 * // Phần  router có một vấn đề nữa cẩn phải nắm đó là về lazy-load
 * * Note
 */
