import axios from 'axios'

const API_URL = 'http://localhost/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
    // Add any other headers here
  }
})

// Add a request interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors
    return Promise.reject(error)
  }
)

export default api
