<template>
    <form @submit.prevent="handleChangePassword">
      <!-- Old Password -->
      <label for="old_password" class="block text-gray-700 text-sm font-bold mb-2">
        Old Password
      </label>
      <div class="relative mb-4">
        <input
          v-model="form.old_password"
          :type="showOldPassword ? 'text' : 'password'"
          id="old_password"
          name="old_password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Old Password"
        />
        <span
          class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          @click="showOldPassword = !showOldPassword"
        >
          <font-awesome-icon :icon="showOldPassword ? 'eye-slash' : 'eye'" />
        </span>
      </div>
      <div v-if="errors.oldPasswordError" class="text-red-500 text-xs mt-1">
        {{ errors.oldPasswordError }}
      </div>
  
      <!-- New Password -->
      <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
        New Password
      </label>
      <div class="relative mb-4">
        <input
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          name="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="New Password"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
        </button>
      </div>
      <div v-if="errors.passwordError" class="text-red-500 text-xs mt-1">
        {{ errors.passwordError }}
      </div>
  
      <!-- Submit and Cancel Buttons -->
      <div class="flex items-center justify-between mt-4">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Change Password
        </button>
        <button
          @click="$emit('cancel')"
          type="button"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
  
      <!-- General Error -->
      <div v-if="errors.generalError" class="mt-4 text-red-500">{{ errors.generalError }}</div>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      errors: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        form: {
          password: '',
          old_password: ''
        },
        showPassword: false,
        showOldPassword: false
      }
    },
    methods: {
      handleChangePassword() {
        const changePasswordData = {
          password: this.form.password,
          old_password: this.form.old_password
        }
        this.$emit('change-password', changePasswordData)
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
  