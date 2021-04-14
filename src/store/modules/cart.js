import api from '@/api.js'

export default {
  namespaced: true,
  state: {
    cartProducts: [],
    userAccessKey: null
  },
  getters: {
    cartLength(state) {
      return state.cartProducts.reduce((acc, item) => item.quantity + acc, 0)
    },
    cartTotalPrice(state) {
      return state.cartProducts.reduce((acc, item) => item.quantity * item.price + acc, 0)
    }
  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey
    },
    updateCartProducts(state, items) {
      state.cartProducts = items
    }
  },
  actions: {
    async loadCart(context) {
      context.commit('updateLoadingError', false, { root: true })
      context.commit('updateLoading', true, { root: true })
      try {
        const cart = await api.fetchApi(`api/baskets?userAccessKey=${context.state.userAccessKey}`)
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', cart.user.accessKey)
          context.commit('updateUserAccessKey', cart.user.accessKey)
        }
        context.commit('updateCartProducts', cart.items)
      } catch (e) {
        context.commit('updateLoadingError', true, { root: true })
      }
      context.commit('updateLoading', false, { root: true })
    },

    async addProductToCart(context, product) {
      context.commit('updateLoadingError', false, { root: true })
      context.commit('updateLoading', true, { root: true })
      try {
        const productsData = await api.fetchApi(
          `api/baskets/products?userAccessKey=${context.state.userAccessKey}`,
          'POST',
          product
        )
        context.commit('updateCartProducts', productsData.items)
      } catch (e) {
        context.commit('updateLoadingError', true, { root: true })
      }
      context.commit('updateLoading', false, { root: true })
    },

    async updateCartProductAmount(context, product) {
      context.commit('updateLoadingError', false, { root: true })
      context.commit('updateLoading', true, { root: true })
      try {
        const productsData = await api.fetchApi(
          `api/baskets/products?userAccessKey=${context.state.userAccessKey}`,
          'PUT',
          product
        )
        context.commit('updateCartProducts', productsData.items)
      } catch (e) {
        context.commit('updateLoadingError', true, { root: true })
      }
      context.commit('updateLoading', false, { root: true })
    },

    async deleteCartProduct(context, productId) {
      context.commit('updateLoadingError', false, { root: true })
      context.commit('updateLoading', true, { root: true })
      try {
        const productsData = await api.fetchApi(
          `api/baskets/products?userAccessKey=${context.state.userAccessKey}`,
          'DELETE',
          productId
        )
        context.commit('updateCartProducts', productsData.items)
      } catch (e) {
        context.commit('updateLoadingError', true, { root: true })
      }
      context.commit('updateLoading', false, { root: true })
    }
  }
}
