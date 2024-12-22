<script setup lang="ts">
import { PropType, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Hamburgers, Appetizers } from "../../protocols";

const { hamburgers, appetizers } = defineProps({
  hamburgers: Object as PropType<Hamburgers>,
  appetizers: Object as PropType<Appetizers>,
});

const router = useRouter();

const optionList = ref<any[]>([]);

const handleShowMenuOptions = async (option: string) => {
  try {
    let response;
    switch (option.toString()) {
      case "hamburgers":
        response = await hamburgers.getHamburgers();
        optionList.value = response;
        break;

      case "porcoes":
        response = await appetizers.getAppetizers();
        optionList.value = response;
        break;

      default:
        alert("Opção inválida");
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  const routeState = router.currentRoute.value.params;
  if (routeState && routeState.link) {
    handleShowMenuOptions(routeState.link);
  }
});
</script>

<template>
  <div class="menu-container">
    <h1>Opções:</h1>

    <div v-if="optionList.length" class="option-list">
      <div v-for="option in optionList" :key="option.id" class="option-item">
        <img
          v-if="Array.isArray(option.image)"
          :src="option.image[0]"
          alt="Opções"
          class="option-image"
        />
        <img v-else :src="option.image" alt="Opções" class="option-image" />
        <div class="option-details">
          <h2>{{ option.title }}</h2>
          <p>{{ option.description }}</p>
          <p>
            Preço: R$ {{ option.values.single }} (individual) / R$
            {{ option.values.combo }} (combo)
          </p>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Carregando opções...</p>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
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

.option-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
}

.option-item {
  display: flex;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.option-item:hover {
  transform: translateY(-5px);
}

.option-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

.option-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.option-details h2 {
  font-size: 24px;
  color: #003366;
  margin-bottom: 10px;
}

.option-details p {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}
</style>
