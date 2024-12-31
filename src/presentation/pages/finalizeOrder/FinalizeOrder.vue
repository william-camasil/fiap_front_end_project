<script setup lang="ts">
import { PropType, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Order, OrderModel } from "../../protocols";

const { order } = defineProps({
  order: Object as PropType<Order>,
});

const cart = ref<any[]>([]);
const paymentOption = ref<string>("");
const paymentOptions = ref<string[]>(["Cartão", "Dinheiro", "Pix"]);
const orderDetails = ref<OrderModel>();

const router = useRouter();

const loadOrder = () => {
  const savedCart = localStorage.getItem("cart");
  const savedPaymentOption = localStorage.getItem("paymentOption");

  if (savedCart) {
    cart.value = JSON.parse(savedCart);
  }

  if (savedPaymentOption) {
    paymentOption.value = savedPaymentOption;
  }
};

const savePaymentOption = (option: string) => {
  paymentOption.value = option;
  localStorage.setItem("paymentOption", option);
};

const finalizeOrder = async () => {
  if (cart.value.length > 0 && paymentOption.value) {
    const orderData = {
      items: cart.value,
      paymentOption: paymentOption.value,
    };

    const response = await order?.order(orderData);

    orderDetails.value = response;

    localStorage.removeItem("cart");
    localStorage.removeItem("paymentOption");
    cart.value = [];
    paymentOption.value = "";

    alert("Pedido finalizado com sucesso!");
  } else {
    alert("Carrinho vazio ou opção de pagamento não selecionada.");
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  loadOrder();
});
</script>

<template>
  <div class="order-summary-container">
    <h1>Resumo do Pedido</h1>

    <div v-if="cart.length > 0">
      <h2>Itens no Carrinho:</h2>
      <ul>
        <li v-for="(item, index) in cart" :key="index">
          Produto: {{ item.title }}, Valor: R$ {{ item.value.toFixed(2) }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Carrinho vazio. Adicione itens ao carrinho para finalizar o pedido.</p>
    </div>

    <h2>Selecione a Forma de Pagamento:</h2>
    <div>
      <select
        v-model="paymentOption"
        @change="savePaymentOption(paymentOption)"
      >
        <option value="" disabled>Selecione uma opção</option>
        <option
          v-for="(option, index) in paymentOptions"
          :key="index"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <div v-if="paymentOption">
      <h3>Opção de pagamento selecionada: {{ paymentOption }}</h3>
    </div>

    <button @click="finalizeOrder" class="finalize-btn">
      Finalizar Pedido
    </button>

    <div v-if="orderDetails">
      <h3>Resumo do Pedido:</h3>
      <p>Pedido nº: {{ orderDetails.orderNumber }}</p>
      <p>Data: {{ orderDetails.createdAt }}</p>
      <p>{{ orderDetails.message }}</p>

      <h4>Detalhes do Pedido:</h4>
      <ul>
        <li v-for="(item, index) in orderDetails.details.items" :key="index">
          - Produto: {{ item.title }}, Valor: R$ {{ item.value.toFixed(2) }}
        </li>

        <p>Tipo de pagamento: {{ orderDetails.details.paymentOption }}</p>
      </ul>
    </div>

    <button @click="goBack" class="back-btn">Voltar</button>
  </div>
</template>

<style scoped>
.order-summary-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f9;
  color: #003366;
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1,
h2,
h3,
h4 {
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
  color: #003366;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-size: 16px;
  color: #333;
}

button {
  padding: 12px 20px;
  margin-top: 30px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #003366;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #002d56;
}

select {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 10px;
  width: 200px;
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
}

.finalize-btn:hover {
  background-color: #218838;
}

.back-btn {
  margin-top: 30px;
  padding: 12px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 200px;
  text-align: center;
}

.back-btn:hover {
  background-color: #c82333;
}
</style>
