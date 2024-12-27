<script setup lang="ts">
import { PropType, ref, onMounted } from "vue";
import { Categories, Payment } from "../../protocols";
import { useRouter } from "vue-router";

const { categories, payment } = defineProps({
  categories: Object as PropType<Categories>,
  payment: Object as PropType<Payment>,
});

const router = useRouter();

const categoryData = ref<string | null>(null);
const categoriesList = ref<any[]>([]); // TODO: adicionar o tipo correto
const paymentList = ref<any[]>([]); // TODO: adicionar o tipo correto

const handleShowCategories = async () => {
  try {
    const response = await categories.getCategories();
    categoriesList.value = response;
  } catch (error) {
    console.error(error);
  }
};

const handleShowPayment = async () => {
  try {
    const response = await payment.getPayment();
    paymentList.value = response;
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
  handleShowPayment();
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

    <h1>Formas de pagamento</h1>
    <table class="payment-table">
      <thead>
        <tr>
          <th>Opção</th>
          <th>Forma de Pagamento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in paymentList" :key="payment.id">
          <td>{{ payment.value }}</td>
          <td>{{ payment.text }}</td>
        </tr>
      </tbody>
    </table>
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

table {
  width: 80%;
  margin-top: 30px;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #003366;
  color: white;
  font-size: 18px;
}

td {
  font-size: 16px;
  color: #333;
}

table tbody tr:hover {
  background-color: #f4f4f4;
}
</style>
