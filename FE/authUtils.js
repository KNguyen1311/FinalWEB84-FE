import jwtDecode from 'jwt-decode';

export const isTokenExpired = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decoded = jwtDecode(token); // Giải mã token để lấy thông tin payload
      const expirationTime = decoded.exp * 1000; // Lấy thời gian hết hạn và chuyển sang milliseconds
      const currentTime = Date.now(); // Lấy thời gian hiện tại
  
      // Kiểm tra nếu token đã hết hạn
      if (currentTime > expirationTime) {
        console.log("Token has expired");
        return true; // Token đã hết hạn
      } else {
        console.log("Token is valid");
        return false; // Token hợp lệ
      }
    } else {
      console.log("No token found");
      return true; // Không có token trong localStorage
    }
  };
  
  // Hàm để lấy token từ localStorage
  export const getToken = () => {
    return localStorage.getItem('jwt');
  };