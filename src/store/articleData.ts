import { defineStore } from 'pinia'
import {getArticle,getArticleComments} from '@/api/article'

export const useArticleDataStore = defineStore('articleData', {
  state: () => {
    return {
      article: [] as any,
      articleComments: [] as any,
    }
  },

  actions: {
    async getArticleList(id: string) {
      const {data} = await getArticle(id)
      this.article = data   
    },

    async getArticleCommentsList(id: string) {
      
      const {data} = await getArticleComments(id)
      this.articleComments = data.data.list
    }
  }
})