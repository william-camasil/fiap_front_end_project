<script setup lang="ts">
import MenuOptions from "../../../../presentation/pages/MenuOpcions/MenuOptions.vue";
import { MakeHamburgers } from "../../usecases/HamburgersFactory";
import { MakeAppetizers } from "../../usecases/AppetizersFactory";
import { MakeDesserts } from "../../usecases/DessertsFactory";
import { MakeBeverages } from "../../usecases/BeveragesFactory";
</script>
<template>
  <MenuOptions
    :hamburgers="MakeHamburgers()"
    :appetizers="MakeAppetizers()"
    :desserts="MakeDesserts()"
    :beverages="MakeBeverages()"
  />
</template>
