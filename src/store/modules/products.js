import api from '@/api.js'
import serialize from '@/functions/serializeQueryParams.js'

export default {
  namespaced: true,
  state: {
    products: null,
    page: 1,
    productsPerPage: 12,
    productsCount: 0
  },
  getters: {},
  mutations: {
    updateProducts(state, products) {
      state.products = products
    },
    updateProductsCount(state, count) {
      state.productsCount = count
    },
    updatePage(state, page) {
      state.page = page
    }
  },
  actions: {
    loadProducts(context, filter) {
      let params = {
        page: context.state.page,
        limit: context.state.productsPerPage
      }

      params = Object.assign(params, filter)
      for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value) && !value.length) {
          delete params[key]
        }
      }

      params = serialize.serializeQueryParams(params)

      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(async () => {
        try {
          const productsData = await api.fetchApi(`api/products?${params}`)
          context.commit('updateProducts', productsData.items)
          context.commit('updateProductsCount', productsData.pagination.total)
        } catch (e) {
          console.log(e)
        }
      }, 0)
    },
    updatePageAction(context, params) {
      context.commit('updatePage', params.page)
      context.dispatch('loadProducts', params.filter)
    }
  }
}
