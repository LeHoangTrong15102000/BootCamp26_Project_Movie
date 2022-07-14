import axios from 'axios';
import qs from 'query-string';
import store from '../store';
import { useSelector, useDispatch } from 'react-redux';

// setup những cấu hình mặc định cho axios
const axiosClient = axios.create({
  baseURL: 'https://movienew.cybersoft.edu.vn/api/',
  headers: {
    TokenCybersoft:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyNiIsIkhldEhhblN0cmluZyI6IjEzLzEwLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2NTYxOTIwMDAwMCIsIm5iZiI6MTYzMzE5NDAwMCwiZXhwIjoxNjY1NzY2ODAwfQ.TMg-RWGpT6_kH-eG3Pbw5j_8yWUP84LrkWZAFj-Drfk',
  },

  // override lại cách axios set params lên URL
  paramsSerializer: (params) => {
    //     const filtered = Object.entries(params).filter(([key,value]) => {
    //         return value !== null && value !== undefined && value !== '';
    //     }).map(([key, value], index) => {
    //         return `${key}=${value}`
    //     })

    //    return filtered.length > 0 ? filtered.join("&") : '';

    return qs.stringify(params, { skipEmptyString: true, skipNull: true }); // Về mặc định thì axios ko bỏ qua empty string, còn chúng ta muốn bỏ qua thì setup cái mặc định vào
  },
});

// request mình sẽ để ở trên, còn response sẽ để ở bên dưới
axiosClient.interceptors.request.use(
  (request) => {
    // Do something before request is sent
    // Kiểm tra trước khi request được sent
    // Dùng getState() để lấy thẳng reducer từ store

    // Kiểm tra nếu user đã đăng nhập => lấy accessToken truyền vào headers, bởi vì đây là thành phần động phụ thuộc vào việc user đã đăng nhập hay chưa(thì nó sẽ được thêm hoặc không thêm)
    const { authLogin } = store.getState();
    const { accessToken } = authLogin?.user || {}; // Nếu mà user null không có thì nó sẽ trả về object rỗng để key accessToken ra là undefined

    if (accessToken) {
      // Tất cả các project đều tuân theo cái key Authorization, còn key TokenCyberSoft là do trung tâm đưa vào cho học viên
      request.headers.Authorization = `Bearer ${accessToken}`; // bên ngoài người ta dùng key này làm chuẩn chung bảo mật api của họ
    }

    return request;
  },
  (error) => {
    return Promise.reject(error.response.data.content);
  }
);

// interceptor -> kết nối với API rồi trả về giao diện
// Cấu hình cho nó
// Trước khi gửi về cho nơi gọi axios thì nó sẽ đi vào interceptor, còn bây giờ sẽ có thêm 1 quá trình nữa đó là quá trình modified request(thay đổi: thêm , xóa , ... ) -> thì trong đây là nơi mình sẽ ép thêm cái token(đăng nhập) vào
axiosClient.interceptors.response.use(
  // kêt quả khi mà server trả về thì nó sẽ đi qua thầng interceptor này trước khi trả ra cho nơi gọi axios
  // ta có thể thay đổi data sau đó trả về cho nơi gọi axios
  (response) => {
    // response.data là format của axios, sau đó
    // Những gì ta return trong đây chỉnh là kết quả trả về của axios khi gọi API

    return response.data.content; // Chỉ cần trả về response nếu đã trả về response.data.content thì bên gọi data không cần phải bốc tách nữa
    /**
     * Nhũng gì mà mình return ở đây sẽ là kết quả trả về cho nơi gọi axios
     * // response.data là format của axios, sau đó .content là format của backEnd cybersoft quy định
     */
  },
  (error) => {
    // Có lỗi thì trả về ở đây
    // format lại error trả ra bên ngoài
    // Thêm Promise.reject để đảm bảo rằng nó sẽ nhảy xuống catch tại nơi gọi API để lấy ra lỗi khi mà gọi API thất bại
    return Promise.reject(error.response.data.content); // Nếu có lỗi thì nó sẽ return về cái định dạng này
    // Nếu có lỗi thì nó sẽ nhảy xuống thz rejected của Reducer và quăng ra cái lỗi cho chúng ta
  }
);

export default axiosClient;
