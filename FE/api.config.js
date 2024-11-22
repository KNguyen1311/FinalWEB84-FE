const API_BASE_URL = "http://localhost:3000/api"; // URL của backend

// Hàm gọi API đăng nhập
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data.token; // Giả sử server trả về token
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Hàm gọi API lấy danh sách vị trí giáo viên
export const getTeacherPositions = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teacher-positions/list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch teacher positions');
    }

    const data = await response.json();
    return data.positions; // Giả sử server trả về danh sách các vị trí
  } catch (error) {
    console.error('Error fetching teacher positions:', error);
    throw error;
  }
};