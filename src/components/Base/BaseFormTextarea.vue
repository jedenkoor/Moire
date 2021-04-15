<template>
  <BaseFormField :title="title" :error="error">
    <textarea class="form__input form__input--area" :placeholder="placeholder" v-model="dataValue"></textarea>
  </BaseFormField>
</template>

<script>
import BaseFormField from '@/components/Base/BaseFormField'

export default {
  props: ['title', 'error', 'placeholder', 'value'],
  components: {
    BaseFormField
  },
  computed: {
    dataValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
