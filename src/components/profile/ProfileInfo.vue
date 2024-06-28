<template>
  <!-- components/profile/ProfileInfo.vue -->
  <div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
      <p
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {{ user.name || 'Not yet declared ...' }}
      </p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">User Name</label>
      <p
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {{ user.user_name || 'Not yet declared ...' }}
      </p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <p
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {{ user.email || 'Not yet declared ...' }}
      </p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
      <p
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {{ user.phone_number || 'Not yet declared ...' }}
      </p>
    </div>
    <address-view/>
    <button
      @click="$emit('edit')"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Edit Profile
    </button>
    <button
      @click="$emit('change-password')"
      class="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >Change Password</button>
  </div>
</template>

<script>
import AddressView from '@/components/profile/AddressView.vue'
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    AddressView
  }
}
</script>
