import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate, useNavigate, useRoutes } from 'react-router-dom'
import * as yup from 'yup';
import { TextInput } from '@mantine/core';
import { userLogin } from '../slices/LoginSlices';

const schema = yup.object({
  taiKhoan: yup.string().required('Trường này không được để trống!'),
  // .min(5, 'Tài khoản phải từ 5 đến 20 kí tự!')
  // .max(20, 'Tài khoản phải từ 5 đến 20 kí tự!'),
  matKhau: yup.string().required('Trường này không được để trống!'),
  // .max(20, 'Mật khẩu phải từ 5 đến 20 kí tự')
  // .matches(
  //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
  //   'Mật khẩu không phù hợp định dạng!'
  // ),
});

const Login = (props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      taiKhoan: '',
      matKhau: '',
    },
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, error, user } = useSelector(
    (state) => state.authLogin
  );

  const onSubmit = (values) => {
    console.log('values', values);
    // Khi nhấn vào onSubmit thì dispatch cái action là login
    dispatch(userLogin(values)); // Truyền giá trị value là taiKhoan , matKhau cua người dùng vào
  };

  // Ngoài hàm onSubmit thì còn có hàm là onError
  const onError = (errors) => {
    // Ngoài việc display ra lỗi mà còn muốn xử lý thêm gì thì cứ viết vào đây là được
    console.log('errors', errors);
  };
  
  if (isLoggedIn) {
    // Nếu isLoggedIn là true thì redirect user về page home (hoặc một page nào trước đó mà ta đã đi vào trước khi đi vào login)
    return <Navigate to="/" replace={true} />
  }
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* Sử dụng Controller để kết nói với các thư viện UI component bên ngoài */}

      {/* Tài Khoản */}
      <Controller
        name="taiKhoan"
        control={control}
        // Những cái lỗi thì nó sẽ ăn css của thư viện của nó
        render={({ field, fieldState }) => (
          <TextInput
            placeholder="tài khoản của bạn"
            label="Tài Khoản"
            {...field}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="matKhau"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            type="password"
            placeholder="mật khẩu của bạn"
            label="Mật Khẩu"
            {...field}
            // Phải để chấm hỏi vào để khi mà cõ lỗi thì nó mới hiện ra , vì mới vào chưa có lỗi mà bắt nó hiện ra thì sẽ lỗi bị lỗi
            error={fieldState.error?.message}
          />
        )}
      />

      {/* hiển thị ra lỗi tổng ở phía server đưa ra trong quá trình đăng ký bị trùng tài khoản */}
      {error && <div><span>{error}</span></div>}
      
      <button disabled={isLoading} className="bg-cyan-500 text-white p-2 ml-10">Đăng nhập</button>
    </form>
  );
};
  
export default Login;
