import api from './api.service';

const API_URL = 'address/';

class AddressService {

  // Method to add an address
  addAddress(address) {
    return api.post(`${API_URL}`, address);
  }

  // Method to get all addresses
  getAddresses() {
    return api.get(`${API_URL}`);
  }

  // Method to delete an address
  deleteAddress(id) {
    return api.delete(`${API_URL}${id}`);
  }

  // Method to update an address
  updateAddress(id, address) {
    return api.put(`${API_URL}${id}`, address);
  }

  // Method to get an address
  getAddress(id) {
    return api.get(`${API_URL}${id}`);
  }
}

export default new AddressService();
