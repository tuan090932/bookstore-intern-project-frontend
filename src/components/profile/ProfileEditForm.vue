<template>
  <form @submit.prevent="handleUpdate">
    <!-- Name -->
    <div class="mb-4">
      <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
      <input
        v-model="form.name"
        type="text"
        id="name"
        name="name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Name"
      />
      <div v-if="errors.nameError" class="text-red-500 text-xs mt-1">{{ errors.nameError }}</div>
    </div>

    <!-- User Name -->
    <div class="mb-4">
      <label for="user_name" class="block text-gray-700 text-sm font-bold mb-2">User Name</label>
      <input
        v-model="form.user_name"
        type="text"
        id="user_name"
        name="user_name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="User Name"
      />
      <div v-if="errors.userNameError" class="text-red-500 text-xs mt-1">
        {{ errors.userNameError }}
      </div>
    </div>

    <!-- Email -->
    <div class="mb-4">
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <input
        v-model="form.email"
        type="email"
        id="email"
        name="email"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Email"
      />
      <div v-if="errors.emailError" class="text-red-500 text-xs mt-1">{{ errors.emailError }}</div>
    </div>

    <!-- Phone Number -->
    <div class="mb-4">
      <label for="phone_number" class="block text-gray-700 text-sm font-bold mb-2"
        >Phone Number</label
      >
      <input
        v-model="form.phone_number"
        type="text"
        id="phone_number"
        name="phone_number"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Phone Number"
      />
      <div v-if="errors.phoneNumberError" class="text-red-500 text-xs mt-1">
        {{ errors.phoneNumberError }}
      </div>
    </div>

    <!-- Submit and Cancel Buttons -->
    <div class="flex items-center justify-between mt-4">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update
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
    user: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: this.user.name || '',
        user_name: this.user.user_name || '',
        email: this.user.email || '',
        phone_number: this.user.phone_number || ''
      }
    }
  },
  methods: {
    handleUpdate() {
      const updateData = {
        name: this.form.name,
        user_name: this.form.user_name,
        email: this.form.email,
        phone_number: this.form.phone_number
      }
      this.$emit('update', updateData)
    }
  }
}
</script>
