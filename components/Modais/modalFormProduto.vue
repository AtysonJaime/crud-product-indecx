<template>
  <div>
    <v-dialog v-model="openModal" max-width="645" width="100%">
      <template #activator="{ on, attrs }">
        <v-btn
          v-if="ehEdicao"
          icon
          color="grey darken-3"
          v-bind="attrs"
          title="Editar Produto"
          v-on="on"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn v-else color="green darken-2" dark v-bind="attrs" v-on="on">
          Criar produto
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="header-modal">
          <h3 v-if="ehEdicao">Editar produtos</h3>
          <h3 v-else>Criar produto</h3>
          <v-btn
            small
            icon
            raised
            rounded
            color="grey darken-3"
            @click="openModal = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <form>
            <v-container>
              <v-row>
                <v-col lg="6" sm="12">
                  <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    label="Nome do produto"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col lg="6" sm="12">
                  <v-select
                    v-model="tipo"
                    :items="tipos"
                    :error-messages="tipoErrors"
                    label="Tipo do produto"
                    required
                    @change="$v.tipo.$touch()"
                    @blur="$v.tipo.$touch()"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="6" sm="12">
                  <v-text-field
                    v-model="valor"
                    :error-messages="valorErrors"
                    label="Valor do produto"
                    placeholder="R$"
                    prefix="R$"
                    required
                    @keyup="aplicaMascaraReal"
                    @input="$v.valor.$touch()"
                    @blur="$v.valor.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined color="green darken-2" @click="openModal = false">
            Fechar
          </v-btn>
          <v-btn
            v-if="ehEdicao"
            color="green darken-2"
            dark
            @click="editaProduto"
          >
            Editar
          </v-btn>
          <v-btn v-else color="green darken-2" dark @click="criaProduto">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ModalFormProduto',

  props: {
    ehEdicao: {
      type: Boolean,
      require: false,
      default: false,
    },
    idProduto: {
      type: String,
      require: false,
      default: '',
    },
    nameProduto: {
      type: String,
      require: false,
      default: '',
    },
    tipoProduto: {
      type: String,
      require: false,
      default: '',
    },
    valorProduto: {
      type: String,
      require: false,
      default: '',
    },
  },

  validations: {
    name: { required },
    tipo: { required },
    valor: { required },
  },
  data() {
    return {
      openModal: false,
      name: '',
      tipo: '',
      valor: '',
      tipos: ['Tipo 1', 'Tipo 2', 'Tipo 3', 'Tipo 4', 'Tipo 5'],
    }
  },

  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Nome do produto é obrigatório')
      this.name.length < 3 &&
        errors.push('Nome do produto precisar possuir mais que 3 caracteres')
      return errors
    },
    tipoErrors() {
      const errors = []
      if (!this.$v.tipo.$dirty) return errors
      !this.$v.tipo.required && errors.push('Tipo do produto é obrigatório')
      return errors
    },
    valorErrors() {
      const errors = []
      if (!this.$v.valor.$dirty) return errors
      !this.$v.valor.required && errors.push('Valor do produto é obrigatório')
      this.valor === 'NaN' &&
        errors.push('Valor do produto precisar ser um valor')
      return errors
    },
    ahError() {
      return (
        this.name === '' ||
        this.name.length < 3 ||
        this.tipo === '' ||
        this.valor === '' ||
        this.valor === 'NaN'
      )
    },
  },

  mounted() {
    if (this.ehEdicao) {
      this.name = this.nameProduto
      this.tipo = this.tipoProduto
      this.valor = this.valorProduto
    }
  },

  methods: {
    aplicaMascaraReal() {
      if (this.valor !== '') {
        this.valor = this.valor + ''
        this.valor = parseInt(this.valor.replace(/[\D]+/g, ''))
        this.valor = this.valor + ''
        this.valor = this.valor.replace(/([0-9]{2})$/g, ',$1')
        if (this.valor.length > 6) {
          this.valor = this.valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
        }
      } else {
        this.valor = ''
      }
    },
    async criaProduto() {
      if (this.ahError) {
        this.$store.dispatch('alerta/showAlerta', {
          info: `Erros presentes no formulário ou Campos não podem ser vazios`,
          show: true,
          icon: 'mdi-close-circle-outline',
          error: true,
        })
      } else {
        const data = {
          name: this.name,
          tipo: this.tipo,
          valor: this.valor,
        }
        await this.$store
          .dispatch('product/postProdutos', data)
          .then(async (status) => {
            if (status !== 201) {
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
      }
    },
    async editaProduto() {
      if (this.ahError) {
        this.$store.dispatch('alerta/showAlerta', {
          info: `Erros presentes no formulário ou Campos não podem ser vazios`,
          show: true,
          icon: 'mdi-close-circle-outline',
          error: true,
        })
      } else {
        const data = {
          id: this.idProduto,
          name: this.name,
          tipo: this.tipo,
          valor: this.valor,
        }
        await this.$store
          .dispatch('product/editProduto', data)
          .then(async (status) => {
            if (status !== 204) {
              this.$store.dispatch('alerta/showAlerta', {
                info: `Erro ${status} ocorreu ao editar o produto!`,
                show: true,
                icon: 'mdi-close-circle-outline',
                error: true,
              })
            } else {
              this.$store.dispatch('alerta/showAlerta', {
                info: 'Produto editado com sucesso!',
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
      }
    },
    limparForm() {
      this.name = ''
      this.tipo = ''
      this.valor = ''
      this.$v.$reset()
    },
  },
}
</script>

<style lang="scss" scoped>
.header-modal {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-family: 'Source Sans Pro', sans-serif !important;
  }
}
</style>
