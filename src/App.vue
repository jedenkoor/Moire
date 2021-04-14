<template>
  <div class="wrapper">
    <div class="preloader" v-if="loading">
      <img src="/img/loader.gif" alt="Preloader" />
    </div>

    <div class="preloader" v-if="loadingError">
      Произошла ошибка<br />
      при загрузке
      <button class="button button--primery" @click="reloadPage()">
        Попробовать еще раз
      </button>
    </div>

    <TheHeader />

    <div class="content">
      <router-view />
    </div>

    <TheFooter />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  components: {
    TheHeader,
    TheFooter
  },
  computed: {
    ...mapState(['loading', 'loadingError'])
  },
  methods: {
    ...mapActions('cart', ['loadCart']),
    ...mapMutations('cart', ['updateUserAccessKey']),
    reloadPage() {
      window.location.reload()
    }
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey')
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey)
    }
    this.loadCart()
  }
}
</script>
