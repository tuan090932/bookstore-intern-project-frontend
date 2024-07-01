<template>
    <button class="bg-blue-500 hover:bg-blue-200 text-white py-1 rounded w-full" @click="deleteCartItem">
      Delete
    </button>
  </template>
  
  <script>
  import { useCartStore } from '@/stores/cart'; // Ensure you're importing the correct store
  
  export default {
    props: {
      bookId: {
        type: Number,
        required: true
      }
    },
    // Add the deleteCartItem method
    methods: {
      async deleteCartItem() {
        const cartStore = useCartStore(); 
        try {
          await cartStore.deleteCartItem(this.bookId);
        } catch (error) {
          console.error('Error adding book to cart:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any specific styles here if needed */
  </style>
  