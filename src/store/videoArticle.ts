import { defineStore } from 'pinia'
import {getVideoArtice,getSimilarVidoe} from '@/api/video'

export const useVideoArticleStore = defineStore('videoArticle', {
  state: () => {
    return {
      videoArticle: [] as any,
      similarVidoe: [] as any,
    }
  },

  actions: {
    // 视频详情
    async getVideoArticeList(id: number) {
      const {data} = await getVideoArtice(id)
      console.log(data);
      this.videoArticle = data.data
    },

    // 相识视频
    async getSimilarVidoeList(id: number) {
      const {data} = await getSimilarVidoe(id)
      this.similarVidoe = data.data.list
    }
  }
})
