<!-- FavoritesView.vue -->

<template>
    <div class="container mx-auto mt-20">
      <h1 class="text-2xl font-bold mb-4 text-center">My Favorites</h1>
      <div v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</div>
      <div v-else>
        <div class="favorites-container">
          <FavoriteItem
            v-for="favorite in favorites"
            :key="favorite.id"
            :favorite="favorite"
            @favoriteDeleted="handleFavoriteDeleted"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import favoriteService from '@/services/favorite.service';
  import FavoriteItem from '@/components/favorite/FavoriteItem.vue'; 
  
  export default {
    components: {
      FavoriteItem 
    },
    data() {
      return {
        favorites: [], 
        errorMessage: ''
      };
    },
    mounted() {
      this.getFavorites();
    },
    methods: {
      getFavorites() {
        favoriteService.getFavorites()
          .then((response) => {
            this.favorites = response.data.favorites;
          })
          .catch((error) => {
            console.error('Error fetching favorites:', error);
            this.errorMessage = 'Error fetching favorites';
          });
      },
      handleFavoriteDeleted() {
        this.getFavorites()
      }
    }
  };
  </script>
  
  <style scoped>
  .favorites-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive grid layout */
    gap: 20px;
  }
  </style>
  