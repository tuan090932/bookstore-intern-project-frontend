<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-gray-900">Profile</h2>
      <div class="mb-4" v-if="user">
        <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <p
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {{ user.name }}
        </p>
      </div>
      <div class="mb-4" v-if="user">
        <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <p
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {{ user.email }}
        </p>
      </div>
      <div v-else>
        <p class="text-red-500">User information not found. Please log in.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  computed: {
    user() {
      return useUserStore().user
    }
  }
}
</script>
