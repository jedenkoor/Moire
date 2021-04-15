<template>
  <BaseFormField :title="title" :error="error">
    <input
      class="form__input"
      v-imask="type === 'tel' ? mask : ''"
      :type="type"
      :placeholder="placeholder"
      v-model="dataValue"
    />
  </BaseFormField>
</template>

<script>
import { IMaskDirective } from 'vue-imask'

import BaseFormField from '@/components/Base/BaseFormField'

export default {
  props: ['title', 'type', 'error', 'placeholder', 'value'],
  data() {
    return {
      mask: {
        mask: '+{7}0000000000'
      }
    }
  },
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
  },
  directives: {
    imask: IMaskDirective
  }
}
</script>
