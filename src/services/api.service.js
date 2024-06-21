import axios from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router/index' // Import router for navigation
const api = axios.create({
  baseURL: 'http://localhost/api/'
})
api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.token
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const userStore = useUserStore()
    const status = error.response?.status || 500
    if (status === 401) {
      console.log('Unauthorized access', status)
      alert('You are not authorized to access this. Please log in again.')
      userStore.clearUser()
      router.push('/login')
    } else if (status === 411) {
      alert('Your login session has ended, please log in again.')
      userStore.clearUser()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
export default api
