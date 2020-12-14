<template>
    <div class="container-fluit">
		<aside class="menu-bar">
            <div class="container-menu">
                <ul>
                    <li>
                        <a href="#">
                            <div class="img">
                                <img src="../assets/menu.png" alt="Menu">
                            </div>
                        </a>
                    </li>
                    <li>
                        <router-link to="/">
                            <div class="img">
                                <img src="../assets/fork.png" alt="Fork">
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/history">
                            <div class="img">
                                <img src="../assets/clipboard.png" alt="Clipboard">
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <div class="img" @click="showAdd()">
                            <img src="../assets/add.png" alt="Add">
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
        <div class="overlayAdd" v-show="show">
            <div class="containerAdd">
                <h2>Add Item</h2>
                <div>
                    <label for="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        v-model="form.name_product"
                        required
                    ><br>
                    <label for="image">Image</label>
                    <input
                        type="text"
                        id="image"
                        v-model="form.image_product"
                        required
                    ><br>
                    <label for="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        v-model="form.price_product"
                        required
                    ><br>
                    <label >Category</label>
                    <select name="category" v-model="form.id_category" required>
                        <option value="Category" disabled>Category</option>
                        <option value="1">Food</option>
                        <option value="2">Drink</option>
                    </select>
                    <div class="btn">
                        <button class="checkout" @click="hideAdd()">Cancel</button>
                        <button class="cancel" @click="addData()">Add</button>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
    name : "menu-page",
    data() {
        return {
            show : false,
            updateSubmit: false,
            form : {
                name_product : "",
                image_product : "",
                price_product : 0,
                id_category : null,
            },
        }
    },
    methods : {

        showAdd() {
            this.$router.push({name : "home"}).catch((err) => {console.log(err)})
            this.show = true
        },
        hideAdd() {
            this.show = false
        },
        addData() {
            let getData = {
                name : this.form.name_product,
                image : this.form.image_product,
                price : this.form.price_product,
                idCategory : this.form.id_category
            }
            console.log(getData)
            
            axios({
                method : "post",
                url : "http://localhost:9000/product/",
                headers : {
                    "Content-type" : "application/json"
                },
                data : getData
            })
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            });
        },
    }
}

</script>

<style scope>
    .menu-bar {
        width: 60px;
        position: fixed;
        top: 0;
        z-index: 1;
        height: 100%;
        background-color: aliceblue;
    }
    .container-menu {
        padding: 12px 12px 12px 14px;
    }
    .container-menu .img {
        width: 100%;
        margin-bottom: 8vh;
    }
    .menu-bar .img img {
        width: 80%;
    }
    ul {
        list-style-type: none;
    }

    .overlayAdd {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .5);
        position: fixed;
        z-index: 3;
    }
    .containerAdd {
        width: 30%;
        background-color: white;
        margin: auto;
        height: 70%;
        margin-top: 7%;
        padding: 2vw;
        border-radius: 10px;
        background-color: white;
        font-weight: bold;
        line-height: 2.5vw;
        border: 2px solid rgb(66, 175, 243);
    }
    .containerAdd h2 {
        margin-bottom: 2vw;
    }
    .containerAdd input, select {
        margin: 0 .5vw 0 1.5vw;
        width: 70%;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #333;
        padding: .5vw 1vw;
        background-color: aliceblue;
        margin: 1vw;
        box-shadow: 0 .1vw .5vw 0 rgba(0, 0, 0, .2);
    }
    .containerAdd input {
        font-size: 14px;
    }
    .containerAdd input:focus, select:focus {
        outline: none;
    }
    .containerAdd label {
        width: 20%;
        display: inline-block;
    }
    .containerAdd button {
        width: 25%;
        margin-right: 3%;
        border: none;
        padding: .5vw;
        margin-bottom: .5vw;
        border-radius: 5px;
        color: white;
    }
    .btn {
        width: 100%;
        margin: 6vw 0 5% 12vw;
    }
    .cancel {
        background-color: rgb(255, 64, 89);
    }
    .cancel:focus, .checkout:focus {
        outline: none;
    }
    .checkout {
        background-color: rgb(66, 175, 243);
    }
</style>