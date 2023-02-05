<template>
  <v-list class="d-flex pa-0">
    <v-list-item-avatar
      ><v-img :src="imgUser" max-height="100%"></v-img
    ></v-list-item-avatar>
    <v-list-item-content class="user-info">
      <v-list-item-title class="text-h6"> Nome Sobrenome </v-list-item-title>
      <v-list-item-subtitle>Nome do Cargo</v-list-item-subtitle>
    </v-list-item-content>
  </v-list>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      imgUser: require('~/static/user-default.svg'),
    }
  },
}
</script>

<style lang="scss" scoped>
.user-info {
  font-family: 'Source Sans Pro', sans-serif !important;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .v-list-item__title {
    font-family: 'Source Sans Pro', sans-serif !important;
    font-size: 0.875rem !important;
    line-height: 1rem;
    font-weight: 600;
    color: #333;
  }
  .v-list-item__subtitle {
    font-size: 0.625rem;
    line-height: 0.75rem;
    font-weight: 400;
    color: #333;
  }
}
</style>
