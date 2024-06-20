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

    // Handle global errors here
    switch (status) {
      case 401:
        console.log('Unauthorized access', status)
        alert('You are not authorized to access this. Please log in again.')
        userStore.clearUser()
        router.push('/login')
        break
      case 403:
        console.log('Forbidden access', status)
        alert('You do not have permission to access this.')
        break
      case 400:
        console.log('Bad request', status)
        alert('The request was invalid. Please check your input.')
        break
      case 404:
        console.log('Not found', status)
        alert('The requested resource was not found.')
        break
      case 409:
        console.log('Conflict', status)
        alert('There was a conflict with your request.')
        break
      case 422:
        console.log('Unprocessable entity', status)
        alert('The request was well-formed but was unable to be followed due to semantic errors.')
        break
      default:
        console.log('Server error', status)
        alert('An unexpected error occurred. Please try again later.')
        break
    }

    return Promise.reject(error)
  }
)

export default api
