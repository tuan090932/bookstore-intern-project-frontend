<template>
  <!-- component -->
  <header
    class="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-2"
    style="z-index: 1"
  >
    <div class="flex items-center w-6/12 md:w-3/12">
      <!-- mobile menu button -->
      <div class="block md:hidden mr-2">
        <button @click="toggleMobileMenu">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
      <!-- logo -->
      <h1>
        <router-link to="/">
          <img
            src="@/assets/logo.png"
            alt="Logo"
            class="h-10 md:h-20 w-auto hover:text-green-500 duration-200"
          />
        </router-link>
      </h1>
    </div>

    <!-- navigation -->
    <nav class="nav font-semibold text-lg hidden md:block">
      <ul class="flex items-center">
        <li
          class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer"
        >
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <CategoryDropdown />
        </li>
        <li
          class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer"
        >
          <router-link to="/collections">Collections</router-link>
        </li>
        <li
          class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer"
        >
          <router-link to="/about">About Us</router-link>
        </li>
        <li
          class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer"
        >
          <router-link to="/contact">Contact Us</router-link>
        </li>
      </ul>
    </nav>

    <!-- mobile menu -->
    <nav v-if="isMobileMenuOpen" class="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
      <ul class="flex flex-col items-center">
        <li class="p-4 w-full text-center border-b">
          <router-link to="/" @click="toggleMobileMenu">Home</router-link>
        </li>
        <li class="p-4 w-full text-center border-b">
          <router-link to="/products" @click="toggleMobileMenu">Products</router-link>
        </li>
        <li class="p-4 w-full text-center border-b">
          <router-link to="/collections" @click="toggleMobileMenu">Collections</router-link>
        </li>
        <li class="p-4 w-full text-center border-b">
          <router-link to="/about" @click="toggleMobileMenu">About Us</router-link>
        </li>
        <li class="p-4 w-full text-center border-b">
          <router-link to="/contact" @click="toggleMobileMenu">Contact Us</router-link>
        </li>
      </ul>
    </nav>

    <!-- buttons --->
    <div class="w-6/12 md:w-3/12 flex justify-end items-center">
      <!--Button Search-->
      <router-link to="/search" class="mr-4">
        <font-awesome-icon :icon="['fas', 'search']" />
      </router-link>
      <!-- User Button -->
      <router-link v-if="!isLoggedIn" to="/login" class="mr-4">
        <font-awesome-icon :icon="['fas', 'user']" />
      </router-link>
      <!-- Logout Button -->
      <LogoutButton v-if="isLoggedIn" class="mr-4" />
      <!-- Tên User -->
      <router-link v-if="isLoggedIn && user" to="/profile" class="mr-4">
        {{ user.name }}
      </router-link>
      <!--Button Cart-->
      <router-link to="/cart" class="mr-4">
        <font-awesome-icon :icon="['fas', 'shopping-cart']" />
      </router-link>
    </div>
  </header>
</template>

<script>
import { useUserStore } from '@/stores/user'
import LogoutButton from '@/components/auth/LogoutButton.vue'
import { ref, onMounted } from 'vue'
import { watch } from 'vue'
import CategoryDropdown from '@/components/category/CategoryDropdown.vue'

export default {
  components: {
    LogoutButton,
    CategoryDropdown
  },
  setup() {
    const userStore = useUserStore()

    const isLoggedIn = ref(!!userStore.token)
    const user = ref(userStore.user)
    const isMobileMenuOpen = ref(false)

    onMounted(() => {
      userStore.loadUserFromLocalStorage()
    })

    watch(userStore, () => {
      isLoggedIn.value = !!userStore.token
      user.value = userStore.user
    })

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    return {
      isLoggedIn,
      user,
      isMobileMenuOpen,
      toggleMobileMenu
    }
  }
}
</script>

<style scoped>
.header .nav ul li.active {
  border-bottom: 2px solid green;
}
</style>
