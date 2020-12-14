<template>
    <div class="container-fluit">
        <header>
            <div class="container-head">
                <select class="dropdown" v-model="selected" @click="orderBy()">
                    <option disabled>Order By</option>
                    <option>Name</option>
                    <option>Price</option>
                    <option>Category</option>
                </select>
                <h3>Food Items</h3>
                <div class="search">
                    <form action="#">
                        <input id="search" type="text" placeholder="Search" v-model="getSearch">
                        <label for="search">
                            <div class="img">
                                <img src="../assets/magnifying-glass.png" alt="Icon">
                            </div>
                        </label>
                        <div class="clear"></div>
                    </form>
                </div>
                <div class="clear"></div>
            </div>
        </header>

        <main>
            <aside>
                <Menu/>
            </aside>
            <aside class="sidebar">
                <h3>Cart <span>0</span></h3>
                <div class="container-sidebar" v-show="show">
                    <div class="img">
                        <img src="../assets/food-and-restaurant.png" alt="Icon">
                    </div>
                    <h4>Your cart is empty</h4>
                    <p>Please add some items from the menu</p>
                </div>
                <div class="pay" v-show="!show">
                    <p class="total">Total: Rp. {{calculated}}*</p>
                    <p class="ppn">*Belum termasuk ppn</p>
                    <button class="checkout" @click="showPopup()">Checkout</button>
                    <button class="cancel" @click="clear()">Cancel</button>
                </div>
            </aside>

            <section>
                <div class="container-main">
                    <div class="main">
                        <div class="loop" v-for="card in datas" :key="card.id_product">
                            <div class="if" 
                            v-if="String(card.name_product).toLowerCase().includes(getSearch) 
                            || Number(getSearch) >= card.price_product" 
                            @click="addChart(card)"
                            >
                                <Card
                                    :images = "card.image_product"
                                    :name = "card.name_product"
                                    :price = "Number(card.price_product)"
                                    :Data = "card"
                                />
                            </div>
                            <!-- <button class="del" @click="clearChart()">Del</button> -->
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <div class="overlayPopup" v-show="!showPop" @click="hidePopup()">
            <Popup/>
        </div>
    </div>
</template>

<script>
import Card from '../components/card'
import Menu from '../components/menu'
import Popup from '../components/popup'
import axios from 'axios'

export default {
    name : "product",
    components : {
        Card,
        Menu,
        Popup,
    },
    data() {
        return {
            datas : JSON.parse(localStorage.getItem("data")),
            getSearch : "",
            chart : [],
            show : true,
            showPop : true,
            selected: "",
            options: [
                { text: 'Name', value: 'name_product' },
                { text: 'Price', value: 'price_product' },
                { text: 'Category', value: 'id_category' }
            ]
        }
    },
    methods : {
        addChart(value) {
            this.chart.push(value)
            this.show = false
        },
        // toDetail(data) {
        //     // berpindah halaman + passing data
        //     this.$router.push({ path: "/detail", params: { data: data } })
        // },
        showPopup() {
            this.showPop = false
        },
        hidePopup() {
            this.showPop = true
        },
        clearChart() {
            this.chart.pop()
        },
        clear() {
            this.chart = []
            this.show = true
            this.showPop = true
        },
        sortBy() {
            let getName = this.datas.map( item => item.name_product)
            console.log(getName)
        },
        addData(value) {
            axios({
                method: "post",
                url: process.env.VUE_APP_API,
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    name: value.name_product,
                    image: value.image_product,
                    price: value.price_product,
                    category: value.id_category
                },
            })
        },
        orderBy(value) {
            axios.get(`http://localhost:9000/product/search/ordered?orderBy=${value}&order=ASC`)
            .then((res) => {
                this.datas = res.data.result;
                console.log(this.datas)
            }).catch((err) => {
                console.log(err)
            });
        }
        // addData() {
        //     // let getData = {
        //     //     name : this.name,
        //     //     image : this.image,
        //     //     price : this.price,
        //     //     category : this.category
        //     // }
        //     axios({
        //         methods : "post",
        //         url : "http://localhost:9000/product/",
        //         headers : {
        //             "Content-type" : "application/json"
        //         },
        //         data : {
        //             name : this.name_product,
        //             image : this.image_product,
        //             price : this.price_product,
        //             category : this.id_category
        //         }
        //     })
        //     .then((res) => {
        //         console.log(res.data)
        //     }).catch((err) => {
        //         console.log(err)
        //     });
        // },
    },
    computed : {
        calculated() {
            let count = 0
            for (const data of this.chart) {
                count += Number(data.price_product)
            }
            return count
        }
    },
    mounted() {
        axios.get("http://localhost:9000/product/")
        .then((res) => {
            // this.datas = res.data.result
            const dataSet = JSON.stringify(res.data.result)
            localStorage.setItem("data", dataSet)
        }).catch((err) => {
            console.log(err)
            this.$router.push({ path: "/" })
        });
    },
}
</script>

