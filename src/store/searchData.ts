import { defineStore } from 'pinia'
import {getSearchKws,getresultByKw,getMore,getresultByKwAndSort,getCreators} from '@/api/search'
import {setItem,getItem,removeItem} from '@/utils/localStorage'

interface IsearchKws {
  id: number | string
  name: string
}

export const useSearchDataStore = defineStore('searchData', {
  state: () => {
    return {
      searchKws: [] as IsearchKws[],
      historyKes: [] as string[],
      articleResult: [] as any,
      creatorsResult: [] as any,
      total: 0, // 搜索结果数量
      article: {
        loading: false,
        finished: false,
        loadMoreUrl: '',
      },
      creator: {
        loading: false,
        finished: false,
        loadMoreUrl: '',
      }
    }
  },

  actions: {
    async getSearchKwsList() {
      const {data} = await getSearchKws()
      this.searchKws = data.data.list
    },

    // 取手搜索历史数据
    getHistoryKes() {
      this.historyKes = [...getItem('historyKes')]
    },

    // 搜索历史
    setHistoryKes(text: string) {
      // 找出索引
      let index = this.historyKes.findIndex((item: any) => item === text)
      // 是否搜索过
      if (index === -1) {
        // 如果没有搜索过该词,放入数组最前
        this.historyKes.splice(0,0,text)
      } else {
        // 如果有,将该词放在最前面
        this.historyKes.splice(index,1)
        this.historyKes.splice(0,0,text)
      }
      setItem('historyKes',this.historyKes)
    },

    // 清空搜索历史
    removeHistoryKes() {
      removeItem('historyKes')
    },

    // 根据关键词搜索
    async getresultByKwList(ky: string) {
      const {data} = await getresultByKw(ky)
      
      this.articleResult = data.data.list
      this.total = data.data.total
      this.article.loadMoreUrl = data.data.next_page_url      
    },

    async getMoreArticleList() {
      if (this.article.loadMoreUrl == '' || this.article.loadMoreUrl == null) return this.article.finished = true

      const {data} = await getMore(this.article.loadMoreUrl)

      if (data.code == 404) return this.article.finished = true

      this.articleResult.splice(this.articleResult.length, 0, ...data.data.list)
      this.total = data.data.total
      this.article.loadMoreUrl = data.data.next_page_url

      this.article.loading = false
    },

    // 根据关键词搜索&排序方式
    async getresultByKwAndSortList(kw: string, sort: string,downLoad?: string | number) {
      const {data} = await getresultByKwAndSort(kw,sort,downLoad)
      this.articleResult = data.data.list
      this.total = data.data.total
      this.article.loadMoreUrl = data.data.next_page_url
    },

    // 创作人
    async getCreatorsList() {
      const {data} = await getCreators()
      
      this.creatorsResult = data.data.list
      this.creator.loadMoreUrl = data.data.next_page_url
    },

    async getMoreCreatorsList() {
      
      if (this.creator.loadMoreUrl == '' || this.creator.loadMoreUrl == null) return this.creator.finished = true

      const {data} = await getMore(this.creator.loadMoreUrl)
      
      if (data.code == 404) return this.creator.finished = true

      this.creatorsResult.splice(this.creatorsResult.length, 0, ...data.data.list)
      this.creator.loadMoreUrl = data.data.next_page_url

      this.creator.loading = false
    },
  }
})