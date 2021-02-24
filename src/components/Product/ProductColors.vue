<template>
  <ul class="colors">
    <li class="colors__item" v-for="(color, index) in colors" :key="index">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :value="color.title"
          :checked="currentColors.includes(color.id)"
          @change="$emit('setColor', color.id)"
        />
        <span class="colors__value" :style="`background-color: ${color.code}`">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['colors', 'currentColors']
}
</script>
