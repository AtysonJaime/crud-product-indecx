<template>
  <div class="header-login-content">
    <h1>{{ titulo }}</h1>
    <p>{{ subtitulo }}</p>
  </div>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      require: true,
      default: '',
    },
    subtitulo: {
      type: String,
      require: true,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.header-login-content {
  font-family: 'Source Sans Pro', sans-serif !important;

  h1 {
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1rem;
    margin-bottom: 1.25rem;
  }
  p {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1rem;
    color: #5e5e5e;
  }
}
</style>
