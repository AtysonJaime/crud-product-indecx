<template>
  <div class="d-flex flex-column">
    <HeaderPage />
    <TableProduct />
  </div>
</template>

<script>
import HeaderPage from '~/components/Header/HeaderPage.vue'
import TableProduct from '~/components/Tables/TableProduct.vue'
export default {
  name: 'PruductsPage',

  components: {
    HeaderPage,
    TableProduct,
  },
}
</script>

<style lang="scss" scoped></style>
