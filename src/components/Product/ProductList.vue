<template>
  <section class="catalog" v-if="products">
    <ul class="catalog__list">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </ul>

    <BasePagination />
  </section>
</template>

<script>
import BasePagination from '@/components/Base/BasePagination'
import ProductItem from '@/components/Product/ProductItem'

export default {
  props: ['products'],
  components: {
    BasePagination,
    ProductItem
  }
}
</script>
