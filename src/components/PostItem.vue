<template>
    <div class="post">
       <div>
           <div><strong>Name</strong> {{ post.title }}</div>
           <div><strong>Desription</strong> {{ post.body }}</div>
           <div><strong>ID</strong> {{ post.id }}</div>
       </div>        
       <div class="post__btns">
           <my-button
            @click="$emit('remove', post)"
           >Del</my-button>
           <my-button
            @click="$router.push(`/posts/${post.id}`)"
            style="margin-left: 0.5rem;"
           >Read</my-button>
       </div>             
    </div>
</template>

<script>
import router from '@/router/router';

    export default {
        props: {
            post: {
                type: Object,
                required: true,
            }
        }
    }
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.post__btns {
    display: flex;
}

</style>