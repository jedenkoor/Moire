import { API_BASE_URL } from '@/config.js'

export default {
  namespaced: true,
  state: {
    filterPriceFrom: 0,
    filterPriceTo: 0,
    filterCategory: 0,
    filterColors: [],
    filterMaterials: [],
    filterSeasons: [],

    categories: [],
    colors: [],
    materials: [],
    seasons: []
  },
  getters: {
    categories(state) {
      return state.categories
    },
    colors(state) {
      return state.colors
    },
    materials(state) {
      return state.materials
    },
    seasons(state) {
      return state.seasons
    }
  },
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
    },
    updateFilter(state, data) {
      for (const key in data) {
        state[key] = data[key]
      }
    }
  },
  actions: {
    async loadCategories(context) {
      const response = await fetch(`${API_BASE_URL}/api/productCategories`)
      const categoriesData = await response.json()
      context.commit('updateCategoties', categoriesData.items)
    },
    async loadColors(context) {
      const response = await fetch(`${API_BASE_URL}/api/colors`)
      const colorsData = await response.json()
      context.commit('updateColors', colorsData.items)
    },
    async loadMaterials(context) {
      const response = await fetch(`${API_BASE_URL}/api/materials`)
      const materialsData = await response.json()
      context.commit('updateMaterials', materialsData.items)
    },
    async loadSeasons(context) {
      const response = await fetch(`${API_BASE_URL}/api/seasons`)
      const seasonsData = await response.json()
      context.commit('updateSeasons', seasonsData.items)
    },
    resetFilter(context) {
      context.state.filterPriceFrom = 0
      context.state.filterPriceTo = 0
      context.state.filterCategory = 0
      context.state.filterColors.length = 0
      context.state.filterMaterials.length = 0
      context.state.filterSeasons.length = 0
    }
  }
}
