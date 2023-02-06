<template>
  <div class="d-flex flex-column">
    <HeaderPage />
    <AlertasInterno />
    <TableProduct />
  </div>
</template>

<script>
import HeaderPage from '~/components/Header/HeaderPage.vue'
import TableProduct from '~/components/Tables/TableProduct.vue'
import AlertasInterno from '~/components/Alertas/AlertaInterno.vue'
export default {
  name: 'PruductsPage',

  components: {
    HeaderPage,
    TableProduct,
    AlertasInterno,
  },
}
</script>

<style lang="scss">
.v-alert__wrapper {
  width: 100%;
}
</style>