<style scoped>
    .dropdown {
        width: 15%;
        position: absolute;
    }
    .container-head {
        width: 71%;
        height: 60px;
        position: fixed;
        background-color: aliceblue;
        left: 60px;
        line-height: 60px;
        z-index: 1;
    }
    .container-head h3 {
        width: 70%;
        float: left;
        font-size: 24px;
        text-align: center;
    }
    .search {
        line-height: 60px;
        justify-content: center;
        margin-right: 10px;
    }
    .search input {
        float: left;
        width: 15%;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #333;
        background-color: aliceblue;
        margin-top: 18px;
        font-size: 14px;
    }
    .search input:focus {
        outline: none;
    }
    .search .img img {
        width: 22px;
        margin: 16px 0 0 10px;
    }

    .container-main {
        width: 71%;
        height: 100%;
        background-color: #ececec;
        left: 60px;
        top: 60px;
        padding-right: .5vw;
        padding-top: 1.5vw;
        /* padding: 2vw 0 2vw 2vw; */
        box-shadow: inset .1vw .1vw .7vw 0 rgba(0, 0, 0, .1);
        position: relative;
    }
    .main {
        width: 100%;
        height: 100%;
        /* background-color: darkgoldenrod; */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align: center;
        justify-content: center;
    }

    .sidebar {
        width: 25%;
        right: 0;
        top: 0;
        position: fixed;
        position: fixed;
        z-index: 2;
        height: 100%;
        background-color: white;
        box-shadow: 0 .1vw .5vw 0 rgba(0, 0, 0, .1);
    }
    .sidebar h3, .sidebar h4, .sidebar .img {
        width: 100%;
        font-weight: bold;
    }
    .sidebar h3 {
        font-size: 24px;
        text-align: center;
        line-height: 60px;
        background-color: white;
        border-bottom: .2vw solid rgba(0, 0, 0, .1);
    }
    .sidebar h4 {
        font-size: 1.7vw;
        text-align: center;
    }
    .sidebar .img {
        margin-top: 2vw;
        text-align: center;
    }
    .sidebar .img img {
        width: 50%;
    }
    .sidebar span {
        width: 2vw;
        height: 2vw;
        padding: 0 .5vw;
        border-radius: 50%;
        background-color: cyan;
        color: white;
    }
    .container-sidebar p {
        color: #ccc;
        text-align: center;
        margin-top: .5vw;
    }
    .pay {
        margin-top: 32vw;
        margin-left: 10%;
        /* background-color: cyan; */
    }
    .pay p {
        padding: .5vw;
        margin-left: .5vw;
    }
    .pay button {
        width: 90%;
        margin-left: 5%;
        border: none;
        padding: .5vw;
        margin-bottom: .5vw;
        border-radius: 5px;
        color: white;
    }
    .ppn {
        font-size: .9vw;
    }
    .total {
        font-weight: bold;
    }
    .cancel {
        background-color: rgb(255, 64, 89);
    }
    .checkout {
        background-color: rgb(66, 175, 243);
    }

    @media (max-width: 1000px) {
        .container-main {
            padding-right: 2vw;
        }
    }
    @media (max-width: 900px) {
        .container-main {
            padding-right: 3vw;
        }
        .dropdown {
            margin-top: 2vw;
        }
    }
    @media (max-width: 700px) {
        .search input {
            width: 10%;
        }
    }
    @media (max-width: 600px) {
        .dropdown {
            margin-top: 3vw;
        }
        .container-main {
            padding-right: 5vw;
        }
        .search input {
            font-size: 12px;
        }
    }
</style>