<template>
  <div class="bg-gray-100 p-4 container mx-auto mt-20">
    <h1 class="text-2xl font-bold mb-4 text-center">Popular genres of books to read</h1>
    <p class="mb-4 text-center">The website always provides the newest and fastest categories</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="category in categories" :key="category.id" class="bg-white p-4 rounded shadow">
        <div class="flex justify-center">
          <img src="@/assets/img/trinhtham.png" alt="" class="w-1/2" />
        </div>
        <h2 class="text-xl font-bold mb-2 text-center">{{ category.name }}</h2>
        <p class="text-center">{{ category.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { id: 1, name: 'Category 1', description: 'Description for Category 1' },
        { id: 2, name: 'Category 2', description: 'Description for Category 2' },
        { id: 3, name: 'Category 3', description: 'Description for Category 3' }
      ]
    }
  }
}
</script>

<style></style>
