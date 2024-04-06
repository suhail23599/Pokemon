<template>
  <template v-if="isLoading">
    <LoaderView />
  </template>
  <div
    v-else
    class="detail-page"
  >
    <div
      v-if="pokemonInfo"
      class="pokemon-info"
    >
      <div class="first-section">
        <img
          :src="pokemonInfo.image"
          alt="pokemon-img"
        >
        <div class="details">
          <section>
            <div class="key">
              Height
            </div>
            <div class="value">
              {{ pokemonInfo.height }}
            </div>
          </section>
          <section>
            <div class="key">
              Weight
            </div>
            <div class="value">
              {{ pokemonInfo.weight }}
            </div>
          </section>

          <section>
            <div class="key">
              Abilities
            </div>
            <div class="value">
              <div
                v-for="item in pokemonInfo.abilities"
                :key="item.id"
              >
                {{ item.ability.name }}
              </div>
            </div>
          </section>
          <section>
            <div class="key">
              Type
            </div>
            <div class="value">
              <div
                v-for="item in pokemonInfo.types"
                :key="item.id"
              >
                {{ item.type.name }}
              </div>
            </div>
          </section>
        </div>
      </div>
      <div class="second-section">
        <div class="heading">
          Stats
        </div>
        <div class="stat-container">
          <template
            v-for="item in pokemonInfo.stats"
            :key="item.id"
          >
            <div class="stat-val">
              <div class="key">
                {{ item.stat.name }}
              </div>
              <span class="value">{{ item.base_stat }} </span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useRootStore } from'@/store/root-store'
import { computed, onMounted, ref } from 'vue'
import LoaderView from'@/components/LoaderView.vue'
export default {
  components: {
    LoaderView
  },
  setup() {
    const route = useRoute()
    const rootStore = useRootStore()
    const pokemonInfo = ref({})
    const getId = computed(() => route.query?.id)
    const isLoading = ref(true)

    const getPokemonDetailsInfo = () => {
      isLoading.value = true
      rootStore.getPokemonDetails(getId.value).then((resp) => {
        setPokemonInfo(resp.data)
      }).catch(() => {
        console.log('error')
      }).finally(() => {
        isLoading.value = false
      })
    }
    
    const setPokemonInfo = (data) => {
      const { height, weight, types, abilities, stats } = data
      pokemonInfo.value = {
        image: getImageURL(),
        height,
        weight,
        types,
        abilities,
        stats
      }
      console.log(pokemonInfo.value)
    }

    const getImageURL = () => {
      return `https://img.pokemondb.net/artwork/large/${route.query.name}.jpg`
    }

    onMounted(() => {
      getPokemonDetailsInfo()
    })

    return {
      pokemonInfo,
      isLoading
    }

  },
}
</script>

<style scoped lang="scss">
.detail-page {
  max-width: 1024px;
  margin: 0 auto;
  .pokemon-info {
    padding: 8px;
    img {
      height: 200px;
    }
    .first-section {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .details {
      // width: 400px;
      flex-grow: 1;
      padding: 20px;
      background: rgb(48, 167, 215);
      border-radius: 8px;
      display: flex;
      flex-wrap: wrap;
      .key {
        color: #ffff;
        font-size: 16px;
      }
      .value {
        font-size: 16px;
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      section {
        flex-basis: 50%;
      }
    }
    .second-section {
      margin-top: 20px;
      background: #9bcc50;
      padding: 10px;
      border-radius: 8px;
      .heading {
        text-align: center;
        margin-bottom: 12px;
        padding: 8px;
        border-radius: 8px;
        background: #dedede;
        font-size: 16px;
      }
      .stat {
        &-container {
          display: flex;
          flex-wrap: wrap;
          row-gap: 8px;
        }
        &-val {
          flex-basis: 50%;
          font-size: 16px;
          .key {
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>