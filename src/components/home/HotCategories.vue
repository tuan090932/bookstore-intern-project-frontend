<template>
  <div class="bg-gray-100 p-4 container mx-auto mt-20">
    <h1 class="text-2xl font-bold mb-4 text-center">Popular genres of books to read</h1>
    <p class="mb-4 text-center">The website always provides the newest and fastest categories</p>
    <div v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</div>
    <div v-else>
      <div v-if="visibleCategories.length === 0" class="text-center text-blue-500 mb-4">
        No categories available at the moment. Please check back later.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="category in visibleCategories" :key="category.id" class="bg-white p-4 rounded shadow">
          <h2 class="text-xl font-bold mb-2 text-center">{{ category.category_name }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryService from '@/services/category.service';

export default {
  data() {
    return {
      categories: [],
      errorMessage: ''
    };
  },
  mounted() {
    this.getCategories();
  },
  computed: {
    visibleCategories() {
      // Return only the first 5 categories
      return this.categories.slice(0, 4);
    }
  },
  methods: {
    async getCategories() {
      try {
        this.categories = await CategoryService.getAllCategories();
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add any specific CSS styles if needed */
</style>
