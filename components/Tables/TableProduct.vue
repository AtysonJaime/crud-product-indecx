<template>
  <div class="container-produtos">
    <h2 class="py-4">Lista de Produtos</h2>
    <div class="container-table">
      <v-skeleton-loader
        v-if="loading"
        v-bind="attrs"
        type="table-heading, list-item-two-line"
      >
      </v-skeleton-loader>
      <h3 v-else-if="produtos.length === 0" class="text-center">
        Nenhum produto encontrado no banco
      </h3>
      <v-data-table
        v-else
        :headers="headers"
        :items="produtos"
        item-key="name"
        :search="search"
        :items-per-page="valorPorPagina"
        :page.sync="page"
        hide-default-footer
        @pagination="updateTable($event)"
      >
        <template #top>
          <div class="actions-header-table">
            <div class="input-content">
              <v-text-field
                v-model="search"
                outlined
                class="search-table"
                append-icon="mdi-magnify"
                color="#4CE595"
                placeholder="Faça sua busca"
                hide-details
              ></v-text-field>
            </div>
            <ModalFormProduto />
          </div>
        </template>
        <template #body="{ items }">
          <tbody>
            <tr v-if="items.length === 0">
              <td class="text-center" colspan="5">
                Nenhum produto encontrado pela busca
              </td>
            </tr>
            <tr v-for="item in items" v-else :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.value }}</td>
              <td>
                <div class="actions-table">
                  <ModalFormProduto
                    :eh-edicao="true"
                    :name-produto="item.name"
                    :id-produto="item.id"
                    :tipo-produto="item.type"
                    :valor-produto="item.value"
                  />
                  <ModalDeleteProduto :id-produto="item.id" />
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <div v-show="totalProdutos > 0" class="pagination-container">
        <p class="mr-4">
          {{
            valor.inicial +
            '-' +
            valor.final +
            ' de ' +
            totalProdutos +
            ' Items'
          }}
        </p>
        <v-pagination
          v-model="page"
          :length="totalPaginas"
          @input="activePage($event)"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ModalFormProduto from '~/components/Modais/modalFormProduto.vue'
import ModalDeleteProduto from '~/components/Modais/modalDeleteProduto.vue'
export default {
  components: {
    ModalFormProduto,
    ModalDeleteProduto,
  },
  data() {
    return {
      search: '',
      page: 1,
      totalPaginas: 0,
      totalProdutos: 0,
      valorPorPagina: 10,
      valor: {
        inicial: 1,
        final: 10,
      },
      loading: true,
      headers: [
        {
          text: 'Id',
          sortable: false,
          value: 'id',
        },
        { text: 'Nome do produto', value: 'name', sortable: false },
        { text: 'Tipo do produto', value: 'type', sortable: false },
        { text: 'Valor do produto', value: 'value', sortable: false },
        { text: 'Opções', value: '', sortable: false },
      ],
      attrs: {
        class: 'mb-6',
      },
    }
  },
  computed: {
    ...mapState('product', ['produtos']),
  },
  async mounted() {
    await this.$store.dispatch('product/getProdutos').then((res) => {
      this.loading = false
    })
  },
  methods: {
    activePage(pageAtiva) {
      const proximoValores = this.valorPorPagina * pageAtiva
      if (proximoValores > this.totalProdutos) {
        this.valor.final = this.totalProdutos
      } else {
        this.valor.final = proximoValores
      }
      this.valor.inicial = proximoValores - (this.valorPorPagina - 1)
    },

    updateTable(table) {
      this.totalPaginas = table.pageCount
      this.totalProdutos = table.itemsLength
      if (this.totalPaginas === 1)
        this.valor.final =
          table.itemsLength < this.valorPorPagina
            ? table.itemsLength
            : this.valorPorPagina
    },
  },
}
</script>

<style lang="scss">
.container-produtos {
  padding: 1.5rem;
  min-height: calc(100vh - 72px);
  height: 100%;

  @media (max-width: 426px) {
    min-height: calc(100vh - 107px);
    height: 100%;
  }

  .container-table {
    padding: 1.5rem;
    background-color: #fff;

    .actions-header-table {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 1.25rem;

      .search-table {
        max-width: 15rem;
        width: 100%;
      }
    }

    table {
      thead {
        tr {
          th {
            height: 5rem;
            background-color: #fafafa;
            height: 3.75rem;
            padding: 1.125rem 0.75rem;
            font-family: 'Source Sans Pro', sans-serif !important;
            font-size: 0.875rem;
            line-height: 1.5rem;
            font-weight: 700;
            border: none !important;

            &:first-child {
              width: 5rem;
            }
            &:last-child {
              width: 7.5rem;
            }

            span {
              border-right: 1px solid rgba(0, 0, 0, 0.12);
              width: 100%;
              display: flex;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            height: 4.5rem;
            border: none !important;
            font-family: 'Source Sans Pro', sans-serif !important;
            font-size: 0.875rem;
            line-height: 1rem;
            font-weight: 400;
          }
        }
      }
    }

    .actions-table {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    p {
      margin: 0;
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 1.25rem;
      color: #808080;
    }

    button {
      box-shadow: none !important;
      border: 1px solid #d9e0e6;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.375rem;
      text-align: center;
      margin: 0.25rem;
      width: 2rem;
      height: 2rem;

      &.v-pagination__navigation {
        border: none !important;
      }

      &:hover,
      &focus {
        background-color: #d9e0e6;
      }

      &.v-pagination__item--active {
        color: #fff;
        background-color: #96eabd !important;
        border: 1px solid #4de594 !important;
      }
    }
  }
}
</style>
