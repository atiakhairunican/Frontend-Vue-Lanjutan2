<template>
    <div class="container">
        <div class="overlay">
            <div class="containerLogin">
                <div class="login" v-show="!show">
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
                        <button class="checkout" @click="login()">Login</button>
                    </div>
                    <p>New user ? <span @click="show=true">SIGN UP</span></p>
                </div>

                <div class="regis" v-show="show">
                    <div>
                        <label for="nameRegis"><b-icon icon="person-fill"></b-icon></label>
                        <input
                            type="text"
                            id="nameRegis"
                            placeholder="Name"
                            v-model="formRegister.name"
                            required
                        >
                    </div>
                    <label for="emailRegis"><b-icon icon="envelope-fill"></b-icon></label>
                    <input
                        type="text"
                        id="emailRegis"
                        placeholder="Email Address"
                        v-model="formRegister.email"
                        required
                    ><br>
                    <label for="passwordRegis"><b-icon icon="lock-fill"></b-icon></label>
                    <input
                        type="password"
                        id="passwordRegis"
                        placeholder="Password"
                        v-model="formRegister.password"
                        required
                    >
                    <div class="btn">
                        <button class="checkout" @click="register(formRegister)">Register</button>
                    </div>
                    <p>Have an account ? <span @click="show=false">SIGN IN</span></p>
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
                dataToken : localStorage.getItem("access_token"),
                dataRole : localStorage.getItem("access_role"),
                formLogin : {
                    email : null,
                    password : null
                },
                formRegister : {
                    name : null,
                    email : null,
                    password : null,
                    role : "customer"
                }
            }
        },
        methods: {
            login() {
                let getUsers = {
                    email : this.formLogin.email,
                    password : this.formLogin.password,
                }
                
                if (getUsers.email == undefined || getUsers.password == undefined) {
                    return alert("Make sure all data is filled.")
                }

                axios({
                method : "post",
                url : process.env.VUE_APP_URL + "auth",
                headers : {
                    "Content-type" : "application/json"
                },
                data : getUsers,
                })
                .then((res) => {
                    if (res.data.result[0].message != "Token created") {
                        alert(res.data.result[0].message);
                    }
                    else {
                        const datas = res.data.result[0];
                        console.log(datas);
                        localStorage.setItem("access_token", datas.token);
                        localStorage.setItem("access_role", datas.role);
                        this.$router.push({ path: "/"})
                        location.reload()
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            register(data) {
                if (data.name == undefined || data.email == undefined || data.password == undefined) {
                    return alert("Make sure all data is filled.")
                }

                axios({
                    method : "post",
                    url : process.env.VUE_APP_URL + "users", data,
                    headers : {
                        "Content-type" : "application/json"
                    },
                })
                .then((res) => {
                        alert(res.data.description, ", user added! Please login.");
                        this.$router.push({ path: "/login"})
                        location.reload()
                }).catch((err) => {
                    alert("Email is already registered.")
                    console.log(err)
                });
            }
        },
    }
</script>

<style scoped>
    .container {
        width: 50%;
        height: 100%;
        position: fixed;
        /* background-color: rgb(155, 38, 38); */
        background-color: rgb(210, 232, 252);
    }
    .overlay {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
        /* background-color: rgba(0, 0, 0, .4); */
    }
    .containerLogin {
        width: 350px;
        height: 400px;
        margin: 10% auto;
        padding: 90px 40px 40px 40px;
        background-image: url("../assets/b3.jpg");
        box-shadow: 0 5px 30px 0 rgba(0, 0, 0, .4);
    }
    button, input {
        width: 100%;
        padding: 9px 35px;
        font-size: 13px;
        border: none;
        margin: 5px;
    }
    input:focus {
        outline: none;
    }
    button {
        color: white;
        margin: -10px 0 0 -97px;
        background-color: rgb(222, 75, 81);
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