<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <h2>Login</h2>
      <img src="../../assets/logo.png" alt="Logo" class="login-image">
      <div class="input-group">
        <i class="fas fa-user"></i>
        <input type="text" v-model="username" placeholder="Username" required>
      </div>
      <div class="input-group">
        <i class="fas fa-lock"></i>
        <input type="password" v-model="password" placeholder="Password" required>
      </div>
      <div class="remember-register">
        <a @click.prevent="goToRegister">¿No tienes una cuenta? Crea una nueva cuenta</a>
      </div>
      <button type="submit" class="login-btn">LOGIN</button>
    </form>
  </div>
</template>

<script>

import AuthService from '../../services/AuthService'
export default {
  name: 'UserLogin',
  data() {
    return {
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
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

.login-container {
  padding: 40px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  text-align: center;
  width: 500px;
  background-color: rgba(128, 0, 128, 0.8); /* Color de fondo semitransparente */
}

.login-container form {
  margin-bottom: 20px;
}

.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-group i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #1a1a1a;
}

.input-group input {
  width: 100%;
  padding: 10px 40px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 30px;
  outline: none;
  font-size: 14px;
  color: #333;
}

.remember-register {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 20px;
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

::placeholder {
  color: #aaa;
}

.login-image {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  object-fit: contain;
  border-radius: 20px;
}
</style>
