<template>
    <div class="">
      <div class="flex">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-6">Other Titles by This Category</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div v-for="book in books" :key="book.id" class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <div class="relative">
            <img :src="book.image" alt="Book Image" class="w-full h-64 object-cover rounded-lg mb-4" />
          </div>
          <div class="flex item-center">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2 truncate max-w-xs">{{ book.title }}</h3>
          </div>
          <div>
            <span class="font-bold text-lg">{{ book.price }}</span>
          </div>

          <p class="text-gray-600 text-center relative group">
            {{ book.authors.author_name }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  
  export default {
    props: {
      books: {
        type: Array,
        required: true
      }
    },
    methods: {
      formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any specific CSS styles if needed */
  </style>
  