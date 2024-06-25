import axios from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router/index'

const api = axios.create({
  baseURL: 'http://localhost/api/',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
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

    switch (status) {
      case 401:
        alert('You are not authorized to access this or session has ended. Please log in again.')
        userStore.clearUser()
        router.push('/login')
        break
      case 403:
        alert('You are forbidden to access this resource.')
        break
      case 411:
        alert('Your login session has ended, please log in again.')
        userStore.clearUser()
        router.push('/login')
        break
      default:
        // Handle other errors or statuses as needed
        break
    }

    return Promise.reject(error)
  }
)


export default api