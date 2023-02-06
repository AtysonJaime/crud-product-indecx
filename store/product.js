import { supabase } from '~/service/supabaseApi'

export const state = () => ({
  produtos: [],
  page: 1,
  totalpages: 0,
})

export const mutations = {
  GET_PRODUTOS(state, payload) {
    state.produtos = payload
  },
}

export const actions = {
  async getProdutos({ commit }) {
    const data = await supabase.from('produtos').select('*').range(0, 9)
    console.log(data)
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
}
