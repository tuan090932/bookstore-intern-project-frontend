<template>
  <div class="container flex mx-auto w-full items-center justify-center border rounded-lg">
    <ul class="flex flex-col bg-white p-4 w-full">
      <div v-if="slicedSearchs.length < 1">please input</div>

      <!-- Add a list item for each book in the slicedSearchs array -->
      <li
        v-for="(book, index) in slicedSearchs"
        :key="index"
        class="border-white flex flex-row mb-2"
      >
        <div
          class="select-none cursor-pointer rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="flex flex-col rounded-md w-10 h-10 bg-white justify-center items-center mr-4">
            <img
              :src="book.image"
              alt="Book Thumbnail"
              class="w-full h-full object-cover rounded-md"
            />
          </div>
          <div class="flex-1 pl-1 mr-16">
            <div class="font-medium">{{ book.title }}</div>
            <div class="text-white text-sm">{{ book.author }}</div>
          </div>
          <div class="text-white text-xs">{{ book.publishedDate }}</div>
        </div>
      </li>
      <!-- End of list item -->

      <!-- Add a "See more" link if there are more than 5 search results -->
      <li
        v-if="slicedSearchs.length === 5"
        class="item-center mx-auto font-black border-white flex flex-row mb-2"
      >
        <router-link to="/search" @click="$emit('toggleSearch')"
          class="select-none cursor-pointer rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="text-center">See more</div>
        </router-link>
      </li>
      <!-- End of "See more" link -->
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
const slicedSearchs = computed(() => searchStore.getSearchs().slice(0, 5))
</script>

<style scoped>
/* Add scoped styles as needed */
</style>
