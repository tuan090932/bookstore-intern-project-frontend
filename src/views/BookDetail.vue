<template>
  <div>
    <div v-if="true">
      <InformationBookDetail :book="book" />
      <div class="container mx-auto">
        <RelatedBooks :books="booksByAuthor"/>
      </div>

      <div class="container mx-auto ">
        <RelatedBooks :books="booksByCategory"/>
      </div>
    </div>
    <div v-else>
      <!-- Loading spinner or message -->
      <p>Loading...</p>
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
      loading: true, // Add loading state
    };
  },
  async created() {
    await this.loadBookDetails();
    await this.loadBookByAuthor();
    await this.loadBookByCategory();
  },
  methods: {
    async loadBookDetails() {
      try {
        const response = await BookService.getBookDetails(this.$route.params.id);
        this.book = response;
        console.log('Book details:', this.book);
      } catch (error) {
        this.errorMessage = 'Failed to load book details';
      }
    },
    async loadBookByAuthor(){
      try{
        const response = await BookService.getBookByAuthor(this.book.author_id);
        this.booksByAuthor = response;
        console.log('Book details:author', this.booksByAuthor);
      } catch (error) {
        this.errorMessage = 'Failed to load book details';
      }
    },
    async loadBookByCategory(){
      try{
        const response = await BookService.getBookByCategory(this.book.category_id);
        this.booksByCategory = response;
        console.log('Book details:category', this.booksByCategory,this.book.category_id);
      } catch (error) {
        this.errorMessage = 'Failed to load book details';
      }
    }
  }
}
</script>

<style scoped>
/* Add any specific CSS styles if needed */
</style>
