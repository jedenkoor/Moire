import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products.js'
import filter from './modules/filter.js'
import cart from './modules/cart.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    products,
    filter,
    cart
  }
})
