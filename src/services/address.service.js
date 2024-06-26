import api from './api.service';

const API_URL = 'address/';

class AddressService {
  addAddress(address) {
    return api.post(`${API_URL}`, address);
  }
  getAddresses() {
    return api.get(`${API_URL}`);
  }
  deleteAddress(id) {
    return api.delete(`${API_URL}${id}`);
  }
  updateAddress(id, address) {
    return api.put(`${API_URL}${id}`, address);
  }
  getAddress(id) {
    return api.get(`${API_URL}${id}`);
  }
}

export default new AddressService();
