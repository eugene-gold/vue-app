<template>
    <div v-if="posts.length > 0">
        <h3>User List</h3>
        <TransitionGroup name="post-list">
            <post-item 
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            />
        </TransitionGroup>        
       
    </div>
    <h2 v-else style="color: rebeccapurple;">Nothing Yet</h2>
</template>

<script>
import PostItem from '@/components/PostItem'
    export default {
        components: {PostItem},
        props: {
            posts: {
                type: Array,
                required: true
            }
        } 
    }
</script>

<style scoped>
.post-list-move, /* apply transition to moving elements */
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.3s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.post-list-leave-active {
  position: absolute;
}

</style>