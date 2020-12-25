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
                    <li>
                        <div class="img" @click="showUpdate()">
                            <img src="../assets/edit.png" alt="Add">
                        </div>
                    </li>
                    <li>
                        <div class="img" @click="showDelete()">
                            <img src="../assets/delete.png" alt="Add">
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

        <div class="overlayAdd" v-show="showDel">
            <div class="containerDel">
                <h2>Delete Item</h2>
                <div>
                    <label for="name">Name</label>
                    <input
                        type="text"
                        id="nameDel"
                        v-model="nameForDel"
                        required
                    >
                    <div class="btn">
                        <button class="checkout" @click="hideDel()">Cancel</button>
                        <button class="cancel" @click="delData()">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="overlayAdd" v-show="showUp">
            <div class="containerUp">
                <h2>Update Item</h2>
                <div>
                    <label for="name">Old Name</label>
                    <input
                        type="text"
                        id="oldName"
                        v-model="formup.old_name_product"
                        required
                    ><br>
                    <label for="name">Name</label>
                    <input
                        type="text"
                        id="nameUp"
                        v-model="formup.name_product"
                        required
                    ><br>
                    <label for="image">Image</label>
                    <input
                        type="text"
                        id="imageUp"
                        v-model="formup.image_product"
                        required
                    ><br>
                    <label for="price">Price</label>
                    <input
                        type="number"
                        id="priceUp"
                        v-model="formup.price_product"
                        required
                    ><br>
                    <label >Category</label>
                    <select name="category" v-model="formup.id_category" required>
                        <option value="Category" disabled>Category</option>
                        <option value="1">Food</option>
                        <option value="2">Drink</option>
                    </select>
                    <div class="btn">
                        <button class="checkout" @click="hideUp()">Cancel</button>
                        <button class="cancel" @click="updateData()">Update</button>
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
            showDel : false,
            showUp : false,
            updateSubmit: false,
            nameForDel : "",
            form : {
                name_product : "",
                image_product : "",
                price_product : 0,
                id_category : null,
            },
            formup : {
                old_name_product : "",
                name_product : "",
                image_product : "",
                price_product : 0,
                id_category : null,
            },
        }
    },
    methods : {
        showAdd() {
            // this.$router.push({name : "home"}).catch((err) => {console.log(err)})
            this.show = true
        },
        showDelete() {
            // this.$router.push({name : "home"}).catch((err) => {console.log(err)})
            this.showDel = true
        },
        showUpdate() {
            // this.$router.push({name : "home"}).catch((err) => {console.log(err)})
            this.showUp = true
        },
        hideAdd() {
            this.show = false
        },
        hideDel() {
            this.showDel = false
        },
        hideUp() {
            this.showUp = false
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
                url : process.env.VUE_APP_URL + "products",
                headers : {
                    "Content-type" : "application/json"
                },
                data : getData
            })
            .then((res) => {
                alert(res.data.description);
                location.reload()
            }).catch((err) => {
                console.log(err)
            });
        },
        delData() {
            let name = this.nameForDel
            axios.delete(`http://54.175.48.28/products/del?name=${name}`)
                        .then((res) => {
                            alert(res.data.description);
                            location.reload()
                        }).catch((err) => {
                            console.log(err)
                        });
        },
        updateData() {
            let updateData = {
                oldName : this.formup.old_name_product,
                name : this.formup.name_product,
                image : this.formup.image_product,
                price : this.formup.price_product,
                idCategory : this.formup.id_category
            }
            console.log(updateData)
            
            axios({
                method : "put",
                url : process.env.VUE_APP_URL + "products",
                headers : {
                    "Content-type" : "application/json"
                },
                data : updateData
            })
            .then((res) => {
                alert(res.data.description);
                location.reload()
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
        z-index: 4;
        height: 100%;
        background-color: aliceblue;
    }
    .container-menu {
        padding: 12px 12px 12px 14px;
    }
    .container-menu .img {
        width: 100%;
        margin-bottom: 8vh;
        cursor: pointer;
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
        z-index: 5;
    }
    .containerAdd {
        width: 350px;
        background-color: white;
        margin: auto;
        height: 400px;
        margin-top: 100px;
        padding: 20px;
        border-radius: 10px;
        background-color: white;
        font-weight: bold;
        line-height: 18px;
        border: 2px solid rgb(66, 175, 243);
    }
    .containerAdd h2, .containerDel h2, .containerUp h2 {
        font-size: 22px;
        margin-bottom: 25px;
    }
    .containerAdd input, select, .containerDel input, .containerUp input {
        width: 210px;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #333;
        padding: 5px 15px;
        background-color: aliceblue;
        margin: 14px;
        box-shadow: 0 .1vw .5vw 0 rgba(0, 0, 0, .2);
    }
    .containerAdd input, .containerDel input, .containerUp input {
        font-size: 14px;
    }
    .containerAdd input:focus, select:focus, .containerDel input:focus, .containerUp input:focus {
        outline: none;
    }
    .containerAdd label, .containerDel label, .containerUp label {
        width: 20%;
        font-size: 14px;
        display: inline-block;
    }
    .containerAdd button, .containerDel button, .containerUp button {
        width: 90px;
        margin-right: 10px;
        border: none;
        padding: 7px;
        /* margin-bottom: .5vw; */
        border-radius: 5px;
        color: white;
    }
    .containerDel {
        width: 350px;
        background-color: white;
        margin: auto;
        height: 230px;
        margin-top: 100px;
        padding: 20px;
        border-radius: 10px;
        background-color: white;
        font-weight: bold;
        line-height: 18px;
        border: 2px solid rgb(66, 175, 243);
    }
    .containerUp {
        width: 350px;
        background-color: white;
        margin: auto;
        height: 450px;
        margin-top: 100px;
        padding: 20px;
        border-radius: 10px;
        background-color: white;
        font-weight: bold;
        line-height: 18px;
        border: 2px solid rgb(66, 175, 243);
    }
    .btn {
        width: 100%;
        margin: 15px;
        margin: 50px 0 30px 100px;
    }
    .cancel {
        background-color: rgb(255, 64, 89);
        cursor: pointer;
    }
    .cancel:focus, .checkout:focus {
        outline: none;
    }
    .checkout {
        background-color: rgb(66, 175, 243);
        cursor: pointer;
    }
</style>