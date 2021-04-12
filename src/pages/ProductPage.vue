<template>
  <main class="container">
    <div class="preloader" v-if="loading">
      <img src="/img/loader.gif" alt="Preloader" />
    </div>

    <div class="preloader" v-if="loadingError">
      Произошла ошибка<br />
      при загрузке
      <button
        class="button button--primery"
        @click="loadProduct($route.params.id)"
      >
        Попробовать еще раз
      </button>
    </div>

    <div v-if="product">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              {{ product.category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              {{ product.title }}
            </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img
              width="570"
              height="570"
              :src="currentImage"
              :alt="product.title"
            />
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">{{ product.title }}</h2>
          <div class="item__form">
            <form
              class="form"
              action="#"
              method="POST"
              @submit.prevent="addToCart"
            >
              <div class="item__row item__row--center">
                <ProductQuantity :product-amount.sync="productAmount" />

                <b class="item__price"> {{ product.price | numberFormat }} ₽</b>
              </div>

              <div class="item__row">
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
                  <legend class="form__legend">Размер</legend>
                  <label
                    class="form__label form__label--small form__label--select"
                  >
                    <select
                      class="form__select"
                      type="text"
                      name="category"
                      v-model="productSize"
                    >
                      <option
                        v-for="size in product.sizes"
                        :value="size.id"
                        :key="size.id"
                      >
                        {{ size.title }}
                      </option>
                    </select>
                  </label>
                </fieldset>
              </div>

              <button class="item__button button button--primery" type="submit">
                В корзину
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import numberFormat from '@/functions/numberFormat'

import ProductColors from '@/components/Product/ProductColors'
import ProductQuantity from '@/components/Product/ProductQuantity'

export default {
  data() {
    return {
      productAmount: 1,
      productSize: null,
      currentColors: []
    }
  },
  components: {
    ProductColors,
    ProductQuantity
  },
  computed: {
    ...mapState('products', [
      'product',
      'loading',
      'loadingError',
      'productNotFound'
    ]),
    currentImage() {
      const colorObj = this.product.colors.find(
        item => item.color.id === this.currentColors[0]
      )
      return colorObj && colorObj.gallery
        ? colorObj.gallery[0].file.url
        : 'http://placehold.it/270x350/'
    },
    colors() {
      return this.product.colors.map(item => item.color)
    }
  },
  methods: {
    ...mapActions('products', ['loadProduct']),
    ...mapActions('cart', ['addProductToCart']),
    setCurrentColor(newColor) {
      this.currentColors = [newColor]
    },
    addToCart() {
      this.addProductToCart({
        productId: this.product.id,
        colorId: this.currentColors[0],
        sizeId: this.productSize,
        quantity: this.productAmount
      })
    }
  },
  async created() {
    await this.loadProduct(this.$route.params.id)
    if (this.product) {
      this.currentColors = [this.product.colors[0].color.id]
      this.productSize = this.product.sizes[0].id
    }
  },
  watch: {
    productNotFound() {
      if (this.productNotFound) {
        this.$router.replace({ name: 'notFound' })
      }
    }
  },
  filters: {
    numberFormat
  }
}
</script>
