import api from './api.service';

const API_URL = 'cart/';

class CartService {
  // Method to add a book to the cart
  addCart(bookId, quantity = 1) {
    return api.post(`${API_URL}`, { book_id: bookId, quantity: quantity });
  }
  // Method to get the cart 
  getCart() {
    return api.get(`${API_URL}`);
  }
  // Method to delete a book from the cart
  deleteCart(cartId) {
    return api.delete(`${API_URL}${cartId}`);
  }
}

export default new CartService();
