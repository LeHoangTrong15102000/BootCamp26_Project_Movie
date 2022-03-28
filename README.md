# Movie Project


### Structure
- src
    - components:
        - Chứa các common component dùng chung cho toàn bộ ứng dụng: Button, Card, Modal, Input, ...
        - Thông thường các component này sẽ không liên quan đến business logic của Project. Eg: không có side effect, không kết nối với redux
    - modules: Có thể là 1 chức năng hoặc là 1 page
        -Home: module-name
            - components: Chứa các component chỉ sử dụng trong module, có thể chứa business logic của project: side effect, redux
            - pages: Chứa các component là 1 page cụ thể
            - actions: chứa redux actions
            - constants: chứa redux actions types, Chứa những biến constants sử dụng trong module
            - reducers: Chứa redux reducers
    - hooks: Chứa các custom hook mình tự viết để sử dụng trong project
    - services/ apis:
        - Cấu hình phương thức gọi API(axios, fetch)
        - Chứa các tác vụ liên quan đến gọi API
    - utils: Chứa các common function của js dùng chung cho ứng dụng
        - array.js: Chứa các hàm làm việc với array
        - string.js: Chứa các hàm làm việc với string
    - styles: Chứa các file css/scss


### Library
- redux, react-redux, redux-thunk: quản lí global state
- react-router-dom: quản lí rounting
- axios: call API 
- react-bootstrap/material-ui/ant-design/mantine,.... UI component
- Nếu sử dụng material-ui && mantine thì nên sử dụng chung với styled component JSS