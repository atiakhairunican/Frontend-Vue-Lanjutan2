<template>
    <div class="container-fluid">
        <aside class="sidebar">
            <h3>Cart <span>0</span></h3>
            <div class="container-sidebar" v->
                <div class="img">
                    <img src="../assets/food-and-restaurant.png" alt="Icon">
                </div>
                <h4>Your cart is empty</h4>
                <p>Please add some items from the menu</p>
            </div>
        </aside>
    </div>
</template>

<script>
export default {
    name : "sidebar"
}
</script>

<style scoped>
    .sidebar {
        width: 25%;
        right: 0;
        top: 0;
        position: fixed;
        padding: .5vw 0;
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
        font-size: 2vw;
        text-align: center;
        padding: 1.39vw;
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

    @media (max-width: 1066px) {
        .sidebar h3 {
            padding: 1.58vw;
        }
    }
    @media (max-width: 900px) {
        .sidebar h3 {
            padding: 1.7vw;
        }
    }
    @media (max-width: 800px) {
        .sidebar h3 {
            padding: 1.86vw;
        }
    }
    @media (max-width: 768px) {
        .sidebar h3 {
            padding: 2.3vw 0;
        }
    }
    @media (max-width: 700px) {
        .sidebar h3 {
            padding: 2.4vw;
        }
    }
    @media (max-width: 576px) {
        .sidebar h3 {
            padding: 7vw 0;
        }
    }
    @media (max-width: 500px) {
        .sidebar h3 {
            padding: 7.2vw;
        }
    }
</style>