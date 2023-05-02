import { defineStore } from 'pinia'
import { getNotes,getNotesMore } from '@/api/note'

export const useNoteDataStore = defineStore('noteData', {
  state: () => {
    return {
      notes: [] as any,
      loadMoreUrl: '',
      refreshing: false,
      loading: false,
      finished: false,
    }
  },

  actions: {
    async getNotesList() {
      const {data} = await getNotes()
      this.notes = data.data.list
      this.loadMoreUrl = data.data.next_page_url
    },

    async getNotesMoreList(onRefresh: boolean) {
      if (this.loadMoreUrl == '') return
      try {
        const {data} = await getNotesMore(this.loadMoreUrl)
        if (onRefresh) {
          this.notes.splice(0,0,...data.data.list)
        } else {
          this.notes.splice(this.notes.length,0,...data.data.list)
        }
        this.loadMoreUrl = data.data.next_page_url
        this.refreshing = false
        this.loading = false
        this.finished = false
      } catch (error) {
      }
    }
  }
})