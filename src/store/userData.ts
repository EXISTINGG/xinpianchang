import { defineStore } from 'pinia'
import {getUser,getUserArticles,getMore,getUseruserApproved,getUserCollections,getUserFollowers,getUserFollowees} from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: [] as any,
      userArticle: [] as any, // 作品
      userApproved: [] as any,
      userCollect: [] as any,
      userFollowers: [] as any,
      showSkeleton: false, 
      // 细分finished,loading,loadMoreUrl
      articel: {
        finished: false,
        loading: false,
        loadMoreUrl: '',
      },
      approved: {
        finished: false,
        loading: false,
        loadMoreUrl: '',
      },
      collect: {
        finished: false,
        loading: false,
        loadMoreUrl: '',
      },
      follower: {
        refreshing: false,
        finished: false,
        loading: false,
        loadMoreUrl: '',
      }
    }
  },

  actions: {
    async getUserList(id: string) {
      try {
        this.showSkeleton = true
        // 有些用户没有详情页,如xx广告,xx精选,此时,请求404
        const {data} = await getUser(id)
        this.showSkeleton = false
        this.user = data.data   
      } catch (error) {
        this.showSkeleton = false
      }
    },

    async getUserArticlesList(id: string) {
      const {data} = await getUserArticles(id)
      
      this.userArticle = data.data.list
      this.articel.loadMoreUrl = data.data.next_page_url
    },

    async getMoreArticlesList() {
      
      if (this.articel.loadMoreUrl == null || this.articel.loadMoreUrl == '') return this.articel.finished = true
      
      const {data} = await getMore(this.articel.loadMoreUrl)
      
      this.userArticle.splice(this.userArticle.length,0,...data.data.list)
      this.articel.loadMoreUrl = data.data.next_page_url
      this.articel.loading = false
    },

    async getUseruserApprovedList(id: string) {
      const {data} = await getUseruserApproved(id)
      this.userApproved = data.data.list
      this.approved.loadMoreUrl = data.data.next_page_url
    },

    async getMoreApprovedList() {

      if (this.approved.loadMoreUrl == null || this.approved.loadMoreUrl == '') return this.approved.finished = true

      const {data} = await getMore(this.approved.loadMoreUrl)

      this.userApproved.splice(this.userApproved.length,0,...data.data.list)
      this.approved.loadMoreUrl = data.data.next_page_url
      this.approved.loading = false
    },

    async getUserCollectionsList(id: string) {
      const {data} = await getUserCollections(id)
      this.userCollect = data.data.list
      this.collect.loadMoreUrl = data.data.next_page_url
    },

    async getMoreCollectList() {
      
      if (this.collect.loadMoreUrl == null || this.collect.loadMoreUrl == '') return this.collect.finished = true

      const {data} = await getMore(this.collect.loadMoreUrl)

      this.userCollect.splice(this.userCollect.length,0,...data.data.list)
      this.collect.loadMoreUrl = data.data.next_page_url
      this.approved.loading = false
    },

    // 粉丝
    async getUserFollowersList(id: string) {
      try {
        this.showSkeleton = true
        const {data} = await getUserFollowers(id) 
        // 特殊情况,用户关闭列表,不展示
        this.userFollowers = data.data?.list || []
        this.follower.loadMoreUrl = data.data.next_page_url
        this.showSkeleton = false
      } catch (error) {
        this.showSkeleton = false
      }
    },
    // 关注
    async getUserFolloweesList(id: string) {
      try {
        this.showSkeleton = true
        const {data} = await getUserFollowees(id)
        // 特殊情况,用户关闭列表,不展示
        this.userFollowers = data.data?.list || []
        this.follower.loadMoreUrl = data.data.next_page_url
        this.showSkeleton = false
      } catch (error) {
        this.showSkeleton = false
      }
    },
    // 加载更多,粉丝/关注
    async getMoreFollowersList(onRefresh?: boolean) {

      if (this.follower.loadMoreUrl == null || this.follower.loadMoreUrl == '') {
          this.follower.finished = true
      }
      
      if (this.follower.finished) return this.follower.refreshing = false

      const {data} = await getMore(this.follower.loadMoreUrl)

      if (onRefresh) {
        this.userFollowers.splice(0,0,...data.data.list)
        this.follower.refreshing = false
      } else {
        this.userFollowers.splice(this.userFollowers.length,0,...data.data.list)
        this.follower.loading = false
      }
      this.follower.loadMoreUrl = data.data.next_page_url
    }
  }
})