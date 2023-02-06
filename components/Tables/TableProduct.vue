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
        :items-per-page="10"
      >
        <template #top>
          <div class="actions-header-table">
            <v-text-field
              v-model="search"
              class="search-table"
              append-icon="mdi-magnify"
              label="Faça sua busca"
            ></v-text-field>
            <ModalFormProduto />
          </div>
        </template>
        <template #body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
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
}
</style>
