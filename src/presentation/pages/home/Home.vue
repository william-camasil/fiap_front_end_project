<script setup lang="ts">
import { PropType, ref, onMounted } from "vue";
import { Categories } from "../../protocols";
import { useRouter } from "vue-router";

const { categories } = defineProps({
  categories: Object as PropType<Categories>,
});

const router = useRouter();

// Variável reativa para armazenar os dados obtidos
const categoryData = ref<string | null>(null);

const handleShowCategories = async () => {
  try {
    const response1 = await categories.getCategories();
    // Armazena o primeiro link obtido na variável reativa
    categoryData.value = response1[0].link;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("finally");
  }
};

// Chama a função quando o componente for montado
onMounted(() => {
  handleShowCategories();
});
</script>

<template>
  <div>
    <h1>HOME</h1>
    <!-- Exibe o conteúdo do response1 -->
    <div v-if="categoryData">
      <p>Link: {{ categoryData }}</p>
    </div>
  </div>
</template>

<style scoped></style>
