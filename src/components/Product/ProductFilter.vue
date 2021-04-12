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
            v-model.number="filters.minPrice"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="filters.maxPrice"
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
            v-model="filters.categoryId"
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
          :currentColors="filters.colorIds"
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
                v-model="filters.materialIds"
                :value="material.id"
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
                v-model="filters.seasonIds"
                :value="season.id"
              />
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button
        class="filter__submit button button--primery"
        type="submit"
        :disabled="disabledSubmit"
      >
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        :disabled="disabledReset"
        @click="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import lodash from 'lodash'
import { mapState, mapActions } from 'vuex'

import ProductColors from '@/components/Product/ProductColors'

const INITIAL_FILTERS = {
  minPrice: 0,
  maxPrice: 0,
  categoryId: 0,
  colorIds: [],
  materialIds: [],
  seasonIds: []
}

export default {
  data() {
    return {
      disabledSubmit: true,
      disabledReset: true,
      filters: lodash.cloneDeep(INITIAL_FILTERS)
    }
  },
  components: {
    ProductColors
  },
  computed: {
    ...mapState('filter', ['categories', 'colors', 'materials', 'seasons'])
  },
  methods: {
    ...mapActions('filter', [
      'loadCategories',
      'loadColors',
      'loadMaterials',
      'loadSeasons'
    ]),
    ...mapActions('products', ['updatePageAction']),
    setCurrentColor(newColor) {
      if (this.filters.colorIds.includes(newColor)) {
        this.filters.colorIds.splice(this.filters.colorIds.indexOf(newColor), 1)
      } else {
        this.filters.colorIds.push(newColor)
      }
    },
    submit() {
      this.disabledSubmit = true
      this.updatePageAction({ page: 1, filter: this.filters })
    },
    async reset() {
      this.filters = lodash.cloneDeep(INITIAL_FILTERS)
      this.updatePageAction({ page: 1, filter: this.filters })
      await this.$nextTick()
      this.disabledSubmit = true
      this.disabledReset = true
    }
  },
  watch: {
    filters: {
      handler() {
        this.disabledSubmit = false
        this.disabledReset = false
      },
      deep: true
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
