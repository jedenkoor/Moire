<template>
  <main class="container" v-if="product">
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
          <img width="570" height="570" :src="currentImage" :alt="product.title" />
        </div>
        <ul class="pics__list" v-if="galleries[currentColors[0]]">
          <li class="pics__item" v-for="(image, index) in galleries[currentColors[0]]" :key="index">
            <a
              href=""
              :class="[index === 0 ? 'pics__link--current' : '', 'pics__link']"
              :data-index="index"
              @click.prevent
            >
              <img
                width="98"
                height="98"
                :src="image.file.url"
                :alt="product.title"
                @click.prevent="changeImg(image.file.url)"
              />
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
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
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category" v-model="productSize">
                    <option v-for="size in product.sizes" :value="size.id" :key="size.id">
                      {{ size.title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
            <div v-if="productAdded && !loadingError">Товар добавлен в корзину</div>
          </form>
        </div>
      </div>
    </section>
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
      productAdded: null,
      currentColors: []
    }
  },
  components: {
    ProductColors,
    ProductQuantity
  },
  computed: {
    ...mapState(['loadingError']),
    ...mapState('products', ['product', 'productNotFound']),
    currentImage() {
      const colorObj = this.product.colors.find(item => item.color.id === this.currentColors[0])
      return colorObj && colorObj.gallery ? colorObj.gallery[0].file.url : 'http://placehold.it/270x350/'
    },
    colors() {
      return this.product.colors.map(item => {
        return {
          ...item.color,
          galleryId: item.id
        }
      })
    },
    galleries() {
      const res = {}
      for (const item of this.product.colors.entries()) {
        res[item[1].color.id] = item[1].gallery
      }

      /* Добавление доп картинок в галерею для проверки переключения */
      for (const [key] of Object.entries(res)) {
        if (res[key]) {
          res[key].push({
            file: {
              url: 'https://vue-moire.skillbox.cc/uploads/file/3/2/4/324e1f4fb34931a1d367602a730a75b5.jpg'
            }
          })
          res[key].push({
            file: {
              url: 'https://vue-moire.skillbox.cc/uploads/file/3/6/e/36efa79c31cb4400f8f9ce69a7d6f6a6.png'
            }
          })
        }
      }
      /* Добавление доп картинок в галерею для проверки переключения */

      return res
    }
  },
  methods: {
    ...mapActions('products', ['loadProduct']),
    ...mapActions('cart', ['addProductToCart']),
    setCurrentColor(newColor) {
      this.currentColors = [newColor]
      document.querySelectorAll('.pics__link').forEach((item, index) => {
        item.classList.remove('pics__link--current')
        if (!index) {
          item.classList.add('pics__link--current')
        }
      })
    },
    addToCart() {
      this.addProductToCart({
        productId: this.product.id,
        colorId: this.currentColors[0],
        sizeId: this.productSize,
        quantity: this.productAmount
      })
      this.productAdded = true
    },
    changeImg(image) {
      document.querySelector('.pics__wrapper img').setAttribute('src', image)
      const thumbs = event.target.closest('.pics__list').querySelectorAll('.pics__link')
      thumbs.forEach(item => item.classList.remove('pics__link--current'))
      event.target.closest('.pics__link').classList.add('pics__link--current')
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
