<template>
    <div class="container-fluit">
        <!-- <div class="chart" v-if="chart.length > 0">
            <h2>Chart = {{chart.length}}</h2>
            <h2 @click="clearChart()">Clear</h2>
            <h2>Price = {{calculated}}</h2>
        </div>
        <div class="inp">
            <input type="text" v-model="max">
            <input type="range" min="0" max="70000" v-model="max">
        </div>
        <div :class="blue ? 'blue' : 'red'" v-for="card in datas" :key="card.id_product">
            <div class="if" v-if="max >= Number(card.price_product)">
                <Card
                    :images = "card.image_product"
                    :name = "card.name_product"
                    :price = "card.price_product"
                />
                <div class="btn">
                    <button @click="addChart(card)">Add</button>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>

// import Card from '../components/card'
// import axios from 'axios'

// export default {
//     name : "product",
//     components : {
//         Card,
//     },
//     data() {
//         return {
//             datas : null,
//             max : 70000,
//             chart : [],
//             blue : false
//         }
//     },
//     methods : {
//         addChart(value) {
//             this.chart.push(value)
//             this.blue = !this.blue
//         },
//         clearChart() {
//             this.chart.pop()
//         },
//         goHome() {
//             this.$router.push({path: "/history"})
//         }
//     },
//     computed : {
//         calculated() {
//             let harga = 0
//             for (const data of this.chart) {
//                 harga += Number(data.price_product)
//             }
//             return harga
//         }
//     },
//     mounted() {
//         axios.get("http://localhost:9000/product")
//         .then((res) => {
//             this.datas = res.data.result
//         }).catch((err) => {
//             console.log(err)
//         });
//     }
// }
</script>

<style scoped>
    /* .blue {
        background-color: bisque;
    }
    .red {
        background-color: burlywood;
    } */
</style>