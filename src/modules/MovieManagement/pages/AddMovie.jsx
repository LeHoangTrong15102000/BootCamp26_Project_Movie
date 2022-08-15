import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

const AddMovie = (props) => {
  const [imgPreview, setImgPreview] = useState(''); // Default là null hay empty string đều được(như nhau)
  const dispatch = useDispatch();

  // register là những giá trị mặc định mà mình đã set trong hook form(default value)
  const { register, handleSubmit, setValue, watch, getValues } = useForm({
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
    const payload = { ...values, hinhAnh: values.hinhAnh[0] }; //  Lấy ra hình ảnh thứ 0 của fileList hình ảnh

    // dispatch cái aciton để call API
  };

  // Xử lý thuộc tính image khi mà thư viện không hỗ trợ lấy ra giá trị fileList của form
  const handleChangeImage = (event) => {
    // một số thư viện không hõ trợ thì nó sẽ lấy ra event.target.value
    console.log('value', event.target.value); // lấy ra cái đường dẫn url chứa file ảnh trong máy tính

    // Như vậy phải chuyển nó về file chuỗi sau đó đưa vào server và lấy ra lại định dạng jpg
    console.log('value', event.target.files); // Thông thường người ta sẽ lấy ra cái fileList này

    // Nếu mà không sử dụng thư viện để lấy ra fileList thì phải
    const file = event.target.files[0];
    if (!file) {
      return; // thì return lại null
    }
    // Đối với những lib ko hỗ trợ để lấy ra cái fileList thì nó sẽ hỡ trợ function thay đổi thủ công cái data(function -> setValue để set lại biến)
    setValue('hinhAnh', event.target.files); // setValue là hàm của React-hook-form
    // Nếu không sử dụng React Hook form mà sử dụng useState bình thường thì mình phải set lại Form cho thuộc tính hình ảnh
    // setForm(prevState =>  ({...prevState, hinhAnh: event.target.files}))

    // Hiển thị hình ảnh người chọn ra UI -> thì sử dụng định dạng là base64 nó sẽ là một chuỗi string, nhưng mà chuỗi string này có thể mô phỏng lại cái file nhị phân, và thằng browser cũng có thể đọc hiểu được định dạng base64
    // Đó sẽ là dụng kỹ thuật biến file nhị phân về định dạng base64 -> và sẽ đưa nó vào thuộc tính src của thẻ <img />
    const fileReader = new FileReader(); // Đây cũng là đối tượng của javascript, dùng để đọc định dạng file nhị phân trong javascript
    fileReader.readAsDataURL(file); // Phân tích cái file thành định dạng URL(chuỗi base64), vì fiel Reader là hàm bất đồng bộ không biết khi nào nó sẽ thành công hay thất bại vì nó phụ thuộc vào độ lớn của file đó
    // Nên cần có 1 cái callback là onload, nếu thành công thì nó sẽ gọi tới cái onload cho mình
    fileReader.onload = (event) => {
      // thành công thì gán lại cho setImgPreview
      setImgPreview(event.target.result);
    };
  };

  // khi mà làm việc với File thì cái value mà nó gửi lên server

  // Nếu mà dùng thủ công không cần đến hanldeChangeImage thì trong cái react-hook-form còn có thz watch
  // watch là theo dõi sự thay đổi của ô input nào đó
  const watchImage = watch('hinhAnh', false); // Cái variable watchImage thay đổi khi mà hình ảnh thay đổi
  // Phải có tham số thứ 2, nó sẽ bỏ qua cái lần đầu tiên
  // Phải sử dụng thêm useEffect để mà khi hình ảnh thay đổi thì nó sẽ thay đổi theo
  useEffect(() => {
    const file = getValues('hinhAnh')[0]; // phải lấy ra hình ảnh đầu tiên
    // Nếu mà không get được values của hinhAnh thì return lại null
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      setImgPreview(event.target.result);
    };
  }, [watchImage]);

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
        {imgPreview && <img src={imgPreview} alt="imgPreview" />}
      </div>

      {/* Kỹ thuật để có thể hiện thị hình ảnh ra bên ngoài để người dùng xem */}

      <button>Submit</button>
    </form>
  );
};

export default AddMovie;
