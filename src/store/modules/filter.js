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
      try {
        const categoriesData = await api.fetchApi('api/productCategories')
        context.commit('updateCategoties', categoriesData.items)
      } catch (e) {
        console.log(e)
      }
    },
    async loadColors(context) {
      try {
        const colorsData = await api.fetchApi('api/colors')
        context.commit('updateColors', colorsData.items)
      } catch (e) {
        console.log(e)
      }
    },
    async loadMaterials(context) {
      try {
        const materialsData = await api.fetchApi('api/materials')
        context.commit('updateMaterials', materialsData.items)
      } catch (e) {
        console.log(e)
      }
    },
    async loadSeasons(context) {
      try {
        const seasonsData = await api.fetchApi('api/seasons')
        context.commit('updateSeasons', seasonsData.items)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
