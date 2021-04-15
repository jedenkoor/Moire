<template>
  <main class="content container" v-if="orderInfo">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа. Наши
            менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Доставка
              </span>
              <span class="dictionary__value">
                {{ orderInfo.deliveryType.title }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ orderInfo.paymentType }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in orderInfo.basket.items" :key="item.id">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.price | numberFormat }} ₽</b>
              <span>Количество: {{ item.quantity }}</span>
              <span>Цвет: {{ item.color.color.title }}</span>
              <span>Размер: {{ item.size.title }}</span>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>
              Доставка: <b>{{ orderInfo.deliveryType.price === '0' ? 'бесплатно' : orderInfo.deliveryType.price }}</b>
            </p>
            <p>
              Итого:
              <b>{{ orderLength }}</b>
              {{ orderLength | declOfNum(['товар', 'товара', 'товаров']) }}
              на сумму
              <b>{{ orderInfo.totalPrice | numberFormat }} ₽</b>
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import numberFormat from '@/functions/numberFormat'
import declOfNum from '@/functions/declOfNum'

export default {
  computed: {
    ...mapState('order', ['orderInfo', 'orderNotFound']),
    orderLength() {
      return this.orderInfo ? this.orderInfo.basket.items.reduce((acc, item) => item.quantity + acc, 0) : 0
    }
  },
  methods: {
    ...mapActions('order', ['loadOrderInfo'])
  },
  created() {
    this.loadOrderInfo(this.$route.params.id)
  },
  watch: {
    orderNotFound(v) {
      if (v) {
        this.$router.replace({ name: 'notFound' })
      }
    }
  },
  filters: {
    numberFormat,
    declOfNum
  }
}
</script>
