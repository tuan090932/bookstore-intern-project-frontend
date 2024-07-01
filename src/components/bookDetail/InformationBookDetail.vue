<template>
  <div class="bg-gray-100 py-8">
    <div v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="px-4">
          <div class="rounded-lg bg-gray-300 mb-4">
            <img class="w-full h-full object-cover" :src="book.image" alt="Book Image" />
          </div>
        </div>
        <div class="px-4">
          <h2 class="text-2xl font-bold text-gray-800-2">{{ book.title }}</h2>
          <div class="mb-4">
              <p class="text-red-600 text-4xl mb-5 font-bold">{{ $filters.formatNumber(book.price)}}đ</p>
            <div class="mb-2 flex">
              <span class="font-bold text-gray-700">Stock:</span>
              <p class="text-gray-600">{{ book.stock }}</p>
            </div>
            <div class="mb-2 flex">
              <span class="font-bold text-gray-700 ">Number of Pages:</span>
              <p class="text-gray-600">{{ book.num_pages }}</p>
            </div>
            <div class="mb-2 flex">
              <span class="font-bold text-gray-700">Authors:</span>
              <p class="text-gray-600">{{ book.authors.author_name }}</p>
            </div>
            <div class="mb-2 flex">
              <span class="font-bold text-gray-700">Publisher:</span>
              <p class="text-gray-600">{{ book.publishers.publisher_name }}</p>
            </div>
            <div class="mb-2 flex">
              <span class="font-bold text-gray-700">Category:</span>
              <p class="text-gray-600">{{ book.categories.category_name }}</p>
            </div>
          </div>
          <div>
            <span class="font-bold text-gray-700">Product Description:</span>
            <p class="text-gray-600 text-sm mt-2">{{ book.description }}</p>
          </div>
          <div class="flex items-center mt-4">
            <span class="font-bold text-gray-700">Quantity:</span>
            <button class="px-2 py-1 mx-2 border" @click="decreaseQuantity">-</button>
            <span>{{ quantity }}</span>
            <button class="px-2 py-1 mx-2 border" @click="increaseQuantity">+</button>
          </div>
          <div>
            <button
              class="mt-10 w-2/6 bg-blue-500 text-white p-2 rounded-full font-bold hover:bg-blue-600 flex items-center justify-center text-lg"
            >
              <font-awesome-icon :icon="['fas', 'cart-shopping']" />
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      quantity: 1
    };
  },
  methods: {

    // Increase and decrease quantity
    increaseQuantity() {
      this.quantity++;
    },

    // Decrease quantity
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
  }
}
</script>

<style scoped>
/* Add any specific CSS styles if needed */
</style>
