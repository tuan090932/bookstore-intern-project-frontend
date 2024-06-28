<template>
  <div class="mt-10">
    <div class="flex">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-6"> {{title}}</h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="books in paginatedBooks" :key="books.id" class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
        <div class="relative">
          <img :src="books.image" alt="Books Image" class="w-full h-64 object-cover rounded-lg mb-4" />
        </div>
        <div class="flex items-center">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2 truncate max-w-xs">{{ books.title }}</h3>
        </div>
        <div>
          <span class="font-bold text-lg">{{$filters.formatNumber(books.price) }}</span>
        </div>
        <p class="text-gray-600 text-center relative group">
          {{ books.authors.author_name }}
          <AuthorTooltip :author="books.authors" />
        </p>
      </div>
    </div>
    <Pagination
      :allElements="books"
      :perPage="4"
      @updateElements="updateElements"
    />
  </div>
</template>

<script>
import AuthorTooltip from '@/components/author/AuthorTooltip.vue';
import Pagination from '@/components/Pagination.vue'; 

export default {
  components: {
    AuthorTooltip,
    Pagination
  },
  props: {
    books: {
      type: Array,
      required: true
    },
    title: {
      required: true
    },
  },
  data() {
    return {
      paginatedBooks: []
    };
  },
  methods: {
    // Update elements
    updateElements(paginatedBooks) {
      this.paginatedBooks = paginatedBooks;
    }
  }
}
</script>

<style scoped>
/* Add any specific CSS styles if needed */
</style>
