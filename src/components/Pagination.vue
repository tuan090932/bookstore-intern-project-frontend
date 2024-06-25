<template>
  <div class="flex justify-center mt-8">
    <button
      class="bg-gray-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-l"
      :disabled="currentPage === 1"
      @click="goToFirstPage"
    >
      <font-awesome-icon :icon="['fas', 'angles-left']" />
    </button>
    <button
      class="bg-gray-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4"
      :disabled="currentPage === 1"
      @click="goToPreviousPage"
    >
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>

    <template v-for="page in totalPages" :key="page">
      <button
        v-if="isWithinRange(page)"
        :class="['bg-gray-100 hover:bg-blue-200 font-bold py-2 px-4', { 'bg-cyan-200': currentPage == page }]"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      class="bg-gray-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4"
      :disabled="currentPage === totalPages"
      @click="goToNextPage"
    >
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </button>
    <button
      class="bg-gray-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-r"
      :disabled="currentPage === totalPages"
      @click="goToLastPage"
    >
      <font-awesome-icon :icon="['fas', 'angles-right']" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    allElements: {
      type: Array,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      totalPages: 0
    };
  },
  mounted() {
    this.totalPages = Math.ceil(this.allElements.length / this.perPage);
    this.updatePagedElements();
  },
  watch: {
    allElements() {
      this.totalPages = Math.ceil(this.allElements.length / this.perPage);
      this.updatePagedElements();
    }
  },
  methods: {
    isWithinRange(page) {
      const rangeStart = Math.max(1, this.currentPage - 2);
      const rangeEnd = Math.min(this.totalPages, this.currentPage + 2);
      return page >= rangeStart && page <= rangeEnd;
    },
    goToFirstPage() {
      this.currentPage = 1;
      this.updatePagedElements();
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePagedElements();
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.updatePagedElements();
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePagedElements();
      }
    },
    goToLastPage() {
      this.currentPage = this.totalPages;
      this.updatePagedElements();
    },
    updatePagedElements() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      const pagedElements = this.allElements.slice(startIndex, endIndex);
      this.$emit('updateElements', pagedElements);
    }
  }
};
</script>

<style scoped>
</style>
