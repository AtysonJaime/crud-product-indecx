<template>
  <div class="d-flex flex-column">
    <HeaderPage />
    <AlertasInterno />
    <TableProduct />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderPage from '~/components/Header/HeaderPage.vue'
import TableProduct from '~/components/Tables/TableProduct.vue'
import AlertasInterno from '~/components/AlertaTemplate.vue'

export default {
  name: 'PruductsPage',

  components: {
    HeaderPage,
    TableProduct,
    AlertasInterno,
  },

  computed: {
    ...mapState('user', ['usuario', 'session']),
  },

  mounted() {
    if (this.usuario.length === 0) {
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="scss">
.v-alert__wrapper {
  width: 100%;
}
</style>
