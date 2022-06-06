// Làm việc với form thì cái khó nhất chính là validation form đó

// Khi mà submit cái form thì cũng phải duyệt qua tất cả các ô input xem có ô nào lỗi ko để hiển thị ra cho người dùng thấy
// Nên thông thường ít ai mà tự xử lý các validation của form cả người ta sẽ sử dụng thư viện của react hỗ trợ làm việc với form một cách nhanh chống.
// Thì một trong những libary người ta hay sử dụng là formik và gần đây react cho ra mất hooks mới để hỗ trợ trong việc xây dựng form là react hook form
//        - Thằng formik thì về cơ bản nó vẫn sử dụng cơ chế state để quản lí các ô input
//        - Ưu điểm của react hook form là nó dựa vào cơ chế ref để quản lí form

// ******************************************** -
// * * * * * * * * * *                          - Thì thầng useForm nó sẽ có tham số đầu tiên chính là thằng defaultValue: {}
// - Thì thằng useForm nó sẽ trả về cho chúng ta một hàm là register và một hàm là handleSubmit,
// - Khi sử dụng useForm thì cái name , value , onBlur, onChange là không cần thiết vì thư viện sẽ handle việc cho mình. Thì để mà lấy giá trị được của nó thì trong ô input ta truyền vào {...register("tên của ô input đó")}
// - Lúc trước khi thao tác với onSubmit thì phải gọi sự kiện ngăn chặn trình duyệt load lại trang thì khi mà sử dụng react-hook-form nó tự xử lý điều đó cho mình, t hằng react hook form dùng cơ chế ref nên nó quản lí việc re-render khá là tốt => tăng cái performent lên cho cái app của mình
// - Xử lý validation cho ô input thì cũng viết nó bên trong hàm {...register}, tham số thứ 2 của thz register là Option chứa các validation mà chúng ta muốn
/**
 *          - Ví dụ chúng ta muốn validate là required thì phải có key required
 *          - // Required: true là cái validation mặc định luôn , ô input phải có giá trị thì nó mới pass,  còn không có giá trị thì nó ko pass, nó sẽ tự động focus vào ô input có lỗi xảy ra luôn
 *          - Thì để hiển thị lỗi ra cho n gười dùng thấy thì trong phần useForm nó có 1 tham số nữa là formState: {errors} , trong formState chứa 1 object là cái key errors của chúng ta giúp kiểm tra lỗi của từng ô input => mỗi lần có lỗi thì nó sẽ Re-render lại giao diện
 *          - Trong usaForm nó  có một hàm là "mode" thì mặc định mode chứa giá trị là onSubmit có nghĩa là khi mình submit rồi thì nó mới đi nó validation cho mình
 *                  + onTouched trong mode là sự kiện kết hợp giữa onChange và onBlur
 *          - Trong cái tham số thứ 2 của required thì nó chứa key là min và max thường dùng cho ô input là number,  minLength và maxLength là độ dài của cái text của chúng ta, pattern thì ta sẽ truyền vào cái chuỗi reget . Nếu mà ô input của email khớp với chuỗi reget thì pass còn không thì sẽ sinh ra lỗi
 *          - Thì đó là cách sử dụng thứ 1 , nhưng cách thứ 1 gặp vấn đề là ko biết là đang bị lỗi gì để show ra cái message cho nó đúng
 *          - Do đó chúng ta sẽ thực hiện cách thứ 2
 *          - Hướng dẫn thêm 1 cách nữa để validate cho form => đó là schemas validation hỗ trợ tương tác với một số thư viện
 *
 *          - Cài đặt thư viện hookform/yup vào và định nghĩa validate schema cho component.
 *                - Nếu kiểu dữ liệu là string thì chỉ cần chấm min() thì nó sẽ so độ dàis
 *                - Trong useForm có chứa cái key là resolvers
 * 
            - Khi mà không có cái resolver thì nó sẽ validate bằng tham số thứ 2 của hàm required
            - Khi mà đã có schema thì ko cần tham số thứ 2 của hàm required nữa

      - Tiếp theo cũng là một phần khá quan trọng khi sử dụng với react-hook-form, kĩ thuật composition là tạo ra những UI component, để mà khi chỉ gọi cái component đó ra thì ta đã có được nội dung bên trong của component đó(bằng cách truyền thêm props cho nó).   
      - Muốn validations cho hàm inputText custom thì chỉ cần truyền vào ở tham số thứ 2 của register
      - Call APi cho phần Authentication


      - Tuy nhiên có một trường hợp đặc biệt khác nữa, chính là khi mà chúng ta sử dụng những lib component ui bên ngoài không phải component do chúng ta tạo ra , thì cái component bên ngoài nó không có hỗ trợ cái props là register
      - Thì thằng hook form nó mới tạo ra cho chúng ta thêm một cách nữa để tương tác với thư viện bên ngoài, sử dụng thư viện bên ngoài để biết hook form tương tác với thư viện bên ngoài như thế nào
      - Tương tác trực tiếp giữa Library UI với react hook form, thì chúng ta sẽ sử dụng nó thông qua thằng Controller component
      - Thì Controller đầu tiền cần cho nó một cái name, thì ở trong useForm gọi thêm một cái function nữa là control, thằng register dùng cho những thẻ input bình thường, còn khi dùng UI component thì mình sử dụng hàm control
      - Props thứ 3 của thz Controller là render() nó nhận vào 1 callBack function và nó return về Component Input mà mình muốn sử dụng, thì ở trong cái callBack nó sẽ cung cấp 2 cái params là field và formState,
            - Field nó cung cấp cho chúng ta những thứ như là value ô Input, hàm onChange , onBlur của ô Input 
            - Field và formState chỉ chứa duy nhất cho một mình thằng thuộc tính chưa nó mà thôi => thì mình cần nên xem cái component đó sử dụng như thế nào để mình đưa vào sử dụng
            - TextInput của thằng mantine có thể truyền vào các giá trị như là value, hàm onChange, hàm onBlur, thì những hàm noChange, onBlur, value nó đã nằm trong object field
            - Thì nó hiển thị errors như thế nào khi mà UI component "TextInput" nó có một props là errors thì mình sẽ sử dụng fieldState có sẵn trong react hook form để hiển thị lỗi của các ô input trong mantine UI,(thì những message lỗi phải được khai báo ở trong schema) 
            - Ngoai ra no con co trang thai la fieldState la trang thai cua cia truong do thoi
 *  */
