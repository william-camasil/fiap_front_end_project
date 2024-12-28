<script setup lang="ts">
import { PropType, ref, onMounted } from "vue";
import {
  Categories,
  CategoriesModel,
  Payment,
  PaymentModel,
} from "../../protocols";
import { useRouter } from "vue-router";

const { categories, payment } = defineProps({
  categories: Object as PropType<Categories>,
  payment: Object as PropType<Payment>,
});

const router = useRouter();

const categoriesList = ref<CategoriesModel[]>([]);
const paymentList = ref<PaymentModel[]>([]);

const handleShowCategories = async () => {
  try {
    const response = await categories!.getCategories();
    categoriesList.value = response;
  } catch (error) {
    console.error(error);
  }
};

const handleShowPayment = async () => {
  try {
    const response = await payment!.getPayment();
    paymentList.value = response;
  } catch (error) {
    console.error(error);
  }
};

const handleCategoryClick = async (link: string) => {
  try {
    if (link === "combos") {
      alert("Opção indisponível no momento");
      return;
    }
    router.push({ name: "MenuOptions", params: { link } });
  } catch (error) {
    console.error(error);
  }
};

const finalizeOrder = () => {
  router.push({ name: "FinalizeOrder" });
};

onMounted(() => {
  handleShowCategories();
  handleShowPayment();
});
</script>

<template>
  <div class="home-container">
    <h1>Opções de pedidos disponíveis:</h1>
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

    <button @click="finalizeOrder" class="finalize-btn">
      Finalizar Pedido
    </button>
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

.finalize-btn {
  margin-top: 30px;
  padding: 12px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 200px;
  text-align: center;
}

.finalize-btn:hover {
  background-color: #218838;
}
</style>
