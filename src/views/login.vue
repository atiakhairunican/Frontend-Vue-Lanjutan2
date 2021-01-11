<template>
    <div class="container">
        <div class="overlay">
            <div class="bg-image"></div>
            <div class="containerLogin">
                <div class="login" v-show="!show">
                    <h1>LOGIN</h1>
                    <label for="email"><b-icon icon="envelope-fill" font-scale="1"></b-icon></label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email Address"
                        v-model="formLogin.email"
                        required
                    ><br>
                    <label for="password"><b-icon icon="lock-fill"></b-icon></label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        v-model="formLogin.password"
                        required
                    >
                    <div class="btn">
                        <button class="checkout" @click="login(formLogin)">Login</button>
                    </div>
                    <p>New user ? <span @click="showRegis()">REGISTER</span></p>
                </div>

                <div class="regis" v-show="show">
                    <h1>REGISTER</h1>
                    <div>
                        <label for="nameRegis"><b-icon icon="person-fill"></b-icon></label>
                        <input
                            type="text"
                            id="nameRegis"
                            placeholder="Name"
                            v-model="name"
                            required
                        >
                    </div>
                    <label for="emailRegis"><b-icon icon="envelope-fill"></b-icon></label>
                    <input
                        type="text"
                        id="emailRegis"
                        placeholder="Email Address"
                        v-model="email"
                        required
                    ><br>
                    <span class="msg">{{msgEmail}}</span>
                    <label for="passwordRegis"><b-icon icon="lock-fill"></b-icon></label>
                    <input
                        type="password"
                        id="passwordRegis"
                        placeholder="Password"
                        v-model="password"
                        required
                    ><br>
                    <span class="msg">{{msgPassword}}</span>
                    <div class="btn">
                        <button class="checkout" @click="register(name, email, password)">Register</button>
                    </div>
                    <p>Have an account ? <span @click="showLogin()">LOGIN</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        name : "login",
        data() {
            return {
                show : false,
                name : null,
                email : null,
                password : null,
                formLogin : {
                    email : null,
                    password : null
                },
                msgEmail : null,
                msgPassword : null,
            }
        },
        methods: {
            showRegis() {
                this.show = true
                this.formLogin.email = null
                this.formLogin.password = null
            },
            showLogin() {
                this.show = false
                this.name = null
                this.email = null
                this.password = null
                this.msgEmail = null
                this.msgPassword = null
            },
            login(data) {
                this.$store.dispatch("login", data)
                .then(() => {
                    this.$router.push({ path: "/"}).catch((err) => {err})
                    location.reload()
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            register(data) {
                data = {
                    name : this.name,
                    email : this.email,
                    password : this.password,
                    role : "customer"
                }
                if (data.name == undefined || data.email == undefined || data.password == undefined) {
                    return alert("Make sure all data is filled.")
                }
                if (this.msgEmail != '' || this.msgPassword != '') {
                    return alert("Make sure all data is correct.")
                }

                axios({
                    method : "post",
                    url : process.env.VUE_APP_URL + "users", data,
                    headers : {
                        "Content-type" : "application/json"
                    },
                })
                .then(() => {
                        alert("User added! Please login.");
                        this.$router.push({ path: "/login"}).catch((err) => {err})
                        location.reload()
                }).catch((err) => {
                    alert("Email is already registered.")
                    console.log(err)
                });
                this.show = false
            },
        },
        watch : {
            email : function() {
                this.msgEmail = this.validateEmail
            },
            password : function() {
                this.msgPassword = this.validatePassword
            }
        },
        computed : {
            validateEmail() {
                if (this.email != null) {
                    let reg = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if (reg.test(this.email)) {
                        return ''
                    }
                    else {
                        return 'Invalid email address'
                    }
                }
                else {
                    return this.email
                }
            },
            validatePassword() {
                if (this.password != null) {
                    let difference = 8 - this.password.length;
                    if (this.password.length < 8) {
                        return `Must be 8 characters! ${difference} characters left`
                    }
                    else {
                        return ''
                    }
                }
                else {
                    return this.password
                }
            },
        }
    }
</script>

<style scoped>
    body {
        height: 100%;
    }
    .msg {
        width: fit-content;
        display: block;
        font-size: 11px;
        color: red;
        text-align: center;
        margin: 0 5px;
        position: relative;
        padding: 3px 8px;
        border-radius: 3px;
        z-index: 1;
    }
    .bg-image {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: -1;
        background-image: url('../assets/7.jpeg');
        background-position: center;
        background-size: cover;
        filter: blur(5px) ;
        -webkit-filter: blur(5px) ;
    }
    .container {
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,.7);
        color: white;
        font-weight: bold;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        width: 100%;
        height: 100%;
        padding: 20px;
        text-align: center;
    }
    .overlay {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
    }
    .containerLogin {
        width: 350px;
        height: 400px;
        margin: 10% auto;
        padding: 30px 40px 40px 40px;
        background-image: url("../assets/b3.jpg");
        box-shadow: 0 5px 30px 0 rgba(0, 0, 0, .4);
        background: rgb(0, 0, 0);
        background: rgba(0, 0, 0, .4);
    }
    h1 {
        margin: 20px;
    }
    button, input {
        width: 100%;
        padding: 9px 35px;
        font-size: 13px;
        border: none;
        margin: 5px;
        color: white;
        background: rgba(0, 0, 0, .4);
    }
    input:focus {
        outline: none;
    }
    button {
        color: white;
        margin: -10px 0 0 -197px;
        background-color: red;
        border-radius: 20px;
    }
    label {
        position: absolute;
        margin: 14px 0 0 15px;
    }
    p {
        width: 100%;
        font-size: 12px;
        text-align: center;
        margin-top: -20px;
    }
    span {
        color: blue;
        cursor: pointer;
    }
</style>