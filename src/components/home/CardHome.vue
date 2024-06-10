<template>
  <div class="container mx-auto mt-20">
    <h1 class="text-2xl font-bold mb-4 text-center">Our Book</h1>
    <p class="mb-8 text-center">The website always provides the newest and fastest Book</p>
    <div class="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <div
        v-for="book in books"
        :key="book.id"
        class="rounded-lg overflow-hidden shadow-lg ring-1 ring-stone-400 ring-opacity-40"
      >
        <div class="relative">
          <img class="w-full" :src="book.image" alt="Product Image"/>
          <div
            class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium"
          >
            SALE
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-medium mb-2">{{ book.title }}</h3>
          <p class="text-gray-600 text-sm mb-4">{{ book.description }}</p>
          <div class="flex books-center justify-between">
            <span class="font-bold text-lg">{{ book.price }}</span>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: []
    }
  },
  mounted() {
    this.fetchBooks()
  },
  methods: {
    /**
     * Fetches a list of books from the API.
     */
    fetchBooks() {
      fetch('http://localhost/api/books')
        .then((response) => response.json())
        .then((data) => {
          this.books = data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
/* Nếu bạn cần bất kỳ kiểu CSS tùy chỉnh nào, hãy thêm vào đây */
</style>
