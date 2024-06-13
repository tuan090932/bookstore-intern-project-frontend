import axios from 'axios'

const API_URL = 'http://localhost/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
    // Thêm các header mặc định khác ở đây
  }
})

// Tùy chọn: Thêm interceptor để xử lý lỗi toàn cục
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi toàn cục ở đây
    return Promise.reject(error)
  }
)

export default api
