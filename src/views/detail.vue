<template>
    <div class="container-fluid">
        <div class="card">
            <div class="pic">
                <img :src="data.image" :alt="data.name">
            </div>
            <div class="content">
                <p>{{ data.name }}</p>
                <p class="price">Rp. {{ data.price }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "detail",
    props: {
        data: {
            type: Object,
        },
    },
}
</script>

<style scoped>
/*img {
    max-width: 100%;
}
.pic {
    width: 400px;
}
.inp {
    width: 100%;
    display: flex;
    padding: 20px 0;
    justify-content: center;
}
.detail {
    line-height: 20px;
    font-size: 14pt;
    margin-bottom: 20px;
}
.name {
    margin-bottom: 20px;
    color: rgb(0, 153, 255);
}
.price {
    text-align: right;
    margin-right: 20px;
    color: rgb(124, 123, 123);
}
.content {
    width: 40%;
}
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}*/
</style>
