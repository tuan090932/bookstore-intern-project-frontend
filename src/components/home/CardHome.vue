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
              <IconAddFavorite :bookId="book.book_id" :favorites="favorites" @updateFavorites="updateFavorites" />
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
      <Pagination
        :allElements="allBooks"
        :perPage="10"
        @updateElements="updateElements"
      />
    </div>
  </div>
</template> 

<script>
import favoriteService from '@/services/favorite.service';
import IconAddFavorite from '@/components/favorite/IconAddFavorite.vue';
import Pagination from '@/components/Pagination.vue'; 
import { useBookStore } from '@/stores/book';

export default {
  components: {
    IconAddFavorite,
    Pagination // Register the Pagination component
  },
  data() {
    return {
      books: [],
      favorites: [],
      errorMessage: '',
    };
  },
  computed: {
    allBooks() {
      const bookStore = useBookStore();
      return bookStore.getBooks();
    }
  },

  methods: {
    async fetchBooks() {
      const bookStore = useBookStore();
      try {
        await bookStore.fetchBooks();
      } catch (error) {
        console.error('Error fetching books:', error);
        this.errorMessage = 'Error fetching books';
      }
    },
    fetchFavorites() {
      favoriteService.getFavorites()
        .then((response) => {
          this.favorites = response.data.favorites;
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error);
        });
    },
    updateElements(books) {
      this.books = books;
      this.fetchFavorites();
    },
    updateFavorites() {
      this.fetchFavorites();
    }
  },
  mounted() {
    this.fetchBooks();
    this.fetchFavorites();
  },
};
</script>

<style scoped>
</style>
