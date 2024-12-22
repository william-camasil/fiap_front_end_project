<script setup lang="ts">
import { PropType, ref, onMounted } from "vue";
import { Categories } from "../../protocols";
import { useRouter } from "vue-router";

const { categories } = defineProps({
  categories: Object as PropType<Categories>,
});

const router = useRouter();

const categoryData = ref<string | null>(null);
const categoriesList = ref<any[]>([]); // TODO: adicionar o tipo correto

// Função para buscar as categorias
const handleShowCategories = async () => {
  try {
    const response = await categories.getCategories();
    categoriesList.value = response;
  } catch (error) {
    console.error(error);
  }
};

const handleCategoryClick = async (link: string) => {
  try {
    router.push({ name: "MenuOptions", params: { link } });
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleShowCategories();
});
</script>

<template>
  <div class="home-container">
    <h1>Categorias</h1>
    <div class="categories-buttons">
      <button
        v-for="category in categoriesList"
        :key="category.id"
        @click="handleCategoryClick(category.link)"
        class="category-btn"
      >
        {{ category.text }}
      </button>
    </div>

    <div v-if="categoryData" class="category-details">
      <p>{{ categoryData }}</p>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fff;
  color: #003366;
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
  color: #003366;
}

.categories-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.category-btn {
  padding: 12px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #003366;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 200px;
  text-align: center;
}

.category-btn:hover {
  background-color: #002d56;
}

.category-details {
  margin-top: 30px;
  font-size: 18px;
  color: #000;
  text-align: center;
}
</style>
