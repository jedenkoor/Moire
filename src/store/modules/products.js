import api from '@/api.js'
import serialize from '@/functions/serializeQueryParams.js'

export default {
  namespaced: true,
  state: {
    products: null,
    product: null,
    page: 1,
    productsPerPage: 12,
    productsCount: 0,
    productNotFound: false
  },
  getters: {},
  mutations: {
    updateProducts(state, products) {
      state.products = Object.freeze(products)
    },
    updateProductsCount(state, count) {
      state.productsCount = count
    },
    updatePage(state, page) {
      state.page = page
    },
    updateProduct(state, product) {
      state.product = Object.freeze(product)
    },
    updateProductNotFound(state, flag) {
      state.productNotFound = flag
    }
  },
  actions: {
    loadProducts(context, filter = {}) {
      let params = {
        page: context.state.page,
        limit: context.state.productsPerPage,
        ...filter
      }
      params = serialize.serializeQueryParams(params)
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(async () => {
        context.commit('updateLoadingError', false, { root: true })
        context.commit('updateLoading', true, { root: true })
        try {
          const productsData = await api.fetchApi(`api/products?${params}`)
          context.commit('updateProducts', productsData.items)
          context.commit('updateProductsCount', productsData.pagination.total)
        } catch (e) {
          context.commit('updateLoadingError', true, { root: true })
        }
        context.commit('updateLoading', false, { root: true })
      }, 0)
    },

    updatePageAction(context, params) {
      context.commit('updatePage', params.page)
      context.dispatch('loadProducts', params.filter)
    },

    async loadProduct(context, id) {
      context.commit('updateLoadingError', false, { root: true })
      context.commit('updateLoading', true, { root: true })
      try {
        const productData = await api.fetchApi(`api/products/${id}`)
        context.commit('updateProduct', productData)
      } catch (e) {
        if (e.code === 404) {
          context.commit('updateProductNotFound', true)
        } else {
          context.commit('updateLoadingError', true, { root: true })
        }
      }
      context.commit('updateLoading', false, { root: true })
    }
  }
}
