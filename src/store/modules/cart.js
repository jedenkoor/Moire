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
      const cart = await api.fetchApi(
        `api/baskets?userAccessKey=${context.state.userAccessKey}`
      )
      if (Object.keys(cart)[0] !== 'error') {
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', cart.user.accessKey)
          context.commit('updateUserAccessKey', cart.user.accessKey)
        }
        context.commit('updateCartProducts', cart.items)
      }
    },
    async addProductToCart(context, product) {
      try {
        const productsData = await api.fetchApi(
          `api/baskets/products?userAccessKey=${context.state.userAccessKey}`,
          'POST',
          product
        )
        if (Object.keys(productsData)[0] !== 'error') {
          context.commit('updateCartProducts', productsData.items)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
