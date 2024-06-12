<template>
  <div class="min-h-screen flex items-center justify-center w-full bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 text-center">Register</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Name -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your name"
          />
          <div v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</div>
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="text"
            id="email"
            v-model="email"
            @blur="validateEmail"
            class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
          <div v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</div>
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2"
            >Password</label
          >
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
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
          <div v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</div>
        </div>

        <!-- Confirm Password -->
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2"
            >Confirm Password</label
          >
          <div class="relative">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="confirmPassword"
              class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              <font-awesome-icon :icon="showConfirmPassword ? 'eye-slash' : 'eye'" />
            </button>
          </div>
          <div v-if="confirmPasswordError" class="text-red-500 text-sm mt-1">
            {{ confirmPasswordError }}
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
            Already have an account? Log in</router-link
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
      nameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      showPassword: false,
      showConfirmPassword: false // Separate variable for confirm password visibility
    }
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      if (!emailPattern.test(this.email)) {
        this.emailError = 'Invalid email address.'
      } else {
        this.emailError = ''
      }
    },
    async handleSubmit() {
      this.clearErrors()

      if (!this.email) {
        this.emailError = 'Email is required.'
        return
      }

      if (this.password !== this.confirmPassword) {
        this.confirmPasswordError = 'Passwords do not match.'
        return
      }

      try {
        const response = await axios.post('http://localhost/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword
        })

        console.log('Registration successful!', response.data)
        this.$router.push('/login')
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const errors = error.response.data
          if (errors.email) {
            this.emailError = 'Email already exists.'
          } else if (errors.password) {
            this.passwordError = 'Password must be at least 6 characters.'
          } else if (errors.name) {
            this.nameError = 'Name is required.'
          } else {
            this.errorMessage =
              'An error occurred during registration. Please check your information.'
          }
        } else {
          this.errorMessage = 'An error occurred. Please try again.'
        }
      }
    },
    clearErrors() {
      this.nameError = ''
      this.emailError = ''
      this.passwordError = ''
      this.confirmPasswordError = ''
    }
  }
}
</script>

<style scoped>
input[type='password']::-ms-reveal,
input[type='password']::-ms-clear {
  display: none;
}
</style>
