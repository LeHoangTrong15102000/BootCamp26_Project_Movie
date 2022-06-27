// Kiểm tra xem User có được truy cập vòa một route hay không

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const UserProtect = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => state.authLogin);
  const { pathname } = useLocation();
  // Kiểm tra user nếu chưa đăng nhập thì trả về trang đăng nhập
  if (!isLoggedIn) {
    // Redirect về trang login page
    // Lưu url hiện tại trước khi navigate về trang login để sau khi user login thành công có thể quay về page này, giúp tăng UX
    return <Navigate to={`/login?successUrl=${pathname}`} replace />; // thay thế hoàn toàn xóa component trang trước khỏi lịch sử trang web
  }

  // Trường hợp mà user đăng nhập vào rồi mà ko có quyền truy cập vào trang đó thì đưa nó về trang khác
  // Sử dụng hook là useLocation để lưu trữ cái param trên URL khi mà mình bị đá qua trang khác(có cái key là pathname)

  return children;
};

export default UserProtect;
