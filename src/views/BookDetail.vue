<template>
  <div>
    <InformationBookDetail :book="book" :errorMessage="errorMessage" />
    <div class="mx-auto container">
      <RelatedBooks
        :books="booksByAuthor"
        :title="'Journey Through the Works of ' + book.authors.author_name"
      />
    </div>
    <div class="mx-auto container">
      <RelatedBooks
        :books="booksByCategory"
        :title="'Books in the ' + book.categories.category_name + ' Category'"
      />
    </div>
  </div>
</template>

<script>
import InformationBookDetail from '@/components/bookDetail/InformationBookDetail.vue';
import RelatedBooks from '@/components/bookDetail/RelatedBooks.vue';
import BookService from '@/services/book.service';

export default {
  components: {
    InformationBookDetail,
    RelatedBooks,
  },
  data() {
    return {
      book: {
        title: '',
        description: '',
        image: '',
        price: 0,
        stock: 0,
        num_pages: 0,
        language_id: 0,
        author_id: 0,
        category_id: 0,
        publisher_id: 0,
      },
      errorMessage: '',
      booksByAuthor: [],
      booksByCategory: [],
    };
  },
  async created() {
    try {
      await this.loadBookDetails();
      await this.loadBookByAuthor();
      await this.loadBookByCategory();
    } catch (error) {
      this.errorMessage = 'Failed to load book details';
    }
  },
  methods: {
    
    // Load book details
    async loadBookDetails() {
      try {
        const response = await BookService.getBookDetails(this.$route.params.id);
        this.book = response;
        console.log('Book details:', this.book);
      } catch (error) {
        this.errorMessage = 'Failed to load book details';
        throw error;
      }
    },

    // Load books by author
    async loadBookByAuthor() {
      try {
        const response = await BookService.getBookByAuthor(this.book.author_id);
        this.booksByAuthor = response;
        console.log('Books by author:', this.booksByAuthor);
      } catch (error) {
        this.errorMessage = 'Failed to load books by author';
        throw error;
      }
    },

    // Load books by category
    async loadBookByCategory() {
      try {
        const response = await BookService.getBookByCategory(this.book.category_id);
        this.booksByCategory = response;
        console.log('Books by category:', this.booksByCategory);
      } catch (error) {
        this.errorMessage = 'Failed to load books by category';
        throw error;
      }
    }
  }
}
</script>

<style scoped>
</style>
