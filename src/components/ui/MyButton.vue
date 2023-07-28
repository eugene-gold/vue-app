<template>
  <button class="btn">
    <slot>

    </slot>
  </button>
</template>

<script>
    export default {
     name: 'my-button'   
    }
</script>

<style scoped>
.btn {
    width: 5rem;
    padding: 0.5rem;
    background: none;
    color: teal;
    border: 1px solid teal;
}
</style>