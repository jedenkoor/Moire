<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" :disabled="amount === 1" @click.prevent="amount--">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amount" />

    <button type="button" aria-label="Добавить один товар" @click.prevent="amount++">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['productAmount'],
  computed: {
    amount: {
      get() {
        return this.productAmount
      },
      set(newValue) {
        this.$emit('update:productAmount', newValue > 0 ? newValue : 1)
      }
    }
  }
}
</script>
