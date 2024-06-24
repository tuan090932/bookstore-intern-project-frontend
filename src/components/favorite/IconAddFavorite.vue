<template>
  <div @click="toggleFavorite" class="cursor-pointer scale-100 hover:scale-150 ease-in duration-100">
    <font-awesome-icon :icon="['fas', 'heart']" :class="{ 'text-red-500': isFavorite, 'text-gray-500': !isFavorite }" />
  </div>
</template>

<script>
import favoriteService from '@/services/favorite.service';

export default {
  props: {
    bookId: {
      type: Number,
      required: true
    },
    favorites: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isFavorite: this.favorites.some(fav => fav.book_id === this.bookId),
      favoriteId: this.favorites.find(fav => fav.book_id === this.bookId)?.favorite_id || null
    };
  },
  methods: {
    toggleFavorite() {
      if (this.isFavorite) {
        this.removeFavorite();
      } else {
        this.addFavorite();
      }
    },
    addFavorite() {
      favoriteService.addFavorite(this.bookId)
        .then((response) => {
          this.isFavorite = true;
          this.favoriteId = response.data.favorite.favorite_id;
          this.$emit('updateFavorites');
        })
        .catch((error) => {
          console.error('Error adding favorite:', error);
        });
    },
    removeFavorite() {
      if (this.favoriteId) {
        favoriteService.deleteFavorite(this.favoriteId)
          .then(() => {
            this.isFavorite = false;
            this.favoriteId = null;
            this.$emit('updateFavorites'); 
          })
          .catch((error) => {
            console.error('Error removing favorite:', error);
          });
      }
    }
  },
  watch: {
    favorites: {
      handler() {
        this.isFavorite = this.favorites.some(fav => fav.book_id === this.bookId);
        this.favoriteId = this.favorites.find(fav => fav.book_id === this.bookId)?.favorite_id || null;
      },
      deep: true
    }
  }
};
</script>

<style>
</style>
