import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const Login = (props) => {
  // Thì thằng này dựa trên cơ chế của customed và Uncontrolled component(ref) để tạo ra cái hooks tên là useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: { taiKhoan: '', matKhau: '' },
  });
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Tài khoản</label>
        <input
          type="text"
          id="username"
          {...register('username', { required: true })}
        />
        {errors.username && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="password">Mật khẩu</label>{' '}
        <input
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
        {errors.password && <span>This field is required</span>}
      </div>
    </form>
  );
};

export default Login;

// import React, { useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// const Login = (props) => {
//   // State quản lí giá trị của ô input
//   const [form, setForm] = useState({ taiKhoan: '', matKhau: '' });

//   // Thêm errors để set vào input nó có err bị lỗi(kiểm tra xem input nào nó đang bị lỗi để mà set giá trị err vào input đó)
//   // Quẳn lí các giá trị lỗi của ô input
//   const [errors, setErrors] = useState({ taiKhoan: '', matKhau: '' });

//   // Cách thứ 1 là sử dụng useState để quản lý các ô input
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setForm((prevState) => ({ ...prevState, [name]: value }));
//   };

//   // Nếu có nhiều lỗi thì phải cần validation hết những lỗi đó
//   const handleBlur = (event) => {
//     const { name, value } = event.target;
//     if (!value) {
//       // alert(`${name} is required!`);
//       // Trong thực tế thì chúng ta còn phải validation thêm nhiều lỗi hơn chứ không phải là empty string không thôi
//       setErrors((prevState) => ({
//         ...prevState,
//         [name]: 'Tài khoản không được để trống!',
//       }));
//     }
//   };

//   // Cách thứ 2 là sử dụng useRef để lưu trữ các ô input của chúng ta
//   let inpTaiKhoan = useRef(null);

//   return (
//     <form>
//       <div>
//         <label htmlFor="taiKhoan">Tài khoản</label>
//         {/* Sử dụng state để control: Controlled component */}
//         {/* Sử dụng trường hợp này để lưu trữ thì sẽ làm các ô input khác render lại mặc dù là nó không có thay đổi*/}
//         <input
//           type="text"
//           id="taiKhoan"
//           name="taiKhoan"
//           value={form.taiKhoan}
//           onBlur={handleBlur}
//           onChange={handleChange}
//         />
//         {/* Sử dụng ref để control : Uncontrolled component */}
//         {/* AKhi mà dữ liệu của thz useRef thay đỏii thì nó sẽ ko làm cho thz component render lại */}
//         {/* <input type="text" id="taiKhoan" ref={inpTaiKhoan} name="taiKhoan" value={inpTaiKhoan.current.value} /> */}

//         {/* Nếu có lỗi trong tài khoản thì binding ra lỗi đó */}
//         {errors.taiKhoan && (
//           <span className="text-red-600">{errors.taiKhoan}</span>
//         )}
//       </div>

//       <div>
//         <label htmlFor="matKhau">Mật khẩu</label>
//         <input
//           type="password"
//           id="matKhau"
//           name="matKhau"
//           value={form.matKhau}
//           onBlur={handleBlur}
//           onChange={handleChange}
//         />
//         {errors.matKhau && (
//           <span className="text-red-600">{errors.matKhau}</span>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;
