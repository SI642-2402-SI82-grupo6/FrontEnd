<template>
  <div class="content">
  <div class="login-container">
    <Form v-slot="$form" :resolver="resolver" :initial-values="initialValues"  @submit="handleLogin" >
      <h2>Login</h2>
      <img src="../../assets/logo.png" alt="Logo" class="login-image" />
      <div class="flex flex-column row-gap-6">

        <InputGroup >
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText v-model="username" placeholder="Username"  class="input-field username-field" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <Password v-model="password" placeholder="Password" input-class="input-field" />
        </InputGroup>

      </div>
      <div class="remember-register">
        <a @click.prevent="goToRegister">¿No tienes una cuenta? Crea una nueva cuenta</a>
      </div>
      <Button type="submit" label="LOGIN" class="login-btn" />
    </Form>
  </div>


  </div>
</template>
<script >

import { zodResolver } from '@primeuix/forms/resolvers/zod';
import {ref} from 'vue';
import AuthService from '../../services/AuthService'
import {z} from "zod";
export default {
  name: 'UserLogin',
  data() {
    return {
      initialValues: {
        username: '',
        password: ''
      },
      resolver: zodResolver(
          z.object({
        username: z.string().min(1, 'Username is required'),
        password: z.string().min(1, 'Password is required')
      })
      ),
      username: '',
      password: ''

    }
    },


  methods: {
    async handleLogin() {
      const data = {
        username: this.username,
        password: this.password
      };
      try {
        const response = await AuthService.login(data.username, data.password);
        this.$router.push('/home'); // Redirigir a home
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error); // Agregar más detalles en caso de error
        alert('Login failed');
      }
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
}
</script>


<style scoped>
@import url('primeicons/primeicons.css');

.content{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('../../assets/background.jpg') no-repeat center center fixed;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}
h2 {
  margin-bottom: 20px;
  color: #fff;
}

body {

  background: url('../../assets/background.jpg') no-repeat center center fixed;

  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  padding: 40px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  text-align: center;
  width: 400px;
  max-width: 100%;
  background-color: rgba(128, 0, 128, 0.8);
}

.login-container form {
  margin-bottom: 20px;
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


.remember-register {
  margin-top: 20px; /* Add 5px margin above */
  margin-bottom: 20px;
  font-size: 14px;
  color: #ffffff;
}
.remember-register a {
  color: #ffffff;
  text-decoration: none;
}

.remember-register a:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #333;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #555;
}
password.input-field {
  background-color: transparent;

  border-radius: 5px;
  margin: 10px 0;
  padding: 5px;
  width: 100%;
}



.login-image {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  object-fit: contain;
}
</style>
