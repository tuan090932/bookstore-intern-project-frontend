import api from './api.service';

const API_URL = 'categories/';

class CategoryService {
  async getAllCategories() {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Error fetching categories');
    }
  }
}

export default new CategoryService();
