<script setup lang="ts">
import MenuOptions from "../../../../presentation/pages/MenuOpcions/MenuOptions.vue";
import { MakeHamburgers } from "../../usecases/HamburgersFactory";
import { MakeAppetizers } from "../../usecases/AppetizersFactory";
</script>
<template>
  <MenuOptions :hamburgers="MakeHamburgers()" :appetizers="MakeAppetizers()" />
</template>
