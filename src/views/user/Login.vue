<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <h2>Login</h2>
      <img src="\src\assets\logo.png" alt="Logo" class="login-image">
      <div class="input-group">
        <i class="fas fa-user"></i>
        <input type="text" v-model="username" placeholder="Username" required>
      </div>
      <div class="input-group">
        <i class="fas fa-lock"></i>
        <input type="password" v-model="password" placeholder="Password" required>
      </div>
      <div class="remember-register">
        <a @click.prevent="goToRegister">Register a new user</a>
      </div>
      <button type="submit" class="login-btn">LOGIN</button>
    </form>
  </div>
</template>

<script>
import FinanceDataService from '../../services/FinanceDataService'

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods:{
    async handleLogin() {
      const data = {
        username: this.username,
        password: this.password
      };
      try {
        await FinanceDataService.signin(data);
        this.$router.push('/home');
      } catch (error) {
        alert('Login failed');
      }
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
}
</script>

<style >
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  font-size: 1px;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298, #f093fb);
}

.login-container {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 40px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;
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
  color: #fff;
}

.remember-register a {
  color: #fff;
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
  font-size: 16px;
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
  height: 200pxpx;
  margin-bottom: 20px;
  object-fit: contain; 
  border-radius: 20px; 
}


</style>