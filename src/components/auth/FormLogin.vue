<template>
  <div class="min-h-screen flex items-center justify-center w-full bg-gray-100">
    <div class="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
      <h1 class="text-2xl font-bold text-center mb-4 text-gray-900">Welcome Back!</h1>
      <form @submit.prevent="handleSubmit">
        <!-- Email or Username -->
        <div class="mb-4">
          <label for="emailOrUsername" class="block text-sm font-medium text-gray-700 mb-2"
            >Email Address or Username</label
          >
          <input
            v-model="emailOrUsername"
            type="text"
            id="emailOrUsername"
            class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="your@email.com or username"
            required
          />
          <div v-if="errors.emailOrUsername" class="mt-1 text-red-500 text-sm">
            {{ errors.emailOrUsername }}
          </div>
        </div>

        <!-- Password -->
        <div class="mb-4 relative">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div class="relative w-80">
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
          </div>
          <div v-if="errors.password" class="mt-1 text-red-500 text-sm w-80">
            {{ errors.password }}
          </div>
          <a
            href="#"
            class="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Forgot Password?
          </a>
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
      emailOrUsername: '',
      password: '',
      showPassword: false,
      errors: {
        emailOrUsername: '',
        password: ''
      }
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
    validatePassword(password) {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:'"\\|,.<>/?])(?=.*[a-z]).{6,}$/;
      return regex.test(password);
    },
    async handleSubmit() {
      this.clearErrors()
      
      if (!this.emailOrUsername) {
        this.errors.emailOrUsername = 'Please enter email or username'
      }
      
      if (!this.password) {
        this.errors.password = 'Please enter password'
      } else if (!this.validatePassword(this.password)) {
        this.errors.password = 'Password must include 1 uppercase, 1 number, 1 special character, and be 6+ characters long'
      }

      if (this.hasErrors()) {
        return
      }

      try {
        const response = await AuthService.login(this.emailOrUsername, this.password)
        const token = response.access_token
        this.userStore.setToken(token)
        console.log('Login success!')
        await this.getUserProfile(token)
        this.$router.push('/profile')
      } catch (error) {
        this.errors.emailOrUsername = 'Email or username and password is incorrect'
      }
    },
    clearErrors() {
      this.errors = {
        emailOrUsername: '',
        password: ''
      }
    },
    hasErrors() {
      return Object.values(this.errors).some(error => error !== '')
    },
    async getUserProfile(token) {
      try {
        const user = await AuthService.getProfile(token)
        this.userStore.setUser(user)
      } catch (error) {
        console.error('Failed to fetch user profile:', error)
      }
    }
  }
}
</script>

<style>
input[type='password']::-ms-reveal,
input[type='password']::-ms-clear {
  display: none;
}
</style>
