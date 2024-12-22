<script setup lang="ts">
import { MakeAuthentication } from "../../usecases/AuthenticationFactory";
import Login from "../../../../presentation/pages/login/Login.vue";
import { ValidationComposite } from "../../../../validation/composities";
import { ValidationBuilder } from "../../../../validation/builders";
import { MakeCurrentAccountAdapter } from "../../cache/currentAccountAdapterFactory";
import { MakeCategories } from "../../usecases/CategoriesFactory";

const validationComposite = ValidationComposite.build([
  ...ValidationBuilder.field("email").required().email().build(),
  ...ValidationBuilder.field("password").required().min(3).build(),
]);
</script>
<template>
  <Login
    :categories="MakeCategories()"
    :authentication="MakeAuthentication()"
    :currentAccount="MakeCurrentAccountAdapter()"
    :validation="validationComposite"
  />
</template>
