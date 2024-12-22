<script setup lang="ts">
import Home from "../../../../presentation/pages/home/Home.vue";
import { MakeCategories } from "../../usecases/CategoriesFactory";
</script>
<template>
  <Home
    :categories="MakeCategories()"
  />
</template>
