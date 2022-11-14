<script lang="ts">
    type Credentials = {
        username: string;
        password: string
    }
    export default {
        emits: ["updateLoading", "updateError", "logIn"],
        data() {
            let username: string = '';
            let password: string = '';
            let credentialsError: boolean = false;
            return {
                username,
                password,
                credentialsError
            }
        },
        methods: {
            async handleLogin() {
                if(this.username.length > 0 && this.password.length > 0) {
                    this.credentialsError = false
                    const credentials: Credentials = {
                        username: this.username,
                        password: this.password
                    }
                    this.$emit('updateLoading')
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials)
                    };

                    const response = await fetch('https://dramatic-bottlenose-hallway.glitch.me/api/login', requestOptions)
                    if(response.ok) {
                        const data = await response.json();
                        if(data.success) {
                            this.$emit('updateLoading')
                            localStorage.setItem('username', this.username)
                            localStorage.setItem('accountKey', data.key[0].accountId)
                            this.$router.push('/lists')
                        } else {
                            this.$emit('updateError')
                        }
                    } else {
                        this.$emit('updateLoading')
                        this.$emit('updateError')
                    }
                } else {
                    this.credentialsError = true
                }
            }
        }
    }
</script>
<template>
    <section class="login">
        <h1>Vueshopper</h1>
        <h2>Login</h2>
        <img src="../assets/logo.svg" alt="">
        <form action="">
            <div class="input-container">
                <label for="username">Username</label>
                <input type="text" name="username" v-model="username">
            </div>
            <div class="input-container">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password">
            </div>
            <p class="error-input" v-if="credentialsError">Input fields cannot be empty</p>
            <input type="button" value="Login" @click="handleLogin">
        </form>
        <p class="sign-up">Don't have an account? <router-link to="/signup"><span>Sign Up</span></router-link> </p>
    </section>
</template>

<style scoped>
    .login {
        margin-top: 4em;
        width: 90%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }

    h1 {
        margin: 0 auto;
    }

    img {
        width: 40vw;
        margin: 4em auto;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .input-container {
        display: flex;
        gap: 1em;
    }

    input[type="button"] {
        align-self: center;
        padding: 0.8em 0.8em;
        margin-top: 1em;
        border: none;
    }

    input, label {
        flex: 1;
        font-weight: 700;
    }
    .sign-up {
        margin-top: 4em;
        align-self: center;
        font-size: 0.8em;
    }
    .sign-up span {
        cursor: pointer;
        color: steelblue;
    }
    @media screen and (min-width: 786px) {
        .login {
            max-width: 40vw;
            margin: 0 auto;
            margin-top: 4em;
        }

        img {
            width: 15vw;
        }
  }
</style>