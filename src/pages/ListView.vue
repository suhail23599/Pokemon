<template>
  <template v-if="isLoading">
    <LoaderView />
  </template>

  <div
    v-else
    class="list-wrapper"
  >
    <CardDetail
      v-for="(pokemon, index) in pokemonInfoList"
      :id="getId(index + 1)"
      :key="pokemon.id"
      :name="pokemon.name"
    />
  </div>
  <div
    v-if="pokemonInfoList.length"
    class="pagination-wrapper"
  >
    <ThePagination
      :page-size="pageSize"
      :current-page="pageNo"
      :total-count="totalItems"
      @on-page-change="onPageChange"
    />
  </div>
</template>

<script>
import { useRootStore } from'@/store/root-store'
import { ref, onMounted } from 'vue'
import CardDetail from '@/components/CardDetail.vue'
import ThePagination from'@/components/ThePagination.vue'
import LoaderView from'@/components/LoaderView.vue'

export default {
  name: 'ListView',
  components: {
    CardDetail,
    ThePagination,
    LoaderView
  },
  setup() {
    const rootStore = useRootStore()
    const pageNo = ref(0)
    const pageSize = 20
    const pokemonInfoList = ref([])
    const totalItems = ref(0)
    const isLoading = ref(true)

    onMounted(() => {
      getPokemons()
    })
    function getPokemons () {
      isLoading.value = true
      const params = {
        offset: pageNo.value * pageSize,
        limit: pageSize
      }
      rootStore.getPokemonList(params).then((resp) => {
        pokemonInfoList.value = resp.data?.results || []
        totalItems.value = resp.data?.count
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        isLoading.value = false
      })
    }

    function getId (index) {
      return (pageNo.value * pageSize) + index
    }

    function onPageChange (val) {
      pageNo.value = val - 1
      getPokemons()
    }

    return {
      pokemonInfoList,
      getId,
      pageSize,
      pageNo,
      totalItems,
      onPageChange,
      isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pagination-wrapper {
  margin-top: 8px;
  position: fixed;
  bottom: 10px;
}
</style>