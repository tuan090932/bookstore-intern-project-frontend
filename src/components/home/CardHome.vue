<template>
  <div class="container mx-auto mt-20">
    <h1 class="text-2xl font-bold mb-4 text-center">Our Book</h1>
    <p class="mb-8 text-center">The website always provides the newest and fastest Book</p>
    <div v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</div>
    <div v-else>
      <div class="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div
          v-for="book in books"
          :key="book.id"
          class="rounded-lg overflow-hidden shadow-lg ring-1 ring-stone-400 ring-opacity-40"
        >
          <div class="relative">
            <img class="w-full" :src="book.image" alt="Product Image" />
            <div
              class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium"
            >
              SALE
            </div>
          </div>
          <div class="p-4 flex flex-col justify-between">
            <div>
              <router-link :to="{ name: 'bookDetail', params: { id: book.book_id } }"> 
                <h3 class="text-lg font-medium mb-2 line-clamp-1">{{ book.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ book.description }}</p>
              </router-link>
            </div>
            <div class="flex items-center justify-between mb-4">
              <span class="font-bold text-lg">{{ book.price }}</span>
              <IconAddFavorite :bookId="book.book_id" />
            </div>
            <div class="flex justify-between space-x-2 text-sm">
              <button class="bg-blue-500 hover:bg-blue-200 text-white py-1 rounded w-full">
                Buy Now
              </button>
              <button class="bg-blue-500 hover:bg-blue-200 text-white py-1 rounded w-full">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-center mt-8">
        <button
          class="bg-gray-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-l"
          :disabled="currentPage === 1"
          @click="goToFirstPage"
        >
          <font-awesome-icon :icon="['fas', 'angles-left']" />
        </button>
        <button
          class="bg-gray-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4"
          :disabled="currentPage === 1"
          @click="goToPreviousPage"
        >
          <font-awesome-icon :icon="['fas', 'angle-left']" />
        </button>

        <!-- Page numbers -->
        <template v-for="page in totalPages" :key="page">
          <button
            v-if="isWithinRange(page)"
            :class="['bg-gray-100 hover:bg-blue-200 font-bold py-2 px-4', { 'bg-blue-200': currentPage === page }]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </template>

        <button
          class="bg-gray-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4"
          :disabled="currentPage === totalPages"
          @click="goToNextPage"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
        <button
          class="bg-gray-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-r"
          :disabled="currentPage === totalPages"
          @click="goToLastPage"
        >
          <font-awesome-icon :icon="['fas', 'angles-right']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import bookService from '@/services/book.service';
import IconAddFavorite from '@/components/favorite/IconAddFavorite.vue';

export default {
  data() {
    return {
      allBooks: [], 
      books: [], 
      errorMessage: '',
      perPage: 10, 
      currentPage: 1, 
      totalPages: 0 
    };
  },
  components: {
    IconAddFavorite
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    /**
     * Get all books from the server
     */
    getBooks() {
      bookService.getAllBooks()
        .then((response) => {
          this.allBooks = response;
          this.totalPages = Math.ceil(this.allBooks.length / this.perPage);
          this.updatePagedBooks();
        })
        .catch((error) => {
          console.error('Error fetching books:', error);
        });
    },

    /**
     * Update the list of books to display on the current page
     */
    updatePagedBooks() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      this.books = this.allBooks.slice(startIndex, endIndex);
    },

    /**
     * Check if a page number is within the range of visible page numbers
     */
    isWithinRange(page) {
      const rangeStart = Math.max(1, this.currentPage - 2);
      const rangeEnd = Math.min(this.totalPages, this.currentPage + 2);
      return page >= rangeStart && page <= rangeEnd;
    },

    /**
     * Go to the first page
     */
    goToFirstPage() {
      this.currentPage = 1;
      this.updatePagedBooks();
    },

    /**
     * Go to the last page
     */
    goToLastPage() {
      this.currentPage = this.totalPages;
      this.updatePagedBooks();
    },

    /**
     * Go to the next page
     */
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePagedBooks();
      }
    },

    /**
     * Go to the previous page
     */
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePagedBooks();
      }
    },

    /**
     * Go to a specific page
     */
    goToPage(page) {
      this.currentPage = page;
      this.updatePagedBooks();
    }
  }
};
</script>

<style scoped>
/* CSS để giới hạn chiều dài tiêu đề và mô tả */

/* Thêm các CSS khác nếu cần */
</style>
