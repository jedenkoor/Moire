<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img :src="currentImage" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { id: product.id } }">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>

    <ProductColors
      class="colors--black"
      :type="'radio'"
      :colors="colors"
      :currentColors="currentColors"
      @setColor="setCurrentColor"
    />
  </li>
</template>

<script>
import numberFormat from '@/functions/numberFormat'

import ProductColors from '@/components/Product/ProductColors'

export default {
  props: ['product'],
  data() {
    return {
      currentColors: [this.product.colors[0].color.id]
    }
  },
  components: {
    ProductColors
  },
  computed: {
    currentImage() {
      const colorObj = this.product.colors.find(item => item.color.id === this.currentColors[0])
      return colorObj.gallery ? colorObj.gallery[0].file.url : 'http://placehold.it/270x350/'
    },
    colors() {
      return this.product.colors.map(item => item.color)
    }
  },
  methods: {
    setCurrentColor(newColor) {
      this.currentColors = [newColor]
    }
  },
  filters: {
    numberFormat
  }
}
</script>
