<template>
    <!-- Logout Button -->
    <button @click="handleLogout" class="mr-4">
      <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
    </button>
  </template>
  
  <script>
  import axios from 'axios'
  import { useUserStore } from '@/stores/user'
  
  export default {
    computed: {
      userStore() {
        return useUserStore()
      },
      user() {
        return this.userStore.user
      }
    },
    methods: {
      async handleLogout() {
        try {
          // Gửi request POST để đăng xuất người dùng
          await axios.post('http://localhost/api/auth/logout', {}, {
            headers: {
              Authorization: `Bearer ${this.userStore.token}`
            }
          })
          
          // Xóa token và dữ liệu người dùng khỏi local storage
          this.userStore.logout()
          
          // Chuyển hướng người dùng về trang đăng nhập
          this.$router.push('/login')
        } catch (error) {
          console.error('Failed to logout:', error)
        }
      }
    },
  }
  </script>
  
  <style>
  </style>
  