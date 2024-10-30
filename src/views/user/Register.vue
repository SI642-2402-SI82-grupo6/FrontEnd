<template>
  <div class="register-container">
    <div class="login-btn">
      <a @click="goToLogin">¿Tienes una cuenta? Inicia sesion</a>
    </div>

    <form @submit.prevent="handleRegister">
      <h2>Register</h2>
      <img src="../../assets/logo.png" alt="Logo" class="login-image">
      <div class="input-group">
        <i class="fas fa-user"></i>
        <input type="text" v-model="username" placeholder="Username" required>
      </div>
      <div class="input-group">
        <i class="fas fa-envelope"></i>
        <input type="email" v-model="email" placeholder="Email" required>
      </div>
      <div class="input-group">
        <i class="fas fa-lock"></i>
        <input type="password" v-model="password" placeholder="Password" required>
      </div>
      <button type="submit" class="register-btn">REGISTER</button>
    </form>

  </div>

</template>

<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import FinanceDataService from '../../services/FinanceDataService';

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

    const goToLogin = () => {
      router.push('/login');
    };

    return {
      username,
      email,
      roles,
      password,
      handleRegister,
      goToLogin
    };
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  font-size: 20px;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298, #f093fb);
}

.register-container {
  background-color: rebeccapurple;
  padding: 40px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 500px;
}

h2 {
  margin-bottom: 20px;
  color: #fff;
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




::placeholder {
  color: #aaa;
}

select option {
  color: #333;
}

.login-image {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  object-fit: contain;
  border-radius: 20px;
}
</style>