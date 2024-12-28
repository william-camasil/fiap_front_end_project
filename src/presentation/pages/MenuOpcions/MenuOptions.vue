<script setup lang="ts">
import { PropType, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Hamburgers, Appetizers, Desserts, Beverages } from "../../protocols";

const { hamburgers, appetizers, desserts, beverages } = defineProps({
  hamburgers: Object as PropType<Hamburgers>,
  appetizers: Object as PropType<Appetizers>,
  desserts: Object as PropType<Desserts>,
  beverages: Object as PropType<Beverages>,
});

const router = useRouter();

const optionList = ref<any[]>([]);
const cart = ref<any[]>([]);

const loadCart = () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart.value = JSON.parse(savedCart);
  }
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

const clearCart = () => {
  cart.value = [];
  localStorage.removeItem("cart");
  alert("Itens removidos do carrinho");
};

const handleShowMenuOptions = async (option: string) => {
  try {
    let response;
    switch (option.toString()) {
      case "hamburgers":
        response = await hamburgers!.getHamburgers();
        optionList.value = response;
        break;

      case "porcoes":
        response = await appetizers!.getAppetizers();
        optionList.value = response;
        break;

      case "sobremesas":
        response = await desserts!.getDesserts();
        optionList.value = response;
        break;

      case "bebidas":
        response = await beverages!.getBeverages();
        optionList.value = response;
        break;

      default:
        alert(`Opção inválida:  ${option}`);
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

const addToCart = (title: string, value: number) => {
  const item = { title, value };
  cart.value.push(item);
  saveCart();
  alert(`Item adicionado: ${item.title} - R$ ${item.value}`);
};

onMounted(() => {
  loadCart();
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
            Preço:
            <span v-if="option.values">
              <span v-if="option.values.single">
                R$ {{ option.values.single }} (individual) / R$
                {{ option.values.combo }} (combo)
              </span>
              <span v-if="option.values.small">
                R$ {{ option.values.small }} (pequeno) / R$
                {{ option.values.large }} (grande)
              </span>
            </span>
            <span v-else> R$ {{ option.value }} (único) </span>
          </p>
          <button
            @click="
              addToCart(
                option.title,
                option.values
                  ? option.values.single
                    ? option.values.single
                    : option.values.small
                  : option.value
              )
            "
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Indisponível no momento.</p>
    </div>

    <h2>Carrinho</h2>
    <ul>
      <li v-for="item in cart" :key="item.title">
        {{ item.title }} - R$ {{ item.value }}
      </li>
    </ul>

    <button @click="clearCart">Limpar Carrinho</button>
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

h1,
h2 {
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

button {
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #002d56;
}
</style>
