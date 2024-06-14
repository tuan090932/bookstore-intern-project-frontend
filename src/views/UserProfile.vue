<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-gray-900">Profile</h2>
      <div v-if="user">
        <ProfileInfo v-if="!editing" :user="user" @edit="startEditing" />
        <ProfileEditForm
          v-else
          :user="user"
          @cancel="cancelEditing"
          @update="updateUser"
          :errors="errors"
        />
      </div>
      <div v-else>
        <p class="text-red-500">User information not found. Please log in.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import userService from '@/services/user.service'
import ProfileInfo from '@/components/profile/ProfileInfo.vue'
import ProfileEditForm from '@/components/profile/ProfileEditForm.vue'

export default {
  components: {
    ProfileInfo,
    ProfileEditForm
  },
  computed: {
    user() {
      return useUserStore().user
    }
  },
  data() {
    return {
      editing: false,
      errors: {
        nameError: '',
        emailError: '',
        userNameError: '',
        phoneNumberError: '',
        passwordError: '',
        oldPasswordError: '',
        generalError: ''
      }
    }
  },
  methods: {
    startEditing() {
      this.editing = true
    },
    cancelEditing() {
      this.editing = false
      this.clearErrors()
    },
    async updateUser(userData) {
      this.clearErrors()
      try {
        const response = await userService.updateUser(this.user.id, userData)
        useUserStore().setUser(response.data)
        console.log('User updated successfully.')
        this.editing = false
      } catch (error) {
        if (error.response && error.response.data) {
          const messages = error.response.data.errors
          if (error.response.data.old_password) {
            this.errors.oldPasswordError = error.response.data.old_password
            console.log('Old password error:', this.errors.oldPasswordError)
          }
          this.errors = {
            nameError: messages.name ? messages.name[0] : '',
            userNameError: messages.user_name ? messages.user_name[0] : '',
            emailError: messages.email ? messages.email[0] : '',
            phoneNumberError: messages.phone_number ? messages.phone_number[0] : '',
            passwordError: messages.password ? messages.password[0] : '',
            oldPasswordError: messages.old_password ? messages.old_password[0] : '',
            generalError: messages.error || ''
          }
        } else {
          this.errors.generalError = 'An unexpected error occurred.'
        }
        console.error('An error occurred while updating user information:', error)
      }
    },
    clearErrors() {
      this.errors = {
        nameError: '',
        emailError: '',
        userNameError: '',
        phoneNumberError: '',
        passwordError: '',
        oldPasswordError: '',
        generalError: ''
      }
    }
  }
}
</script>
