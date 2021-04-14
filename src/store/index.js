import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products.js'
import filter from './modules/filter.js'
import cart from './modules/cart.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    loadingError: false
  },
  getters: {},
  mutations: {
    updateLoading(state, flag) {
      state.loading = flag
    },
    updateLoadingError(state, flag) {
      state.loadingError = flag
    }
  },
  actions: {},
  modules: {
    products,
    filter,
    cart
  }
})
