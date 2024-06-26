<template>
  <label class="block text-gray-700 text-sm font-bold mb-2 ">Address</label>
  <div class="mb-4 border-2 rounded ">
    <div v-for="address in addresses" :key="address.address_id">
      <div class="flex mx-2">
        <p class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1 ">
          {{ address.shipping_address }}, {{ address.city }}, {{ address.country_name }}
        </p>
        <IconDeleteAddress :addressId="address.address_id" @address-deleted="fetchAddresses" />
        <div @click="editAddress(address)" class=" cursor-pointer bg-cyan-400 shadow content-center appearance-none border rounded bg-red-400 justy py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1">
          <font-awesome-icon :icon="['fas', 'pen']" />
        </div>
      </div>
      <address-edit-form v-if="showEditAddressForm && editingAddressId === address.address_id" @close="closeForms" @address-updated="fetchAddresses" :address="address" />
    </div>
    
    <button
      v-if="!showAddAddressForm && !showEditAddressForm"
      class="ml-2 flex mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-1 rounded focus:outline-none focus:shadow-outline"
      @click="showAddAddressForm = true"
    >
      Add Address
    </button>
    
    <address-add-form v-if="showAddAddressForm" @close="closeForms" @address-added="fetchAddresses" />
  </div>
</template>

<script>
import AddressAddForm from '@/components/profile/AddressAddForm.vue';
import AddressEditForm from '@/components/profile/AddressEditForm.vue';
import IconDeleteAddress from '@/components/profile/IconDeleteAddress.vue';
import { useAddressStore } from '@/stores/address';

export default {
  components: {
    AddressAddForm,
    IconDeleteAddress,
    AddressEditForm,
  },
  data() {
    return {
      showAddAddressForm: false,
      showEditAddressForm: false,
      editingAddressId: null,
    };
  },
  computed: {
    addresses() {
      const addressStore = useAddressStore();
      return addressStore.getAddresses();
    },
  },
  methods: {
    async fetchAddresses() {
      const addressStore = useAddressStore();
      try {
        await addressStore.fetchAddresses();
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    },
    handleAddressAdded() {
      this.showAddAddressForm = false;
    },
    editAddress(address) {
      this.editingAddressId = address.address_id;
      this.showEditAddressForm = true;
      this.showAddAddressForm = false;
    },
    closeForms() {
      this.showAddAddressForm = false;
      this.showEditAddressForm = false;
      this.editingAddressId = null;
    },
  },
  async mounted() {
    await this.fetchAddresses();
  },
};
</script>

<style>
/* Add any styles if needed */
</style>
