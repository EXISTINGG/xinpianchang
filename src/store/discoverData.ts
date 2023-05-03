import { defineStore } from 'pinia'
import {getDiscovery} from '@/api/discover'

export const useDiscoverDataStore = defineStore('discoverData', {
  state: () => {
    return {
      banners: [] as any,
      categories: [] as any,
      recommended_position: [] as any
    }
  },

  actions: {
    async getDiscoveryList() {
      const {data} = await getDiscovery()
      this.banners = data.data.banners
      this.categories = data.data.categories
      this.recommended_position = data.data.recommended_position
    }
  }
})