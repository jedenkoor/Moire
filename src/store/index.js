import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products.js'
import filter from './modules/filter.js'
import cart from './modules/cart.js'
import order from './modules/order.js'

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
      if (state.loading && !state.loadingError) {
        state.loadingError = flag
      }
    }
  },
  actions: {},
  modules: {
    products,
    filter,
    cart,
    order
  }
})
