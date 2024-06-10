<template>
  <div class="min-h-screen flex items-center justify-center w-full bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 text-center">Register</h2>
      <form @submit.prevent="handleSubmit">
        <div v-if="errorMessage" class="mb-4 text-red-500">
          {{ errorMessage }}
        </div>

        <!-- Name -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your name"
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
            </button>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="confirmPassword"
              required
              class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 focus:outline-none"
            >
              <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
            </button>
          </div>
        </div>

        <!-- Register Button -->
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>

          <router-link
            to="/login"
            class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Đã có tài khoản? Đăng nhập</router-link
          >
        </div>
      </form>
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
      password: '',
      confirmPassword: '',
      errorMessage: '',
      showPassword: false // Add this variable to toggle password visibility
    }
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Mật khẩu không khớp.'
        return
      }

      try {
        const response = await axios.post('http://localhost/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword
        })

        console.log('Đăng ký thành công!', response.data)
        this.$router.push('/login')
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const errors = error.response.data
          if (errors.email) {
            this.errorMessage = 'Email đã tồn tại.'
          } else if (errors.password) {
            this.errorMessage = 'Mật khẩu phải chứa ít nhất 6 ký tự.'
          } else {
            this.errorMessage =
              'Có lỗi xảy ra trong quá trình đăng ký. Vui lòng kiểm tra lại thông tin.'
          }
        } else {
          this.errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại.'
        }
      }
    }
  }
}
</script>

<style scoped></style>
