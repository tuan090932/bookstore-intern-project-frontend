<template>
  <div class="m-2 border-b-4 border-indigo-500 pb-3">
    <h2 class="text-center text-lg font-bold my-2">Edit Address Form</h2>
    <ValidationForm @submit="submitForm" >

      <!-- Shipping Address -->
      <div class="mb-4">
        <label for="shipping_address" class="block text-gray-700 text-sm font-bold mb-2">Shipping Address:</label>
        <Field name="shipping_address" id="shipping_address" v-model="form.shipping_address" rules="required"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <ErrorMessage name="shipping_address" class="text-red-500 text-xs italic" />
      </div>

      <!-- City -->
      <div class="mb-4">
        <label for="city" class="block text-gray-700 text-sm font-bold mb-2">City:</label>
        <Field name="city" id="city" v-model="form.city" rules="required"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <ErrorMessage name="city" class="text-red-500 text-xs italic" />
      </div>

      <!-- Country -->
      <div class="mb-4">
        <label for="country_name" class="block text-gray-700 text-sm font-bold mb-2">Country:</label>
        <Field name="country_name" id="country_name" v-model="form.country_name" rules="required"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <ErrorMessage name="country_name" class="text-red-500 text-xs italic" />
      </div>

      <!-- Submit and Cancel Buttons -->
      <div class="flex justify-between">
        <button type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
        <button type="button" @click="cancelForm"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Cancel
        </button>
      </div>
    </ValidationForm>
  </div>
</template>

<script>
import { useAddressStore } from '@/stores/address';

export default {
  props: {
    address: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        // Initialize the form with the address data
        shipping_address: this.address.shipping_address || '',
        city: this.address.city || '',
        country_name: this.address.country_name || ''
      }
    };
  },
  methods: {
    // Method to submit the form
    async submitForm() {
      const addressStore = useAddressStore();
      try {
        // Update the address
        await addressStore.updateAddress(this.address.address_id, this.form);
        console.log('Address updated successfully');
        this.$emit('address-updated', this.form); // Emit the event to the parent component
        this.$emit('close');
      } catch (error) {
        console.error('Error updating address:', error);
      }
    },
    cancelForm() {
      this.$emit('close');
    }
  }
};
</script>

<style>
/* Add your component-specific styles here if needed */
</style>
