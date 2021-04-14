import api from '@/api.js'

export default {
  namespaced: true,
  state: {
    categories: [],
    colors: [],
    materials: [],
    seasons: []
  },
  getters: {},
  mutations: {
    updateCategoties(state, categories) {
      state.categories = categories
    },
    updateColors(state, colors) {
      state.colors = colors
    },
    updateMaterials(state, materials) {
      state.materials = materials
    },
    updateSeasons(state, seasons) {
      state.seasons = seasons
    }
  },
  actions: {
    async loadCategories(context) {
      context.commit('updateLoadingError', false, { root: true })
      context.commit('updateLoading', true, { root: true })
      try {
        const categoriesData = await api.fetchApi('api/productCategories')
        context.commit('updateCategoties', categoriesData.items)
      } catch (e) {
        context.commit('updateLoadingError', true, { root: true })
      }
      context.commit('updateLoading', false, { root: true })
    },
    async loadColors(context) {
      context.commit('updateLoadingError', false, { root: true })
      context.commit('updateLoading', true, { root: true })
      try {
        const colorsData = await api.fetchApi('api/colors')
        context.commit('updateColors', colorsData.items)
      } catch (e) {
        context.commit('updateLoadingError', true, { root: true })
      }
      context.commit('updateLoading', false, { root: true })
    },
    async loadMaterials(context) {
      context.commit('updateLoadingError', false, { root: true })
      context.commit('updateLoading', true, { root: true })
      try {
        const materialsData = await api.fetchApi('api/materials')
        context.commit('updateMaterials', materialsData.items)
      } catch (e) {
        context.commit('updateLoadingError', true, { root: true })
      }
      context.commit('updateLoading', false, { root: true })
    },
    async loadSeasons(context) {
      context.commit('updateLoadingError', false, { root: true })
      context.commit('updateLoading', true, { root: true })
      try {
        const seasonsData = await api.fetchApi('api/seasons')
        context.commit('updateSeasons', seasonsData.items)
      } catch (e) {
        context.commit('updateLoadingError', true, { root: true })
      }
      context.commit('updateLoading', false, { root: true })
    }
  }
}
