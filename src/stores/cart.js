import { defineStore } from 'pinia';
import CartService from '@/services/cart.service';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    // Add the fetchCartItems action
    async fetchCartItems() {
      try {
        const response = await CartService.getCart();
        this.cartItems = response.data;
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
    // Add the addCartItem action
    async addCartItem(bookId, quantity = 1) {
      try {
        const response = await CartService.addCart(bookId, quantity);
        this.cartItems.push(response.data);
      } catch (error) {
        console.error('Error adding cart item:', error);
      }
    },
    // Add the deleteCartItem action
    async deleteCartItem(cartId) {
      try {
        await CartService.deleteCart(cartId); 
        this.cartItems = this.cartItems.filter((item) => item.item_id !== cartId);
      } catch (error) {
        console.error('Error deleting cart item:', error);
      }
    },
    // Add the getCartItems action
    getCartItems() {
      return this.cartItems;
    },
  },
});
