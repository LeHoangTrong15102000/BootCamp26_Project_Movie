import React, { useState, useRef } from 'react';

const Login = (props) => {
  const [form, setForm] = useState({ taiKhoan: '', matKhau: '' });

  // Cách thứ 1 là sử dụng useState để quản lý các ô input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  // Cách thứ 2 là sử dụng useRef để lưu trữ các ô input của chúng ta
  const inpTaiKhoan = useRef(null);

  return (
    <form>
      <div>
        <label htmlFor="taiKhoan">Tài khoản</label>
        {/* Sử dụng state để control: Controlled component */}
        <input
          type="text"
          id="taiKhoan"
          name="taiKhoan"
          value={form.taiKhoan}
          onChange={handleChange}
        />
        {/* Sử dụng ref để control : Uncontrolled component */}
      </div>

      <div>
        <label htmlFor="matKhau">Mật khẩu</label>
        <input
          type="password"
          id="matKhau"
          name="matKhau"
          value={form.matKhau}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Login;
