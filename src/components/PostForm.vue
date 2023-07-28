<template>
    <form class="form" @submit.prevent>
        <h4>Make Post</h4>
        <my-input
         v-focus
         v-model="post.title"
         type="text"
         placeholder="post name"
         />
        <my-input
            v-model="post.body"           
            type="text"
            placeholder="post description"
        />
        <my-button 
            style="align-self: flex-end; margin-top: 0.8rem;" 
            @click="createPost"
        >
            Send
        </my-button>
      </form>
</template>

<script>
    export default {
        data() {
            return {
                post: {
                    
                    title: '',
                    body: ''
                }
            }
        },
        methods: {
            createPost() {
                this.post.id = Date.now()               
                if(this.post.title !== '' && this.post.body !== '') {
                    this.$emit('create', this.post)

                }
                this.post = {
                    title: '',
                    body:  ''
                }
           },
        }
        
    }
</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;
}

</style>