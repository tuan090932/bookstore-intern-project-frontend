<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-gray-900">Profile</h2>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <p
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {{ name }}
        </p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <p
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {{ email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      email: '',
      errorMessage: ''
    }
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    getUserProfile() {
      const token = localStorage.getItem('access_token')
      if (token) {
        axios
          .get('http://localhost/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            console.log('User infor', response.data)
            this.name = response.data.name
            this.email = response.data.email
          })
          .catch((error) => {
            console.error('Error when get infor user:', error)
            this.errorMessage = 'Error when get infor user'
          })
      } else {
        this.errorMessage = 'Token not found. Please log in again.'
      }
    }
  }
}
</script>

<style scoped></style>
