import React from "react";
import { useForm } from "react-hook-form";

const AddMovie = () => {
  // register là những giá trị mặc định mà mình đã set trong hook form(default value)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      // maNhom: "GP01",
      ngayKhoiChieu: "",
      // sapChieu: '',
      // dangChieu: '',
      // hot: '',
      trailer: "",
      hinhAnh: "",
    },
  });

  const onSubmit = (values) => {
    console.log("values", values);
  };


  const handleChangeImage = () => {}
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Tên phim</label>
        <input type="text" id="name" {...register("tenPhim")} />
      </div>

      <div>
        <label htmlFor="code">Bí danh</label>
        <input type="text" id="code" {...register("biDanh")} />
      </div>

      <div>
        <label htmlFor="desc">Mô tả</label>
        <textarea id="desc" {...register("moTa")} />
      </div>

      <div>
        <label htmlFor="startDate">Ngày khởi chiếu</label>
        <input type="date" id="startDate" {...register("ngayKhoiChieu")} />
      </div>

      {/* Trailer thường sẽ là định dạng text, người ta sẽ thêm cái link đường dẫn trailer vào trong cái source */}
      <div>
        <label htmlFor="trailer">Trailer</label>
        <input type="text" id="trailer" {...register("trailer")} />
      </div>

      {/* Trước đây khi mà sử dụng formik thì cái values của đinh dạng file khi mà người dùng lấy thì nó không phải là định dạng fileList, lúc trước khi lấy ra thì nó là một String nó chứa filePath là caí url(cái đường dẫn của folder chứa trong máy tính của mình -> nhưng cái đó thì chúng ta không cần cái chúng ta cần là định dạng fileList)
      Trong đó chứa một số thông tin cấu thành lên file nhị phân(file hình ảnh), thì mình cần cái định dạng này để gửi trực tiếp file lên server 
      Nhưng mà sau này khi mà không dùng thư viện thì chúng ta phải viết hàm handleChange cho nó
      */}
      <div>
        <label htmlFor="image">Image</label>
        {/* <input type="file" id="image" {...register("hinhAnh")} /> */}
        <input type="file" id="image" onChange={handleChangeImage} />
      </div>

      <buttom type="">Submit</buttom>
    </form>
  );
};

export default AddMovie;
