import api from './api.service';

const API_URL = 'favorite/';

class FavoriteService {
  addFavorite(bookId) {
    return api.post(`${API_URL}`, { book_id: bookId });
  }

  getFavorites() {
    return api.get(`${API_URL}`);
  }

  deleteFavorite(favoriteId) {
    return api.delete(`${API_URL}${favoriteId}`);
  }
}

export default new FavoriteService();
