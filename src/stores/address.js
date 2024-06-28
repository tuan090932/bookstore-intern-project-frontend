import { defineStore } from 'pinia';
import AddressService from '@/services/address.service';

export const useAddressStore = defineStore('address', {
  state: () => ({
    addresses: [],
    fetched: false,
  }),
  actions: {

    // Add the fetchAddresses action
    async fetchAddresses() {
      if (!this.fetched) {
        try {
          const response = await AddressService.getAddresses();
          this.addresses = response.data;
          this.fetched = true;
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      }
    },

    // Add the addAddress action
    async addAddress(address) {
      try {
        const response = await AddressService.addAddress(address);
        this.addresses.push(response.data);
      } catch (error) {
        console.error('Error adding address:', error);
      }
    },

    // Add the deleteAddress action
    async deleteAddress(id) {
      try {
        await AddressService.deleteAddress(id);
        this.addresses = this.addresses.filter((address) => address.address_id !== id);
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    },

    // Add the updateAddress action
    async updateAddress(id, address) {
      try {
        const response = await AddressService.updateAddress(id, address);
        const index = this.addresses.findIndex((addr) => addr.address_id === id);// Find the index of the address to update
        this.addresses[index] = response.data;
      } catch (error) {
        console.error('Error updating address:', error);
      }
    },

    // Add the getAddress action
    getAddresses() {
      return this.addresses;
    },
  },
});
