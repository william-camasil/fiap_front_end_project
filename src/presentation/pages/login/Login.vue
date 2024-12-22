<script setup lang="ts">
import { PropType, ref } from "vue";
import { Authentication, Validation } from "../../protocols";
import { useRouter } from "vue-router";

const { authentication, currentAccount, validation } = defineProps({
  authentication: Object as PropType<Authentication>,
  validation: Object as PropType<Validation>,
  currentAccount: Function as PropType<any>,
});

const email = ref<string>("");
const password = ref<string>("");
const fieldErrror = ref<string>("");
const valid = ref<boolean>(true);

const router = useRouter();

const changeValue = (event: Event) => {
  const { name, value } = event.target as HTMLInputElement;
  fieldErrror.value = validation.validate(name, value);
  valid.value = Boolean(validation.validate(name, value));
};

const login = async () => {
  const params = {
    login: email.value,
    password: password.value,
  };

  try {
    const response = await authentication.auth(params);
    currentAccount.set(response);
    router.push("/home");
  } catch (error) {
    alert(`error: ${error}`);
    console.error(error);
  } finally {
    console.log("finally");
  }
};
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="input-group">
        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          v-model="email"
          @input="changeValue"
          placeholder="Username"
        />
        <span class="error-message">{{ fieldErrror }}</span>
      </div>
      <div class="input-group">
        <label for="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          @input="changeValue"
          placeholder="Password"
        />
      </div>
      <button type="submit" :disabled="valid" class="submit-btn">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fff;
  color: #003366;
  font-family: Arial, sans-serif;
}

.login-form {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
  color: #003366;
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 93%;
}

label {
  font-size: 16px;
  font-weight: bold;
  color: #003366;
  margin-bottom: 5px;
}

input {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #003366;
  border-radius: 4px;
  background-color: #f9f9f9;
  color: #333;
  margin-bottom: 8px;
  width: 100%;
}

.error-message {
  font-size: 12px;
  color: #ff4d4d;
  margin-top: 5px;
}

.submit-btn {
  background-color: #003366;
  color: #fff;
  border: none;
  padding: 12px;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:disabled {
  background-color: #7a7a7a;
  cursor: not-allowed;
}

.submit-btn:hover {
  background-color: #002d56;
}
</style>
