<template>
  <div class="pagination">
    <a
      v-if="left !==1"
      role="button"
      class="pagination__prev page-unit"
      :class="{'disable': left === 1}"
      href="#"
      @click.prevent="gotoPrevPage"
    >
      Prev
    </a>
    <ul class="pagination__list">
      <!-- Render pages -->
      <li
        v-for="(page) in pagesInRange()"
        :key="page.id"
        class="page-unit"
        :class="{'selected': currentPage+1 === page}"
        @click="onPageChange(page)"
      >
        <a
          role="button"
        >
          {{ page }}
        </a>
      </li>
    </ul>
    <a
      v-if="right !== totalPages"
      role="button"
      class="pagination__next page-unit"
      :class="{'disable': right === totalPages}"
      href="#"
      @click="gotoNextPage"
    >
      Next
    </a>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
export default {
  name: 'ThePagination',
  props: {
    currentPage: {
      type: Number,
      require: true,
      default: 0
    },
    pageSize: {
      type: Number,
      require: true,
      default: 20
    },
    totalCount: {
      type: Number,
      require: true,
      default: 0
    }
  },
  emits: ['onPageChange'],
  setup(props, context) {
    const limit = 5
    const left = ref(1)
    const right = ref()
    const totalPages = computed(() => {
      return Math.ceil(props.totalCount / props.pageSize)
    })
    const gotoPrevPage = () => {
      left.value = left.value - limit
    }
    const gotoNextPage = () => {
      left.value = right.value + 1
    }

    const pagesInRange = () => {
      const pages = []
      for(let i=left.value; i<left.value + limit; ++ i) {
        if (i<=totalPages.value) {
          pages.push(i)
          right.value = i;
        } else {
          break
        }
      }
      return pages
    }

    const onPageChange = (page) => {
      context.emit('onPageChange', page)
    }
    return {
      gotoPrevPage,
      gotoNextPage,
      totalPages,
      pagesInRange,
      left,
      right,
      onPageChange
    }
  },
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  gap: 10px;
  ul {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    color: #ffff;
  }
  li {
    cursor: pointer;
  }
  .page-unit {
    padding: 6px 16px;
    background: #4169e1;
    border-radius: 4px;
    color: #fff;
  }
  &__list {
    display: flex;
    gap: 8px;
  }
  .disable {
    pointer-events: none;
  }
  .selected {
    background: white;
    border: 1px solid #4169E1;
    a {
      color: black;
    }
  }
}
</style>