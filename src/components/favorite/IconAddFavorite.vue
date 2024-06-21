<template>
    <div @click="addFavorite">
      <font-awesome-icon :icon="['fas', 'heart']" />
    </div>
  </template>
  
  <script>
  import favoriteService from '@/services/favorite.service';
  
  export default {
    props: {
      bookId: {
        type: Number,
        required: true
      }
    },
    methods: {
      addFavorite() {
        favoriteService.addFavorite(this.bookId)
          .then(() => {
            alert('Favorite added successfully');
          })
          .catch((error) => {
            console.error('Error adding favorite:', error);
            alert(error.response.data.message || 'An error occurred. Please try again. ');
          });
      }
    }
  };
  </script>
  
  <style>
  
  </style>
  