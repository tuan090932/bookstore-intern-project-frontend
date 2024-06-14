<template>
  <div class="min-h-screen flex items-center justify-center w-full bg-gray-100">
    <div class="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
      <h1 class="text-2xl font-bold text-center mb-4 text-gray-900">Welcome Back!</h1>
      <div v-if="errorMessage" class="mb-4 text-red-500">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="handleSubmit">

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2"
            >Email Address</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="your@email.com"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-4 relative">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2"
            >Password</label
          >
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
          </button>
          <a
            href="#"
            class="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Forgot Password?</a
          >
        </div>

        <!-- Remember me -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="remember"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
              checked
            />
            <label for="remember" class="ml-2 block text-sm text-gray-700">Remember me</label>
          </div>
          <router-link
            to="/register"
            class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Create Account</router-link
          >
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/auth.service'
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      errorMessage: ''
    }
  },
  computed: {
    userStore() {
      return useUserStore()
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    async handleSubmit() {
      if (this.email && this.password) {
        try {
          const response = await AuthService.login(this.email, this.password)
          const token = response.access_token
          this.userStore.setToken(token)
          console.log('Login success!')
          await this.getUserProfile(token)
          this.$router.push('/profile')
        } catch (error) {
          this.errorMessage = 'Email or password is incorrect'
        }
      } else {
        this.errorMessage = 'Please enter email and password'
      }
    },
    async getUserProfile(token) {
      try {
        const user = await AuthService.getProfile(token)
        this.userStore.setUser(user)
      } catch (error) {
        console.error('Failed to fetch user profile:', error)
      }
    }
  },
}
</script>

<style>
input[type='password']::-ms-reveal,
input[type='password']::-ms-clear {
  display: none;
}
</style>
