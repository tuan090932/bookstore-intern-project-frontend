<template>
  <ValidationForm @submit="handleUpdate">
    <!-- Name -->
    <div class="mb-4">
      <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
      <Field
        name="name"
        type="text"
        id="name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Name"
        rules="required|min:3|max:50"
        v-model="form.name"
      />
      <ErrorMessage name="name" class="text-red-500 text-xs mt-1"/>
      <div v-if="errors.nameError" class="mt-4 text-red-500">{{ errors.nameError}}</div>

    </div>

    <!-- User Name -->
    <div class="mb-4">
      <label for="user_name" class="block text-gray-700 text-sm font-bold mb-2">User Name</label>
      <Field
        name="user_name"
        type="text"
        id="user_name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="User Name"
        rules="required|min:3|max:50"
        v-model="form.user_name"
      />
      <ErrorMessage name="user_name" class="text-red-500 text-xs mt-1"/>
      <div v-if="errors.userNameError" class="mt-4 text-red-500">{{ errors.userNameError }}</div>
    </div>

    <!-- Email -->
    <div class="mb-4">
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <Field
        name="email"
        type="email"
        id="email"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Email"
        rules="required|email|max:50"
        v-model="form.email"
      />
      <ErrorMessage name="email" class="text-red-500 text-xs mt-1"/>
      <div v-if="errors.emailError" class="mt-4 text-red-500">{{ errors.emailError }}</div>
    </div>

    <!-- Phone Number -->
    <div class="mb-4">
      <label for="phone_number" class="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
      <Field
        name="phone_number"
        type="text"
        id="phone_number"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Phone Number"
        rules="required|numeric|min:10|max:11"
        v-model="form.phone_number"
      />
      <ErrorMessage name="phone_number" class="text-red-500 text-xs mt-1"/>
      <div v-if="errors.phoneNumberError" class="mt-4 text-red-500">{{ errors.phoneNumberError }} </div>
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
  </ValidationForm>
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
    handleUpdate(values) {
      const updateData = {
        name: values.name,
        user_name: values.user_name,
        email: values.email,
        phone_number: values.phone_number
      }
      this.$emit('update', updateData)
    }
  }
}
</script>
