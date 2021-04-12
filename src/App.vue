<template>
  <div class="wrapper">
    <TheHeader />

    <div class="content">
      <router-view />
    </div>

    <TheFooter />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  components: {
    TheHeader,
    TheFooter
  },
  methods: {
    ...mapActions('cart', ['loadCart']),
    ...mapMutations('cart', ['updateUserAccessKey'])
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
