// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'https://app-finanza-4611cd32c034.herokuapp.com/api/auth/';

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + 'signin', {
                username,
                password
            })
            .then(response => {
                console.log(response.data.username);
                console.log(response.data.token);
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                    localStorage.setItem('user', JSON.stringify({ username: response.data.username }));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('authToken'); // Remove the token from localStorage
        localStorage.removeItem('user'); // Remove the user from localStorage
    }
}

export default new AuthService();