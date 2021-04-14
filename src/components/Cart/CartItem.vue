<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img width="120" height="120" :src="item.color.gallery[0].file.url" :alt="item.product.title" />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info">
      <span>
        Цвет:
        <span class="product__info--color">
          <i :style="`background-color:${item.color.color.code}`"></i>
          {{ item.color.color.title }}
        </span>
      </span>
      <span>
        Размер:
        <span>
          {{ item.size.title }}
        </span>
      </span>
    </p>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <ProductQuantity :product-amount.sync="amount" class="product__counter" />

    <b class="product__price"> {{ item.price | numberFormat }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteCartProduct({ basketItemId: item.id })"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex'

import numberFormat from '@/functions/numberFormat'

import ProductQuantity from '@/components/Product/ProductQuantity'

export default {
  props: ['item'],
  components: {
    ProductQuantity
  },
  computed: {
    amount: {
      get() {
        return this.item.quantity
      },
      set(value) {
        this.updateCartProductAmount({
          basketItemId: this.item.id,
          quantity: value
        })
      }
    }
  },
  methods: {
    ...mapActions('cart', ['updateCartProductAmount', 'deleteCartProduct'])
  },
  filters: {
    numberFormat
  }
}
</script>
