<template>
  <form @submit.prevent="handleSubmit" class="flex">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Enter search query..."
      class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
      @input="handleInput"
    />
    <button type="submit" class="ml-2 p-2 bg-green-500 text-white rounded-lg">Search</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useSearchStore } from '@/stores/search'

const searchQuery = ref('')
const searchStore = useSearchStore()

// Methods to handle input and form submission
const handleInput = async () => {
  try {
    await searchStore.getSearchBook(searchQuery.value) // Call the getSearchBook method in the search store
    console.log('Search results:', searchStore.getSearchs())
  } catch (error) {
    console.error('Error searching books:', error)
  }
}

// Method to handle form submission
const handleSubmit = async () => {
  try {
    await searchStore.getSearchBook(searchQuery.value)
    console.log('Search results:', searchStore.getSearchs())
  } catch (error) {
    console.error('Error searching books:', error)
  }
}
</script>

<style scoped>
/* Add scoped styles as needed */
</style>
