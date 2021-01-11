<template>
    <div class="container-fluit" @mouseover="showHover()" @mouseleave="hideHover()">
        <div class="main-card" @click="showOverlay(Data)">
            <div class="card">
                <div class="pic">
                    <img :src="images" :alt="name">
                </div>
                <div class="content">
                    <p class="name">{{ name }}</p>
                    <p class="price">Rp. {{ price }}</p>
                </div>
            </div>
            <div :class="hoverShow ? 'hover show' : 'hide'">
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
            hoverShow: false,
        }
    },
    methods : {
        showOverlay(value) {
            this.$emit('addProd', value)
        },
        showHover() {
            this.hoverShow = true
        },

        hideHover() {
            this.hoverShow = false
        },
    }
}
</script>

<style scoped>
    .card {
        width: 250px;
        height: 260px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        box-shadow: 0 .1vw .5vw 0 rgba(0, 0, 0, .1);
        margin: 1.47vw;
        position: relative;
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
    .hover {
        width: 250px;
        height: 260px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 1;
        cursor: pointer;
        margin: -280px 0 0 20px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: rgba(0, 0, 0, .5);
    }
    .hide {
        display: none;
    }
</style>