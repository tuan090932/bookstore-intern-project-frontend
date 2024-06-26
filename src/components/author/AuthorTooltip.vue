<template>
    <span class="absolute bottom-full hidden group-hover:block dark:text-white text-xs rounded-lg bg-white p-2 w-64 z-10 text-left">
      <strong>Age:</strong> {{ author.age }}<br>
      <strong>Birth Date:</strong> {{ author.birth_date }}<br>
      <div v-if="author.death_date">
        <strong class="text-red-500">Death Date: {{ author.death_date }} </strong> <br>
      </div>
      <strong>Nationality:</strong> {{ author.national }}<br>
    </span>
  </template>
  
  <script>
  export default {
    props: {
      author: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any specific CSS styles if needed */
  .group:hover .group-hover\:block {
    display: block;
  }
  </style>
  