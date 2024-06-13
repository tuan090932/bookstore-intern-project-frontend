import axios from 'axios'

const API_URL = 'http://localhost/api/user'

const updateUser = (userId, userData) => {
  return axios.put(`${API_URL}/update/${userId}`, userData)
}

export default {
  updateUser
}
