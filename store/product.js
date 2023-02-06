import { supabase } from '~/service/supabaseApi'

export const state = () => ({
  produtos: [],
})

export const mutations = {
  SET_PRODUTOS(state, payload) {
    state.produtos = payload
  },
}

export const actions = {
  async getProdutos({ commit }) {
    const data = await supabase.from('produtos').select('*', { count: 'exact' })
    const responseTratado = data.data.map((produto) => ({
      id: produto.id,
      name: produto.product_name,
      type: produto.product_type,
      value: 'R$ ' + produto.product_value,
    }))
    commit('SET_PRODUTOS', responseTratado)
  },

  async postProdutos({ commit }, data) {
    const geraID = (tamanho) => {
      let stringAleatoria = ''
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      for (let i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(
          Math.floor(Math.random() * caracteres.length)
        )
      }
      return stringAleatoria
    }
    const id = geraID(6)

    const { status } = await supabase.from('produtos').insert({
      id,
      product_name: data.name,
      product_type: data.tipo,
      product_value: data.valor,
    })
    return status
  },

  async deleteProduto({ commit }, id) {
    const { status } = await supabase.from('produtos').delete().eq('id', id)
    return status
  },

  async editProduto({ commit }, data) {
    const { status } = await supabase
      .from('produtos')
      .update({
        product_name: data.name,
        product_type: data.tipo,
        product_value: data.valor,
      })
      .eq('id', data.id)
    return status
  },
}
