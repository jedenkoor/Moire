<template>
  <main class="content container">
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

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart" v-if="cartLength">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="send()">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              title="ФИО"
              type="text"
              placeholder="Введите ваше полное имя"
              v-model="formData.name"
              :error="formErrors.name"
            />

            <BaseFormText
              title="Адрес доставки"
              type="text"
              placeholder="Введите ваш адрес"
              v-model="formData.address"
              :error="formErrors.address"
            />

            <BaseFormText
              title="Телефон"
              type="tel"
              placeholder="Введите ваш телефон"
              v-model="formData.phone"
              :error="formErrors.phone"
            />

            <BaseFormText
              title="Email"
              type="email"
              placeholder="Введите ваш Email"
              v-model="formData.email"
              :error="formErrors.email"
            />

            <BaseFormTextarea
              title="Комментарий к заказу"
              placeholder="Ваши пожелания"
              v-model="formData.comment"
              :error="formErrors.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="delivery in deliveries" :key="delivery.id">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" :value="delivery.id" v-model="currentDelivery" />
                  <span class="options__value">
                    {{ delivery.title }} <b>{{ delivery.price === '0' ? 'бесплатно' : delivery.price }}</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="payment in payments" :key="payment.id">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    :value="payment.id"
                    v-model="currentPayment"
                  />
                  <span class="options__value">{{ payment.title }}</span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__sticky">
          <div class="cart__block">
            <ul class="cart__orders">
              <li class="cart__order" v-for="item in cartProducts" :key="item.id">
                <h3>{{ item.product.title }}</h3>
                <b>{{ item.price | numberFormat }} ₽</b>
                <span>Количество: {{ item.quantity }}</span>
                <span>Цвет: {{ item.color.color.title }}</span>
                <span>Размер: {{ item.size.title }}</span>
                <span>Артикул: {{ item.product.id }}</span>
              </li>
            </ul>

            <div class="cart__total">
              <p v-if="deliveries">
                Доставка: <b>{{ deliveryPrice === 0 ? 'бесплатно' : deliveryPrice }}</b>
              </p>
              <p>
                Итого:
                <b>{{ cartLength }}</b>
                {{ cartLength | declOfNum(['товар', 'товара', 'товаров']) }}
                на сумму
                <b>{{ cartTotalPrice + deliveryPrice }} ₽</b>
              </p>
            </div>

            <button class="cart__button button button--primery" type="submit">
              Оформить заказ
            </button>
          </div>
          <div class="cart__error form__error-block" v-if="sendOrderError">
            <h4>Заявка не отправлена!</h4>
            <p>
              Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import numberFormat from '@/functions/numberFormat'
import declOfNum from '@/functions/declOfNum'

import BaseFormText from '@/components/Base/BaseFormText'
import BaseFormTextarea from '@/components/Base/BaseFormTextarea'

export default {
  data() {
    return {
      currentDelivery: null,
      currentPayment: null,
      deliveryPrice: 0,
      formData: {},
      formErrors: {}
    }
  },
  components: {
    BaseFormText,
    BaseFormTextarea
  },
  computed: {
    ...mapState('cart', ['cartProducts']),
    ...mapState('order', ['deliveries', 'payments', 'sendOrderError', 'orderInfo']),
    ...mapGetters('cart', ['cartLength', 'cartTotalPrice'])
  },
  methods: {
    ...mapActions('order', ['loadDeliveries', 'loadPayments', 'sendOrder']),
    async send() {
      this.formErrors = {}
      try {
        await this.sendOrder({
          ...this.formData,
          deliveryTypeId: this.currentDelivery,
          paymentTypeId: this.currentPayment
        })
        if (this.orderInfo) {
          this.$router.push({
            name: 'orderInfo',
            params: { id: this.orderInfo.id }
          })
        }
      } catch (e) {
        this.formErrors = e.request
      }
    }
  },
  async created() {
    await this.loadDeliveries()
    if (this.deliveries) {
      this.currentDelivery = this.deliveries[0].id
    }
  },
  watch: {
    async currentDelivery(v) {
      this.deliveryPrice = Number(this.deliveries.find(item => item.id === v).price)
      await this.loadPayments(v)
      if (this.payments) {
        this.currentPayment = this.payments[0].id
      }
    }
  },
  filters: {
    numberFormat,
    declOfNum
  }
}
</script>
