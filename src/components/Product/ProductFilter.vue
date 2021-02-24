<template>
  <aside class="filter">
    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="currentPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>

        <ProductColors
          class="colors--black"
          :colors="colors"
          :currentColors="currentColors"
          @setColor="setCurrentColor"
        />
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="material in materials"
            :key="material.id"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                :value="material.id"
                :checked="currentMaterials.includes(material.id)"
                @change="setCurrentMaterial(material.id)"
              />
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="season in seasons"
            :key="season.id"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                :value="season.id"
                :checked="currentSeasons.includes(season.id)"
                @change="setCurrentSeason(season.id)"
              />
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import ProductColors from '@/components/Product/ProductColors'

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColors: [],
      currentMaterials: [],
      currentSeasons: []
    }
  },
  components: {
    ProductColors
  },
  computed: {
    ...mapState('filter', [
      'filterPriceFrom',
      'filterPriceTo',
      'filterCategory',
      'filterColors',
      'filterMaterials',
      'filterSeasons'
    ]),
    ...mapGetters('filter', ['categories', 'colors', 'materials', 'seasons'])
  },
  methods: {
    ...mapMutations('filter', ['updateFilter']),
    ...mapActions('filter', [
      'loadCategories',
      'loadColors',
      'loadMaterials',
      'loadSeasons',
      'resetFilter'
    ]),
    ...mapActions('products', ['updatePageAction']),
    setCurrentColor(newColor) {
      this.currentColors = [newColor]
    },
    setCurrentMaterial(newMaterial) {
      this.currentMaterials = [newMaterial]
    },
    setCurrentSeason(newSeason) {
      this.currentSeasons = [newSeason]
    },
    submit() {
      if (
        this.filterPriceFrom !== this.currentPriceFrom ||
        this.filterPriceTo !== this.currentPriceTo ||
        this.filterCategory !== this.currentCategoryId ||
        this.filterColors !== this.currentColors ||
        this.filterMaterials !== this.currentMaterials ||
        this.filterSeasons !== this.currentSeasons
      ) {
        this.updateFilter({
          filterPriceFrom: this.currentPriceFrom,
          filterPriceTo: this.currentPriceTo,
          filterCategory: this.currentCategoryId,
          filterColors: this.currentColors,
          filterMaterials: this.currentMaterials,
          filterSeasons: this.currentSeasons
        })
      }
    },
    reset() {
      this.resetFilter()
    }
  },
  watch: {
    filterPriceFrom(newValue) {
      this.currentPriceFrom = newValue
      this.updatePageAction(1)
    },
    filterPriceTo(newValue) {
      this.currentPriceTo = newValue
      this.updatePageAction(1)
    },
    filterCategory(newValue) {
      this.currentCategoryId = newValue
      this.updatePageAction(1)
    },
    filterColors(newValue) {
      this.currentColors = newValue
      this.updatePageAction(1)
    },
    filterMaterials(newValue) {
      this.currentMaterials = newValue
      this.updatePageAction(1)
    },
    filterSeasons(newValue) {
      this.currentSeasons = newValue
      this.updatePageAction(1)
    }
  },
  created() {
    this.loadCategories()
    this.loadColors()
    this.loadMaterials()
    this.loadSeasons()
  }
}
</script>
