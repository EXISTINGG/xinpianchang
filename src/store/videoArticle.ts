import { defineStore } from 'pinia'
import {getVideoArtice,getSimilarVidoe,getComments,getMore} from '@/api/video'

export const useVideoArticleStore = defineStore('videoArticle', {
  state: () => {
    return {
      videoArticle: [] as any,
      similarVidoe: [] as any,
      commentsList: [] as any,
      loadMoreUrl: '',
      refreshing: false,
      finished: false,
      loading: false,
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
    async getMoreList(onRefresh: boolean) {
      if(this.loadMoreUrl == '') {
        this.refreshing = false   
        this.finished = false 
        return this.loading = false
      }
      const {data} = await getMore(this.loadMoreUrl)
      console.log(data);
      if(onRefresh) {
        this.commentsList.splice(0, 0, ...data.data.list)
        // this.commentsList = data.data.list
      } else {
        this.commentsList.splice(this.commentsList.length, 0, ...data.data.list)
        // this.commentsList = data.data.list
      }
      
      this.refreshing = false   
      this.finished = false 
      this.loading = false

      this.loadMoreUrl = data.data.next_page_url

        if (data.data.next_page_url == null) {
          this.loadMoreUrl = ''
          this.refreshing = true
        }
    }
  }
})
