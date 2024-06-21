import api from './api.service';
import { useUserStore } from '@/stores/user'; 
import router from '@/router';
const API_URL = 'favorite/';

class FavoriteService {
  addFavorite(bookId) {
    const userStore = useUserStore(); 
    const token = userStore.token; 
    if (!token) {
      alert('Please login to add favorite');
      router.push('/login');
      return;
    }
    return api.post(`${API_URL}`, { book_id: bookId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
  }
  getFavorites() {
    const userStore = useUserStore(); 
    const token = userStore.token; 
    if (!token) {
        alert('Please login to view favorite');
        router.push('/login');
        return;
      }
    return api.get(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
  }

  deleteFavorite(favoriteId) {
    const userStore = useUserStore(); 
    const token = userStore.token;
    if (!token) {
        alert('Please login to delete favorite');
        router.push('/login');
        return;
      }
    return api.delete(`${API_URL}${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
  }
}

export default new FavoriteService();
