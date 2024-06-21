<!-- FavoriteItem.vue -->
<template>
    <div class="rounded-lg overflow-hidden shadow-lg ring-1 ring-stone-400 ring-opacity-40">
        <div class="relative">
          <img class="w-full" :src="favorite.book.image" alt="Product Image" />
        </div>
        <div class="p-4">
          <h3 class="text-lg font-medium mb-2 line-clamp-1">{{ favorite.book.title }}</h3>
          <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ favorite.book.description }}</p>
          <div class="flex items-center justify-between">
            <span class="font-bold text-lg">{{ favorite.book.price }}</span>
            <button @click="deleteFavorite" class="text-red-500 hover:text-red-700">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import favoriteService from '@/services/favorite.service';
  
  export default {
    props: {
      favorite: Object
    },
    methods: {
      deleteFavorite() {
        favoriteService.deleteFavorite(this.favorite.favorite_id)
          .then(() => {
            this.$emit('favoriteDeleted', this.favorite.id); 
          })
          .catch((error) => {
            console.error('Error deleting favorite:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  