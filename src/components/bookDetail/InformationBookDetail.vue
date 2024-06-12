<template>
  <div class="bg-gray-100 dark:bg-gray-800 py-8">
    <div v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="px-4">
          <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
            <img class="w-full h-full object-cover" :src="book.image" alt="Product Image" />
          </div>
          <div class="grid grid-cols-1 mb-4">
            <div>
              <button
                class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div class="px-4">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{{ book.title }}</h2>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {{ book.description }}
          </p>
          <div class="mb-4">
            <div class="mb-2">
              <span class="font-bold text-gray-700 dark:text-gray-300">Price:</span>
              <span class="text-gray-600 dark:text-gray-300">{{ formatPrice(book.price) }}</span>
            </div>
            <div class="mb-2">
              <span class="font-bold text-gray-700 dark:text-gray-300">Stock:</span>
              <span class="text-gray-600 dark:text-gray-300">{{ book.stock }}</span>
            </div>
            <div class="mb-2">
              <span class="font-bold text-gray-700 dark:text-gray-300">Number of Pages:</span>
              <span class="text-gray-600 dark:text-gray-300">{{ book.num_pages }}</span>
            </div>
          </div>
          <div>
            <span class="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
            <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">{{ book.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      book: {
        title: '',
        description: '',
        image: '',
        price: 0,
        stock: 0,
        num_pages: 0
      },
      errorMessage: ''
    }
  },
  mounted() {
    this.getBookDetails()
  },
  methods: {
    getBookDetails() {
      const bookId = this.$route.params.id

      axios
        .get(`http://localhost/api/books/${bookId}`)
        .then((response) => {
          if (Object.keys(response.data).length === 0) {
            this.errorMessage = 'This book does not exist'
          } else {
            this.book = response.data
          }
        })
        .catch(() => {
          this.errorMessage = 'Error fetching book details'
        })
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    }
  }
}
</script>

<style scoped>
/* Add any specific CSS styles if needed */
</style>
