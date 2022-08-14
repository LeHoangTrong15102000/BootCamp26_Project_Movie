import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector , useDispatch } from 'react-redux'

const AddMovie = (props) => {
  const dispatch = useDispatch();

  // register là những giá trị mặc định mà mình đã set trong hook form(default value)
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      tenPhim: '',
      biDanh: '',
      moTa: '',
      // maNhom: "GP01",
      ngayKhoiChieu: '',
      // sapChieu: '',
      // dangChieu: '',
      // hot: '',
      trailer: '',
      hinhAnh: '',
    },
  });

  const onSubmit = (values) => {
    console.log('values', values);
    // Do phía trung tâm chỉ cho phép upload 1 hình ảnh duy nhất
    const payload = {...values, hinhAnh: values.hinhAnh[0]}; //  Lấy ra hình ảnh thứ 0 của fileList hình ảnh

    // dispatch cái aciton để call API
  };

  // Xử lý thuộc tính image khi mà thư viện không hỗ trợ lấy ra giá trị fileList của form
  // const handleChangeImage = (event) => {
  //   // một số thư viện không hõ trợ thì nó sẽ lấy ra event.target.value
  //   console.log('value', event.target.value); // lấy ra cái đường dẫn url chứa file ảnh trong máy tính

  //   // Như vậy phải chuyển nó về file chuỗi sau đó đưa vào server và lấy ra lại định dạng jpg
  //   console.log('value', event.target.files); // Thông thường người ta sẽ lấy ra cái fileList này
  //   // Đối với những lib ko hỗ trợ để lấy ra cái fileList thì nó sẽ hỡ trợ function thay đổi thủ công cái data(function -> setValue để set lại biến)
  //   setValue('hinhAnh', event.target.files);

  //   // Nếu không sử dụng React Hook form mà sử dụng useState bình thường thì mình phải set lại Form cho thuộc tính hình ảnh
  //   // setForm(prevState =>  ({...prevState, hinhAnh: event.target.files}))
  // };
  
  // khi mà làm việc với File thì cái value mà nó gửi lên server

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Tên phim</label>
        <input type="text" id="name" {...register('tenPhim')} />
      </div>

      <div>
        <label htmlFor="code">Bí danh</label>
        <input type="text" id="code" {...register('biDanh')} />
      </div>

      <div>
        <label htmlFor="desc">Mô tả</label>
        <textarea id="desc" {...register('moTa')} />
      </div>

      <div>
        <label htmlFor="startDate">Ngày khởi chiếu</label>
        <input type="date" id="startDate" {...register('ngayKhoiChieu')} />
      </div>

      {/* Trailer thường sẽ là định dạng text, người ta sẽ thêm cái link đường dẫn trailer vào trong cái source */}
      <div>
        <label htmlFor="trailer">Trailer</label>
        <input type="text" id="trailer" {...register('trailer')} />
      </div>

      {/* Trước đây khi mà sử dụng formik thì cái values của đinh dạng file khi mà người dùng lấy thì nó không phải là định dạng fileList, lúc trước khi lấy ra thì nó là một String nó chứa filePath là caí url(cái đường dẫn của folder chứa trong máy tính của mình -> nhưng cái đó thì chúng ta không cần cái chúng ta cần là định dạng fileList)
      Trong đó chứa một số thông tin cấu thành lên file nhị phân(file hình ảnh), thì mình cần cái định dạng này để gửi trực tiếp file lên server 
      Nhưng mà sau này khi mà không dùng thư viện thì chúng ta phải viết hàm handleChange cho nó
      */}
      <div>
        <label htmlFor="image">Image</label>
        <input type="file" id="image" {...register('hinhAnh')} />
        {/* Cái input của file có thể chó phép người dùng upLoad multiple file => <input type multiple id /> */}
        {/* <input type="file" id="image" onChange={handleChangeImage} /> */}
      </div>

      {/* Kỹ thuật để có thể hiện thị hình ảnh ra bên ngoài để người dùng xem */}

      <buttom type="">Submit</buttom>
    </form>
  );
};

export default AddMovie;
