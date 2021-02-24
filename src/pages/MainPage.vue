<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info">
          {{ count }}
          {{ count | declOfNum(['товар', 'товара', 'товаров']) }}
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter />

      <ProductList :products="products" />
    </div>
  </main>
</template>

<script>
import declOfNum from '@/functions/declOfNum'
import { mapGetters, mapActions } from 'vuex'

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
    ...mapGetters('products', ['products', 'count'])
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
