import api from '@/api.js'

export default {
  namespaced: true,
  state: {
    sendOrderError: false,
    deliveries: [],
    payments: [],
    orderInfo: null,
    orderNotFound: false
  },
  getters: {},
  mutations: {
    updateDeliveries(state, deliveries) {
      state.deliveries = Object.freeze(deliveries)
    },
    updatePayments(state, payments) {
      state.payments = Object.freeze(payments)
    },
    updateSendOrderError(state, flag) {
      state.sendOrderError = flag
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo
    },
    updateOrderNotFound(state, flag) {
      state.orderNotFound = flag
    }
  },
  actions: {
    async loadDeliveries(context) {
      context.commit('updateLoadingError', false, { root: true })
      context.commit('updateLoading', true, { root: true })
      try {
        const deliveriesData = await api.fetchApi('api/deliveries')
        context.commit('updateDeliveries', deliveriesData)
      } catch (e) {
        context.commit('updateLoadingError', true, { root: true })
      }
      context.commit('updateLoading', false, { root: true })
    },

    async loadPayments(context, deliveryId) {
      context.commit('updateLoadingError', false, { root: true })
      context.commit('updateLoading', true, { root: true })
      try {
        const paymentsData = await api.fetchApi(`api/payments?deliveryTypeId=${deliveryId}`)
        context.commit('updatePayments', paymentsData)
      } catch (e) {
        context.commit('updateLoadingError', true, { root: true })
      }
      context.commit('updateLoading', false, { root: true })
    },

    async sendOrder(context, data) {
      context.commit('updateSendOrderError', false)
      context.commit('updateLoading', true, { root: true })
      try {
        const orderData = await api.fetchApi(
          `api/orders?userAccessKey=${context.rootState.cart.userAccessKey}`,
          'POST',
          data
        )
        context.commit('cart/resetCart', false, { root: true })
        context.commit('updateOrderInfo', orderData)
      } catch (e) {
        if (e.request) {
          context.commit('updateLoading', false, { root: true })
          throw e
        }
        context.commit('updateSendOrderError', true)
      }
      context.commit('updateLoading', false, { root: true })
    },

    async loadOrderInfo(context, orderId) {
      context.commit('updateLoadingError', false, { root: true })
      context.commit('updateLoading', true, { root: true })
      try {
        const orderData = await api.fetchApi(
          `api/orders/${orderId}?userAccessKey=${context.rootState.cart.userAccessKey}`
        )
        context.commit('updateOrderInfo', orderData)
      } catch (e) {
        if (e.message === 'Заказ не найден') {
          context.commit('updateOrderNotFound', true)
        } else {
          context.commit('updateLoadingError', true, { root: true })
        }
      }
      context.commit('updateLoading', false, { root: true })
    }
  }
}
