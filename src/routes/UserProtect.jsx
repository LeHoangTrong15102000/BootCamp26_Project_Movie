// Kiểm tra xem User có được truy cập vòa một route hay không

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Navigate } from 'react-router-dom';

const UserProtect = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => state.authLogin);
  // Kiểm tra user nếu chưa đăng nhập thì trả về trang đăng nhập
  if (!isLoggedIn) {
    // Redirect về trang login page
    return <Navigate to="/login" replace />; // thay thế hoàn toàn xóa component trang trước khỏi lịch sử trang web
  }
  // Trường hợp mà user đăng nhập vào rồi mà ko có quyền truy cập vào trang đó thì đưa nó về trang khác

  return children;
};

export default UserProtect;
