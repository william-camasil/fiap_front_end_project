<script setup lang="ts">
import FinalizeOrder from "../../../../presentation/pages/finalizeOrder/FinalizeOrder.vue";
import { MakeOrder } from "../../usecases/OrderFactory";
</script>
<template>
  <FinalizeOrder :order="MakeOrder()" />
</template>
