<template>
  <div>
    <div class="">
      <!-- Header name -->
      <h1 class="fw-[600] text-center text-[26px] lg:text-[35px] mb-[20px]">Giỏ hàng</h1>

      <!-- Header shopping carts -->
      <div class="mb-[12px] px-[20px] shadow text-[18px] text-blue-500 font-bold h-[55px] shadow items-center hidden lg:flex justify-center bg-[#fff]">
        <div class="min-w-[58px] flex items-center justify-center">
          <svg class="h-8 p-1 hover:text-green-500 duration-200" aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z" class=""></path>
          </svg>
        </div>
        <div class="w-[calc(100%-58px)] lg:w-[calc(50%-58px)]">Product</div>
        <div class="text-center w-[12.5%]">Unit Price</div>
        <div class="text-center w-[12.5%]">Quantity</div>
        <div class="text-center w-[12.5%]">Total</div>
        <div class="text-center w-[12.5%]">Actions</div>
      </div>

      <!-- Cart Item -->
      <div v-for="item in carts" :key="item.item_id">
        <div class="cart-info md:shadow">
          <div class="border-b md:px-[20px] border-[rgba(0,0,0,0.09)] md:py-[15px] pt-[15px] text-[16px] min-h-[55px] items-center flex bg-[#fff] flex-wrap">
            <div class="min-w-[58px] flex items-center justify-center">
              <input name="wannaBuy" class="w-[20px] h-[20px]" type="checkbox" />
            </div>
            <div class="w-[calc(100%-58px)] lg:w-[calc(50%-58px)]">
              <a href="" class="flex">
                <div class="aspect-square min-w-[80px] max-h-[80px] rounded-[3px]">
                  <img class="object-cover h-full" :src="item.book.image" :alt="item.book.title" />
                </div>
                <div class="ml-3 flex justify-between px-2 lg:px-0 flex-col gap-y-[3px]">
                  <span class="lg:text-[18px] font-semibold md:max-w-[250px] line-clamp-2">{{ item.book.title }}</span>
                  <span class="lg:text-[14px]">Category: <span class="lg:text-[16px]">{{ item.book.categories.category_name }}</span></span>
                  <div class="color-orange md:hidden font-semibold">
                    <span class="amount">{{ item.book.price }}</span> đ
                  </div>
                </div>
              </a>
            </div>
            <div class="hidden text-center lg:flex items-center justify-center color-orange font-semibold w-[12.5%]">
              <span class="rate">{{ item.book.price }}</span> đ
            </div>
            <div class="text-center lg:w-[12.5%] pl-[158px] pr-[30px] md:px-[45px] flex justify-center text-[16px] my-[7px]">
              <input class="num text-center w-[75px] border border-[rgba(0,0,0,0.3)]" type="number" min="1" v-model="item.quantity" />
            </div>
            <div class="hidden text-center lg:flex items-center justify-center color-orange font-semibold w-[12.5%]">
              <span class="amount">{{ item.book.price * item.quantity }}</span> đ
            </div>

            <div class="text-center w-[12.5%]">
              <DeleteButton :bookId="item.item_id" />
            </div>

          </div>
        </div>
      </div>

      <!-- Total -->
      <div class="sticky bottom-0 bg-[#fff] border-dotted border-[rgba(0,0,0,.09)] lg:border lg:py-2 lg:pr-6 lg:pl-[40px] pl-[10px] my-4 flex items-center justify-between">
        <div class="flex text-[30px] gap-x-2 items-center">
          <input class="aspect-square w-[20px] lg:w-[25px] rounded-[5px]" type="checkbox" />
          <div class="hidden md:block text-[16px]">Select all</div>
          <div class="lg:hidden block text-[16px]">All</div>
        </div>
        <div class="result-cart flex items-center">
          <div class="flex text-[30px] gap-x-2 items-center">
            <div class="text-[14px] lg:text-[16px]">Total payment:</div>
            <span class="text-[18px] lg:text-[24px] text-blue-500 font-semibold">
              <span class="sum-cart">{{ totalSum }}</span> đ
            </span>
          </div>
          <button class="ml-2 lg:ml-5 rounded-[2px] text-white border bg-blue-500 hover:bg-blue-600 h-[56px] px-[10px] lg:px-[20px] text-white text-[15px] lg:text-[24px] font-semibold">
            Buy now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'; // Ensure you're importing the correct store
import DeleteButton from '@/components/cart/DeleteButton.vue';

export default {
  components: {
    DeleteButton,
  },
  computed: {
    totalSum() {
      return this.carts.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
    },
    carts() {
      const cartStore = useCartStore();
      return cartStore.getCartItems();
    },
  },
  created() {
    this.fetchCartItems();
  },
  // Add the fetchCartItems method
  methods: {
    async fetchCartItems() {
      const cartStore = useCartStore(); 
      try {
        await cartStore.fetchCartItems();
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
