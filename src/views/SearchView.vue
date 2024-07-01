<template>
  <div class="mx-auto container">
    <!-- Search bar -->
    <div class="border-solid border mt-5 max-w-md mx-auto relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
      <div class="grid place-items-center h-full w-12 text-gray-300 container">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </div>
      <input
        v-model="searchTerm"
        @input="handleInputChange"
        class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="Search something.."
      />
    </div>
    <!-- End of Search bar -->

    <div v-if="loading" class="mt-4 text-center">Loading...</div>
    <div v-if="error" class="mt-4 text-center text-red-500">{{ error }}</div>

    <!-- List of search results -->
    <div v-if="searchs.length > 0" class="mt-4 container mx-auto">
      <ul>
        <li>
          <div class="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div
              v-for="(book, index) in searchs"
              :key="index"
              class="rounded-lg overflow-hidden shadow-lg ring-1 ring-stone-400 ring-opacity-40"
            >
              <div class="relative">
                <img class="w-full" :src="book.image" alt="Product Image" />
                <div class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
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
                </div>
                <div class="flex justify-between space-x-2 text-sm">
                  <button class="bg-blue-500 hover:bg-blue-200 text-white py-1 rounded w-full">Buy Now</button>
                  <button class="bg-blue-500 hover:bg-blue-200 text-white py-1 rounded w-full">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!-- Pagination -->
      <pagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="handlePageChange"
      />
      <!-- End of Pagination -->
    </div>
    <!-- End of List of search results -->
  </div>
</template>

<script>
import Pagination from '@/components/PaginationWithApi.vue'; // Adjust the path as per your project structure
import { computed, ref, watch } from 'vue';
import { useSearchStore } from '@/stores/search'; // Assuming this is your Vuex/Pinia store

export default {
  components: {
    Pagination
  },
  setup() {
    const searchStore = useSearchStore();
    const searchTerm = ref('');
    const currentPage = ref(1);
    const perPage = ref(10); // Number of items per page

    // Method to handle input change
    const handleInputChange = () => {
      searchBooks();
    };

    // Method to handle page change
    const handlePageChange = (page) => {
      currentPage.value = page;
      searchBooks();
    };

    // Computed properties
    const totalPages = computed(() => Math.ceil(searchStore.total / perPage.value));

    // Method to trigger search
    const searchBooks = () => {
      if (searchTerm.value.trim() !== '') {
        searchStore.getSearchBook(searchTerm.value, currentPage.value, perPage.value);
      }
    };

    // Watch currentPage for changes
    // watch(currentPage, () => {
    //   searchBooks();
    // });

    return {
      searchTerm,
      searchs: computed(() => searchStore.searchs),
      loading: computed(() => searchStore.loading),
      error: computed(() => searchStore.error),
      currentPage,
      totalPages,
      handlePageChange,
      handleInputChange
    };
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
