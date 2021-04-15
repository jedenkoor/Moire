<template>
  <main class="container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ cartLength }}
          {{ cartLength | declOfNum(['товар', 'товара', 'товаров']) }}
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list" v-if="cartLength">
            <CartItem v-for="item in cartProducts" :key="item.id" :item="item" />
          </ul>
          <div class="cart__list--empty" v-else>
            <p>Ваша корзина пуста</p>
          </div>
        </div>

        <div class="cart__sticky cart__block" v-if="cartLength">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ cartTotalPrice | numberFormat }} ₽</span>
          </p>

          <router-link
            class="cart__button button button--primery"
            v-if="cartLength"
            custom
            v-slot="{ href, navigate }"
            :to="{ name: 'order' }"
          >
            <button :href="href" @click="navigate">Оформить заказ</button>
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import numberFormat from '@/functions/numberFormat'
import declOfNum from '@/functions/declOfNum'

import CartItem from '@/components/Cart/CartItem'

export default {
  components: {
    CartItem
  },
  computed: {
    ...mapState('cart', ['cartProducts']),
    ...mapGetters('cart', ['cartLength', 'cartTotalPrice'])
  },
  filters: {
    numberFormat,
    declOfNum
  }
}
</script>
