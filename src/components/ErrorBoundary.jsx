import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }; // đầu tiền default value là false(không có lỗi nào hết)
  }

  // Sử dụng một cái lifecycle
  // life này sẽ đươc chạy khi có error xảy ra (error ở đây là của js về syntax hay gì đó)
  static getDerivedStateFromError(error) {
    // Khi có error xảy ra , cập nhật state cho biến error thành true
    return { hasError: true };
  }

  // có một lifecycle nữa là componentDidCatch`
  componentDidCatch(error, errorInfo) {
    // Thằng này chạy sau khi render
    // Thông thường dùng để gọi tới 1 services bên ngoài (sentry) để thông báo lỗi
    // Khi mà có lỗi thì nó sẽ notify về cho email, ... để mình biết là có lỗi xảy ra
  }
  render() {
    if (this.state.hasError) {
      // render ra fallback UI khi có error xảy ra làm crash App
      return <h1>Something went wrong.</h1>;
    }
    return (
      // Children là những thẻ nằm trong component này
      <>{this.props.children}</>
    );
  }
}
