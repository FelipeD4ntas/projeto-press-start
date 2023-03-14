<template>
  <div class="c-loader"></div>
</template>

<script>
export default {
  name: 'LoadingComponent'
}
</script>

<style scoped>
  .c-loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 6px solid var(--cor-btn);
    border-top-color: var(--cor-principal);
    animation: is-rotating 1s infinite;
  }

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }

</style>