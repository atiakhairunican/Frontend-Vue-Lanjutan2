<template>
    <div class="container-fluit">
        <div class="main-card">
            <div class="card"  @click="show = true">
                <div class="pic">
                    <img :src="images" :alt="name">
                </div>
                <div class="content">
                    <p>{{ name }}</p>
                    <p class="price">Rp. {{ price }}</p>
                </div>
            </div>
            <div class="overlay" v-show="show" @click="show = false">
                <b-icon icon="check-circle"></b-icon>
            </div>
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
    },
    // methods : {
    //     goDetail() {
    //         console.log(this.Data)
    //         this.$router.push({ name: "detail", params: { data: this.Data } })
    //     },
    // }
}
</script>

<style scoped>
    .card {
        background-color: darkkhaki;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        box-shadow: 0 .1vw .5vw 0 rgba(0, 0, 0, .1);
        margin: 1.47vw;
        position: relative;
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
        width: 26.2%;
        z-index: 2;
        height: 19.1vw;
        margin: -20.5vw 0 0 1.45vw;
        background-color: rgba(0, 0, 0, .3);
        text-align: center;
        line-height: 19.1vw;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
</style>