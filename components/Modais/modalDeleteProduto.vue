<template>
  <v-dialog v-model="openModal" max-width="645" width="100%">
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        color="grey darken-3"
        v-bind="attrs"
        title="Excluir Produto"
        v-on="on"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <div class="container-modal-delete">
          <div class="icon-alert">
            <v-icon dark>mdi-information-outline</v-icon>
          </div>
          <div class="info-delete">
            <h3>Tem certeza que deseja excluir este produto ?</h3>
            <p>
              Ao excluir este produto, ele não poderá ser recuperado novamente.
            </p>
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="green darken-2" @click="openModal = false">
          Não
        </v-btn>
        <v-btn color="green darken-2" dark @click="deleteProduto"> Sim </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalDeleteProduto',
  props: {
    idProduto: {
      type: String,
      require: false,
      default: '',
    },
  },
  data() {
    return {
      openModal: false,
    }
  },

  methods: {
    async deleteProduto() {
      await this.$store
        .dispatch('product/deleteProduto', this.idProduto)
        .then(async (status) => {
          if (status !== 204) {
            this.$store.dispatch('alerta/showAlerta', {
              info: `Erro ${status} ocorreu ao cadastrar produto!`,
              show: true,
              icon: 'mdi-close-circle-outline',
              error: true,
            })
          } else {
            this.$store.dispatch('alerta/showAlerta', {
              info: 'Produto criado com sucesso!',
              show: true,
              icon: 'mdi-check',
              error: false,
            })
            this.openModal = false
            this.limparForm()
            await this.$store.dispatch('product/getProdutos')
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.container-modal-delete {
  display: flex;
  padding-top: 2rem;

  .icon-alert i {
    color: #ff513d;
    font-size: 1.875rem;
    margin-right: 0.875rem;
  }
  .info-delete {
    font-family: 'Source Sans Pro', sans-serif !important;

    h3 {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.5rem;
    }
    p {
      font-size: 0.9375rem;
      font-weight: 400;
      line-height: 1.125rem;
    }
  }
}
</style>
