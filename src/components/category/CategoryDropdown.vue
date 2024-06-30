<template>
  <li
    class="p-4 border-green-500 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer relative"
    @mouseover="showCategories = true"
    @mouseleave="showCategories = false"
  >
    Categories
    <ul
      v-if="showCategories"
      class="absolute left-0 top-full custom-width bg-white border border-gray-300 shadow-lg flex flex-wrap p-4"
    >
      <li
        v-for="category in categories"
        :key="category.category_id"
        class="p-2 hover:bg-green-500 hover:text-white w-1/3"
      >
        {{ category.category_name }}
      </li>
    </ul>
  </li>
</template>

<script>
import CategoryService from '@/services/category.service'

export default {
  data() {
    return {
      showCategories: false,
      categories: []
    }
  },
  mounted() {
    this.loadCategories()
  },
  methods: {
    async loadCategories() {
      try {
        const response = await CategoryService.getAllCategories()
        this.categories = response
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
  }
}
</script>

<style scoped>
.custom-width {
  width: 30rem; 
}
</style>
