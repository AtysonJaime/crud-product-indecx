<template>
  <v-container>
    <h2 class="py-4">Lista de Produtos</h2>
    <ModalProdutoAction />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ModalProdutoAction from '~/components/Modais/modalProduto.vue'
export default {
  components: {
    ModalProdutoAction,
  },
  computed: {
    ...mapState('product', ['produtos']),
  },
  async mounted() {
    await this.$store.dispatch('product/getProdutos')
  },
}
</script>

<style lang="scss" scoped></style>
