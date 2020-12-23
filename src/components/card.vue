<template>
    <div class="container-fluit">
        <div class="main-card" @click="show = true">
            <div class="card">
                <div class="pic">
                    <img :src="images" :alt="name">
                </div>
                <div class="content">
                    <p class="name">{{ name }}</p>
                    <p class="price">Rp. {{ price }}</p>
                </div>
            </div>
            <!-- <div class="overlay" v-show="show" @click="show = false">
                <b-icon icon="check-circle"></b-icon>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "card",
    props : {
        images : {
            type : String,
            required : true
        },
        name : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        Data : {
            type : Object
        }
    },
    data() {
        return {
            show : false
        }
    }
}
</script>

<style scoped>
    .card {
        width: 250px;
        height: 260px;
        background-color: rgb(217, 168, 86);
        /* background-color: darkkhaki; */
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        box-shadow: 0 .1vw .5vw 0 rgba(0, 0, 0, .1);
        margin: 1.47vw;
        position: relative;
        cursor: pointer;
    }
    .pic img {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .content {
        padding: 5px 14px;
        font-size: 16px;
        line-height: 16px;
    }
    .price {
        font-weight: bold;
        margin: 5px 0;
        font-size: 15px;
    }
    .overlay {
        position: absolute;
        width: 250px;
        height: 260px;
        z-index: 2;
        margin: -20.5vw 0 0 1.45vw;
        background-color: rgba(0, 0, 0, .3);
        text-align: center;
        line-height: 260px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
</style>