import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInput } from '@mantine/core';

const schema = yup.object({
  taiKhoan: yup
    .string()
    .required('Trường này không được để trống!')
    .min(5, 'Tài khoản phải từ 5 đến 20 kí tự!')
    .max(20, 'Tài khoản phải từ 5 đến 20 kí tự!'),
  matKhau: yup
    .string()
    .required('Trường này không được để trống!')
    .max(20, 'Mật khẩu phải từ 5 đến 20 kí tự')
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      'Mật khẩu không phù hợp định dạng!'
    ),
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

  const onSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button className="bg-cyan-500 text-white p-2 ml-10">Đăng nhập</button>
    </form>
  );
};

export default Login;
