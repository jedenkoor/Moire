<template>
  <main class="container">
    <div class="preloader" v-if="loading">
      <img src="/img/loader.gif" alt="Preloader" />
    </div>

    <div class="preloader" v-if="loadingError">
      Произошла ошибка<br />
      при загрузке
      <button class="button button--primery" @click="loadProducts()">
        Попробовать еще раз
      </button>
    </div>

    <div v-if="products">
      <div class="content__top">
        <div class="content__row">
          <h1 class="content__title">Каталог</h1>
          <span class="content__info">
            {{ productsCount }}
            {{ productsCount | declOfNum(['товар', 'товара', 'товаров']) }}
          </span>
        </div>
      </div>

      <div class="content__catalog">
        <ProductFilter />

        <ProductList :products="products" />
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import declOfNum from '@/functions/declOfNum'

import ProductFilter from '@/components/Product/ProductFilter'
import ProductList from '@/components/Product/ProductList'

export default {
  data() {
    return {}
  },
  components: {
    ProductFilter,
    ProductList
  },
  computed: {
    ...mapState('products', [
      'products',
      'productsCount',
      'loading',
      'loadingError'
    ])
  },
  methods: {
    ...mapActions('products', ['loadProducts'])
  },
  created() {
    this.loadProducts()
  },
  filters: {
    declOfNum
  }
}
</script>
