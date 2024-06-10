<template>
  <div class="bg-gray-100 p-4 container mx-auto mt-20">
    <h1 class="text-2xl font-bold mb-4 text-center">Explore Top Book Publishers</h1>
    <p class="mb-4 text-center">
      Find out more about the most renowned and influential book publishers in the industry.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="publisher in publishers" :key="publisher.id" class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-bold mb-2 text-center">{{ publisher.name }}</h2>
        <p class="text-center">{{ publisher.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publishers: [
        { id: 1, name: 'Publisher 1', description: 'Description for Publisher 1' },
        { id: 2, name: 'Publisher 2', description: 'Description for Publisher 2' },
        { id: 3, name: 'Publisher 3', description: 'Description for Publisher 3' }
      ]
    }
  }
}
</script>

<style></style>
