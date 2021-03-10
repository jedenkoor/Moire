<template>
  <ul class="catalog__pagination pagination" v-if="productsCount">
    <li class="pagination__item">
      <a
        aria-label="Предыдущая страница"
        href="#"
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page <= 1 }"
        @click.prevent="prevPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>

    <li
      class="pagination__item"
      v-for="(pageNumber, index) in pagesInPagination"
      :key="index"
    >
      <a
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber === page }"
        :href="pageNumber === page || pageNumber === '...' ? false : '#'"
        @click.prevent="paginate($event, pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>

    <li class="pagination__item">
      <a
        aria-label="Следующая страница"
        href="#"
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page >= pagesAll }"
        @click.prevent="nextPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
import getPagesInPagination from '@/functions/pagination'

import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('products', ['page', 'productsPerPage', 'productsCount']),
    pagesAll() {
      return Math.ceil(this.productsCount / this.productsPerPage)
    },
    pagesInPagination() {
      return getPagesInPagination(this.pagesAll, this.page)
    }
  },
  methods: {
    ...mapActions('products', ['updatePageAction']),
    paginate(e, page) {
      if (!e.target.innerText.includes('...')) {
        this.updatePageAction({ page, filter: {} })
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.updatePageAction({ page: this.page - 1, filter: {} })
      }
    },
    nextPage() {
      if (this.page < this.pagesAll) {
        this.updatePageAction({ page: this.page + 1, filter: {} })
      }
    }
  }
}
</script>
