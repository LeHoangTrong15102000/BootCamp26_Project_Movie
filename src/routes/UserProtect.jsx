// Kiểm tra xem User có được truy cập vòa một route hay không

import React from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { Redirect, Navigate } from 'react-router-dom'

const UserProtect = ({children}) => {

    const { user, isLoggedIn } = useSelector(state => state.authLogin)
    // Kiểm tra user nếu chưa đăng nhập thì trả về trang đăng nhập
    if (!isLoggedIn) {
        // Redirect về trang login page
        return <Navigate to="/login" replace />;// thay thế hoàn toàn xóa component trang trước khỏi lịch sử trang web
    }

  return (
    <div>UserProtect</div>
  )
}

export default UserProtect