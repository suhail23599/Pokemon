<template>
  <div
    class="card-wrapper"
    @click="goToDetailPage"
  >
    <img
      :src="getImageURL()"
      alt="pokemon-image"
    >
    <div class="name">
      {{ name }}
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'CardDetail',
  props: {
    id: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const router = useRouter()

    const getImageURL = () => {
      return `https://img.pokemondb.net/artwork/large/${props.name}.jpg`
    }
    const goToDetailPage = () => {
      const params = {
        name: props.name,
        id: props.id
      }
      router.push({path: `/detail`, query: params})
    }
    return {
      getImageURL,
      goToDetailPage
    }
  }
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  flex-basis: 24%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 100px;
  }
  @media (max-width: 612px) {
    flex-basis: 48%;
  }
}
</style>