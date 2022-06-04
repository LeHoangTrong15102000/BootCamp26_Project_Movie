import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputText from 'components/InputText';

// Định nghĩa validate schema cho form sa
const schema = yup.object({
  taiKhoan: yup
    .string()
    // Chỉ cần truyền vào cho nó cái nội dung validate không cần giá trị là true
    .required('Trường này không được để trống!')
    .min(5, 'Tài khoản phải từ 5 đến 20 kí tự')
    .max(20, 'Tài khoản phải từ 5 đến 20 kí tự'),
  matKhau: yup
    .string()
    .required('Trường này không được để trống!')
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      'Mật khẩu không phù hợp với định dạng!'
    ),
  firstName: yup
    .string()
    .required('Trường này không được để trống!')
    .min(5, 'Tên đầu phải từ 5 đến 20 kí tự!')
    .max(20, 'Tên đầu phải từ 5 đến 20 kí tự!'),
  lastName: yup
    .string()
    .required('Trường này không được để trống!')
    .min(3, 'Tên cuối phải từ 3 đến 7 kí tự!')
    .max(7, 'Tên cuối phải từ 3 đến 7 kí tự!'),
  age: yup
    .number()
    .required('Trường này không được để trống!')
    .positive('Yêu cầu tuổi phải là số dương!')
    .integer('Yêu cầu tuổi phải là số nguyên!'),
  gmail: yup
    .string()
    .required('Trường này không được để trống!')
    .matches(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      'Email không phù hợp với định dạng!'
    ),
});

const Login = (props) => {
  // Thì thằng này dựa trên cơ chế của customed và Uncontrolled component(ref) để tạo ra cái hooks tên là useForm
  // Register có nghĩa là dùng để đăng kí ô input
  // handleSubmit sẽ xử lý việc thành công hay thất bại để gọi tới callBack tương ứng
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      taiKhoan: '',
      matKhau: '',
      gmail: '',
      firstName: '',
      lastName: '',
      age: '',
    },
    mode: 'onTouched',
    // Định nghĩa schema cho form
    resolver: yupResolver(schema), // Dùng schema để validate
  });

  // Tạo ra cái hàm hứng giá trị mà form trả về (là tham số thứ nhất(callBack Function thứ 1) của hàm handleSubmit trong react-hook-form)
  const onSubmit = (values) => {
    console.log('values', values);
  };

  console.log('Re-render');

  return (
    // khi mà chạy cái form thì nó sẽ có một sự kiện là onSubmit và gọi hàm handleSubmit ra
    // Hàm handleSubmit thì nó sẽ có 2 cái tham số là 2 cái callBack function, CB function thứ nhất là hàm Valid trả về object data trong form của chúng ta, CB function thứ 2 là onInvalid là khi mà submit thì thất bại thì nó bị cái lỗi nào đó liên quan đến validation , thì khi mà thất bại thì nó sẽ nhảy vào cái callBack thứ 2
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Tài khoản</label>{' '}
        <input
          type="text"
          id="username"
          {...register(
            'taiKhoan'
            // {
            //   // required: true;
            //   required: {
            //     value: true,
            //     message: 'Trường này không được để trống!',
            //   },
            //   minLength: {
            //     value: 5,
            //     message: 'Tài khoản phải từ 5 đến 20 kí tự!',
            //   },
            //   maxLength: {
            //     value: 20,
            //     message: 'Tài khoản phải từ 5 đến 20 kí tự!',
            //   },
            // }
          )}
        />
        {errors.taiKhoan && (
          <span className="text-red-500">{errors.taiKhoan.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="password">Mật khẩu</label>{' '}
        <input
          type="password"
          id="password"
          {...register(
            'matKhau'
            // {
            //   required: {
            //     value: true,
            //     message: 'Trường này không được để trống!',
            //   },
            //   minLenght: {
            //     value: 8,
            //     message: 'Mật khẩu phải từ 5 đến 20 kí tự!',
            //   },
            //   maxLength: {
            //     value: 20,
            //     message: 'Mật khẩu phải từ 5 đến 20 kí tự!',
            //   },
            // }
          )}
        />
        {errors.matKhau && (
          <span className="text-red-500">{errors.matKhau.message}</span>
        )}
      </div>

      {/* Thử InputText với firstName */}
      {/* Thì mình tạo một component là inputText chứa những css chung cho cái layout của form thì để tương tác nó với react-hook-form thì cần truyền cho nó hàm là register */}
      {/* <InputText
        label="First Name"
        type="text"
        name="firstName"
        errors={errors.firstName}
        register={register}
        validations={{
          required: {value: true, 'Trường này không được để trống!'},
          minLength: {value: 5, ''}
        }}
      /> */}

      {/* InputText cho lastName */}
      {/* <InputText
        label="Last Name"
        type="text"
        name="lastName"
        errors={errors.lastName}
        register={register}
      /> */}

      <div>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" {...register("firstName")} />
        {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" {...register("lastName")} /> 
        {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
      </div>

      {/* InputText cho age */}
      <div>
        <label htmlFor="age">Age</label>
        <input type="text" id="age" {...register('age')} />
        {errors.age && (
          <span className="text-red-500">{errors.age.message}</span>
        )}
      </div>

      {/* thêm một trường email nữa để kiểm tra regex */}
      <div>
        <label htmlFor="email">Email</label>{' '}
        <input
          type="email"
          id="email"
          {...register(
            'gmail'
            // {
            //   required: {
            //     value: true,
            //     message: 'Trường này không được để trống!',
            //   },
            //   minLength: {
            //     value: 10,
            //     message: 'Email phải từ 10 đến 30 kí tự!',
            //   },
            //   maxLength: {
            //     value: 30,
            //     message: 'Email phải từ 10 đến 30 kí tự!',
            //   },
            //   pattern: {
            //     value:
            //       /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            //     message: 'Định dạng email không phù hợp!',
            //   },
            // }
          )}
        />
        {/* Hiện lỗi Email */}
        {errors.gmail && (
          <span className="text-red-500">{errors.gmail.message}</span>
        )}
      </div>

      {/* một cái button mà nằm trong cái tag form thì mặc định cái type của nó là submit => có nghĩa là nó mà click vào cái button thì nó sẽ submit cái form đó */}
      <button className="bg-cyan-500 text-white p-2 ml-10">Đăng nhập</button>
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
