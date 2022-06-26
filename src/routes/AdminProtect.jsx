import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Outlet , Navigate, useLocation } from 'react-router-dom'


// Component dùng để bảo vệ admin
const AdminProtect = ({children}) => {
const {user, isLoggedIn } = useSelector(state => state.authLogin)
const {pathname} = useLocation()

// Chưa đăng nhập
if(!isLoggedIn) {
    return <Navigate to={`/login?successUrl=${pathname}`} replace />
}

// Đã qua được cái if rồi thì thằng user phải có data
// Đã đăng nhập nhưng không phải là admin
if (user?.maLoaiNguoiDung !== "QuanTri")  {
    return <Navigate to="/" replace />
}

return children
// return <Outlet />;// đùng để thiết kế layout component
}

export default AdminProtect