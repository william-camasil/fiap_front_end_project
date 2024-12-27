<script setup lang="ts">
import Home from "../../../../presentation/pages/home/Home.vue";
import { MakeCategories } from "../../usecases/CategoriesFactory";
import { MakePayment } from "../../usecases/PaymentFactory";
</script>
<template>
  <Home :categories="MakeCategories()" :payment="MakePayment()" />
</template>
