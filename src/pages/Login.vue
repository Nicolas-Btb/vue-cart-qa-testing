<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      if (this.username && this.password) {
        const user = { username: this.username, token: "some-token" };

        localStorage.setItem("user", JSON.stringify(user));

        this.$router.push("/");
      } else {
        alert("Please enter both username and password");
      }
    },
  },
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="logo-container">
        <h2 class="logo-text">Qa Testing</h2>
      </div>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            data-cy="module_login_input_username"
            class="input-field"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            data-cy="module_login_input_password"
            class="input-field"
          />
        </div>
        <button type="submit" data-cy="module_login_button_submit" class="submit-btn">Login</button>
      </form>
      <p class="signup-link">Don't have an account? Don't worry, all credentials are good</p>
    </div>
  </div>
</template>

<style scoped>
/* Base reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Background gradient */
body {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  font-family: "Arial", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Container for login form */
.login-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding-top: 50px;
}

.login-container {
  background-color: #fff;
  padding: 40px;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-out;
}

/* Logo style */
.logo-container {
  text-align: center;
  margin-bottom: 30px;
}

.logo-text {
  font-size: 36px;
  font-weight: bold;
  color: #2575fc;
  letter-spacing: 1px;
}

/* Form styling */
.login-form {
  display: flex;
  flex-direction: column;
}

/* Input field styling */
.form-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px 15px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #2575fc;
  background-color: #e6f0ff;
  outline: none;
}

/* Submit button styling */
button {
  padding: 12px 20px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #6a11cb;
}

/* Signup link style */
.signup-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.signup-link a {
  color: #2575fc;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
