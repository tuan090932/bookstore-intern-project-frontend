<template>
  <div class="flex justify-center mt-8">
    <button
      class="bg-gray-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-l"
      :disabled="currentPage === 1"
      @click="goToFirstPage"
    >
      <font-awesome-icon :icon="['fas', 'angle-double-left']" />
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
        :class="[
          'bg-gray-100 hover:bg-blue-200 font-bold py-2 px-4',
          { 'bg-blue-200': currentPage == page }
        ]"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      class="bg-gray-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4"
      :disabled="currentPage === totalPages || totalPages === 0"
      @click="goToNextPage"
    >
      <font-awesome-icon :icon="['fas', 'angle-right']" />
    </button>
    <button
      class="bg-gray-100 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-r"
      :disabled="currentPage === totalPages || totalPages === 0"
      @click="goToLastPage"
    >
      <font-awesome-icon :icon="['fas', 'angle-double-right']" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToPage(page) {
      this.$emit('page-changed', page)
    },
    goToFirstPage() {
      this.$emit('page-changed', 1)
    },
    goToLastPage() {
      this.$emit('page-changed', this.totalPages)
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-changed', this.currentPage + 1)
      }
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.$emit('page-changed', this.currentPage - 1)
      }
    },
    isWithinRange(page) {
        let rangeStart = Math.max(1, this.currentPage - 2);
        let rangeEnd = Math.min(this.totalPages, this.currentPage + 2);

        if (this.currentPage === 1 || this.currentPage === 2) {
            rangeEnd = Math.min(this.totalPages, 5);
        } else if (this.currentPage === this.totalPages || this.currentPage === this.totalPages - 1) {
            rangeStart = Math.max(1, this.totalPages - 4);
        }

        return page >= rangeStart && page <= rangeEnd;
    }
  }
}
</script>

<style scoped></style>
