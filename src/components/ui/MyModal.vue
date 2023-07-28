<template>
    <div class="modal" v-if="show" @click="hideModal">
        <div @click.stop class="modal__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin"
    export default {
      name: 'my-modal',
      mixins: [toggleMixin],
      mounted() {
      }
    }
</script>

<style scoped>
.modal {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    display: flex;
}
.modal__content {
    margin: auto;
    background: white;
    border-radius: 0.3rem;
    min-height: 10rem;
    min-width: 30rem;
    padding: 1rem;
}
</style>