import React, { useState, useRef } from 'react';
import { useDispatch , useSelector } from 'react-redux'

const Login = (props) => {
  const [form, setForm] = useState({ taiKhoan: '', matKhau: '' });
  const [errors , setErrors] = useState({taiKhoan: '', matKhau: ''});

  // Cách thứ 1 là sử dụng useState để quản lý các ô input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  // Nếu có nhiều lỗi thì phải cần validation hết những lỗi đó
  const handleBlur = (event) => {
    const {name ,  value } = event.target
    if (!value) {
      alert(`${name} is required!`)
    }
  }

  // Cách thứ 2 là sử dụng useRef để lưu trữ các ô input của chúng ta
  let inpTaiKhoan = useRef(null);

  return (
    <form>
      <div>
        <label htmlFor="taiKhoan">Tài khoản</label>
        {/* Sử dụng state để control: Controlled component */}
        {/* Sử dụng trường hợp này để lưu trữ thì sẽ làm các ô input khác render lại mặc dù là nó không có thay đổi*/}
        <input
          type="text"
          id="taiKhoan"
          name="taiKhoan"
          value={form.taiKhoan}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {/* Sử dụng ref để control : Uncontrolled component */}
        {/* AKhi mà dữ liệu của thz useRef thay đỏii thì nó sẽ ko làm cho thz component render lại */}
        {/* <input type="text" id="taiKhoan" ref={inpTaiKhoan} name="taiKhoan" value={inpTaiKhoan.current.value} /> */}
      </div>

      <div>
        <label htmlFor="matKhau">Mật khẩu</label>
        <input
          type="password"
          id="matKhau"
          name="matKhau"
          value={form.matKhau}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Login;
