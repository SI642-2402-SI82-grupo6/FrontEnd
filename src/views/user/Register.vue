<template>
  <div class="register-container">
    <Form v-slot="$form" :resolver="resolver" :initial-values="initialValues"  @submit.prevent="handleRegister">
      <div class="login-btn">
        <a @click="goToLogin">¿Tienes una cuenta? Inicia sesion</a>
      </div>
      <h2>Register</h2>
      <img src="../../assets/logo.png" alt="Logo" class="login-image">
      <div class="flex flex-column row-gap-6" >
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText v-model="username" placeholder="Username"  class="input-field username-field" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-at"></i>
          </InputGroupAddon>
          <InputText v-model="email" placeholder="Email"  class="input-field username-field" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <Password v-model="password" placeholder="Password">
            <template #header>
              <div class="font-semibold text-xm mb-4">Pick a password</div>
            </template>
            <template #footer>
              <Divider />
              <ul class="pl-2 ml-2 my-0 leading-normal">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
              </ul>
            </template>
          </Password>
        </InputGroup>

      <button type="submit" class="register-btn">REGISTER</button>
      </div>
    </Form>

  </div>

</template>

<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import FinanceDataService from '../../services/FinanceDataService';
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from 'zod';
export default {
  name: 'UserRegister',
  setup() {
    const username = ref('');
    const email = ref('');
    const roles = ref(['admin']);
    const password = ref('');
    const router = useRouter();

    const handleRegister = async () => {
      const data = {
        username: username.value,
        email: email.value,
        roles: roles.value,
        password: password.value
      };
      console.log(data);
      try {
        await FinanceDataService.signup(data);
        await router.push('/login');
      } catch (error) {
        alert('Registration failed');
      }
    };
    const initialValues = {
      username: '',
      email: '',
      password: ''
    };

    const resolver = ref(zodResolver(
        z.object({
          username: z.string().min(1, { message: 'Username is required.' }),
          email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Invalid email address.' }),
          password: z.string().min(1, { message: 'Password is required.' }),
        })
    ));

    const goToLogin = () => {
      router.push('/login');
    };

    return {
      username,
      email,
      roles,
      password,
      handleRegister,
      goToLogin,
      initialValues,
      resolver,
    };
  }
};
</script>

<style scoped>
@import url('primeicons/primeicons.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  font-size: 20px;
}

body {
  background: url('../../assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-container {
  padding: 40px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  text-align: center;
  width: 400px;
  max-width: 100%;
  background-color: rgba(128, 0, 128, 0.8);
}

h2 {
  margin-bottom: 20px;
  color: #fff;
}



.input-group i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #1a1a1a;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 10px 40px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 30px;
  outline: none;

  color: #333;
  font-size: 18px;
}

.input-group select {
  padding-left: 40px;
}

.register-btn {
  width: 100%;
  padding: 10px;
  background-color: #333;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.register-btn:hover {
  background-color: #555;
}

.login-btn {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 20px;
  color: #ffffff;
}
.login-btn a {
  color: #ffffff;
  text-decoration: none;
}
.login-btn a:hover {
  text-decoration: underline;
}


.input-field {
  width: 100%;
  padding: 12px 40px;
  background-color: white;
  border: none;
  outline: none;
  font-size: 14px;
  height: 40px;

}

.username-field {
  border: 1px solid lightgray;
  text-align: left; /* Align text to the left */
  padding-left: 10px; /* Ensure text is not too close to the border */
}


::placeholder {
  color: #aaa;
}

select option {
  color: #333;
}

.login-image {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  object-fit: contain;
}
</style>