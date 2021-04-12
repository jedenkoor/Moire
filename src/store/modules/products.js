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
    loading: false,
    loadingError: false,
    productNotFound: false
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
    },
    updateProduct(state, product) {
      state.product = product
    },
    updateLoading(state, flag) {
      state.loading = flag
    },
    updateLoadingError(state, flag) {
      state.loadingError = flag
    },
    updateProductNotFound(state, flag) {
      state.productNotFound = flag
    }
  },
  actions: {
    loadProducts(context, filter) {
      let params = {
        page: context.state.page,
        limit: context.state.productsPerPage,
        ...filter
      }
      params = serialize.serializeQueryParams(params)
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(async () => {
        try {
          context.commit('updateLoadingError', false)
          context.commit('updateLoading', true)
          const productsData = await api.fetchApi(`api/products?${params}`)
          if (Object.keys(productsData)[0] !== 'error') {
            context.commit('updateProducts', productsData.items)
            context.commit('updateProductsCount', productsData.pagination.total)
          } else {
            context.commit('updateLoadingError', true)
          }
          context.commit('updateLoading', false)
        } catch (e) {
          console.log(e)
        }
      }, 0)
    },

    updatePageAction(context, params) {
      context.commit('updatePage', params.page)
      context.dispatch('loadProducts', params.filter)
    },

    async loadProduct(context, id) {
      try {
        context.commit('updateLoadingError', false)
        context.commit('updateLoading', true)
        const productData = await api.fetchApi(`api/products/${id}`)
        if (Object.keys(productData)[0] !== 'error') {
          context.commit('updateProduct', productData)
        } else if (productData.error.code === 404) {
          context.commit('updateProductNotFound', true)
        } else {
          context.commit('updateLoadingError', true)
        }
        context.commit('updateLoading', false)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
