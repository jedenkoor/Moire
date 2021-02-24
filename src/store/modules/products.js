import { API_BASE_URL } from '@/config.js'

export default {
  namespaced: true,
  state: {
    products: null,
    page: 1,
    productsPerPage: 12,
    productsCount: 0
  },
  getters: {
    products(state) {
      return state.products
    },
    page(state) {
      return state.page
    },
    perPage(state) {
      return state.productsPerPage
    },
    count(state) {
      return state.productsCount
    }
  },
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
    loadProducts(context) {
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(async () => {
        const response = await fetch(
          `${API_BASE_URL}/api/products?` +
            new URLSearchParams({
              categoryId: context.rootState.filter.filterCategory,
              'materialIds[]': context.rootState.filter.filterMaterials,
              'seasonIds[]': context.rootState.filter.filterSeasons,
              'colorIds[]': context.rootState.filter.filterColors,
              page: context.state.page,
              limit: context.state.productsPerPage,
              minPrice: context.rootState.filter.filterPriceFrom,
              maxPrice: context.rootState.filter.filterPriceTo
            })
        )
        const productsData = await response.json()
        context.commit('updateProducts', productsData.items)
        context.commit('updateProductsCount', productsData.pagination.total)
      }, 0)
    },
    updatePageAction(context, page) {
      context.commit('updatePage', page)
      context.dispatch('loadProducts')
    }
  }
}
