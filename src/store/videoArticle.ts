import { defineStore } from 'pinia'
import {getVideoArtice,getSimilarVidoe,getComments,getMore} from '@/api/video'

export const useVideoArticleStore = defineStore('videoArticle', {
  state: () => {
    return {
      videoArticle: [] as any,
      similarVidoe: [] as any,
      commentsList: [] as any,
      loadMoreUrl: '',
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
    },

    // 视频评论
    async getCommentsList(id: number) {
      const {data} = await getComments(id)
      console.log(data); 
      this.commentsList = data.data.list
      this.loadMoreUrl = data.data.next_page_url
    },

    // 加载更多
    async getMoreList() {
      if(this.loadMoreUrl == '') return
      const {data} = await getMore(this.loadMoreUrl)
      console.log(data);
      // this.commentsList = data.data.list
      this.loadMoreUrl = data.data.next_page_url
    }
  }
})
