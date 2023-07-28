<template>
    <div class="navbar">
        <div @click="$router.push('/')">V</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('posts')">Posts</my-button>
            <my-button @click="$router.push('about')" style="margin-left: 1rem;">About</my-button>
            <my-button @click="$router.push('store')" style="margin-left: 1rem;">Store</my-button>
            <my-button @click="$router.push('compose')" style="margin-left: 1rem;">Compose</my-button>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

.navbar {
    height: 3rem;
    background-color: cadetblue;
    box-shadow: 2px 2px 4px burlywood;
    display: flex;
    align-items: center;
    padding: 0 1rem;
}

.navbar__btns {
    margin-left: auto;
}

</style>