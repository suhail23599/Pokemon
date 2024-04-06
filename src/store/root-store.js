import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive } from 'vue'

const BASE_URL = 'https://pokeapi.co/api/v2/'
const CACHE_TTL = 1800000 // 30 min
export const useRootStore = defineStore('useRootStore', () => {
  const cache = reactive({})

  const getPokemonList = async (queryParams) => {
    const endPoint = BASE_URL + 'pokemon/'
    const key = `${endPoint}${JSON.stringify(queryParams)}`
    if (isCacheKeyPresent(key)) {
      return cache[key].val
    } else {
      try {
        const response = await axios.get(endPoint, {
          params: queryParams
        })
        cache[key] = {
          val: response,
          expiry: Date.now() + CACHE_TTL
        }
        return cache[key].val
      } catch (err) {
        console.log('error in making api call')
      }
    }
  }

  const getPokemonDetails = async (id) => {
    const endPoint = BASE_URL + 'pokemon/' + id
    const key = `${endPoint}${id}`
    if (isCacheKeyPresent(key)) {
      return cache[key].val
    } else {
      try {
        const response = await axios.get(endPoint)
        cache[key] = {
          val: response,
          expiry: Date.now() + CACHE_TTL
        }
        return cache[key].val
      } catch (err) {
        console.log('error in making api call')
      }
    }
  }

  const isCacheKeyPresent = (key) => {
    const entry = cache[key]
    if (!entry || Date.now() > entry.expiry) {
      // make new api call
      return false
    }
    return true
  }
  return {
    getPokemonList,
    getPokemonDetails
  }
})