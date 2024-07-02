<template>
  <button class="bg-blue-500 hover:bg-blue-200 text-white py-1 rounded w-full" @click="addToCart">
    Add to Cart
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
  // Add the addToCart method
  methods: {
    async addToCart() {
      const cartStore = useCartStore();
      await cartStore.addCartItem(this.bookId);
    }
  }
};
</script>
