<template>
  <van-nav-bar
    title="手记"
    :fixed="true"
    :placeholder="true"
    :safe-area-inset-top="true"
    z-index="999"
  />

  <div class="notes-list">
    <van-pull-refresh v-model="noteDataStore.refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="noteDataStore.loading"
            :finished="noteDataStore.finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <NoteItem v-for="item in noteDataStore.notes" :key="item.id" :note="item"/>
          </van-list>
    </van-pull-refresh>
  </div>

  <Tabbar />
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useNoteDataStore} from '@/store/noteData'
import Tabbar from '@/components/Tabbar.vue'
import NoteItem from './components/NoteItem.vue'

const noteDataStore = useNoteDataStore()

const onRefresh = () => noteDataStore.getNotesMoreList()
const onLoad = () => noteDataStore.getNotesMoreList()

onMounted(() => noteDataStore.getNotesList())
</script>

<style lang="scss" scoped>
.notes-list {
  background: $color-background;
  // margin-bottom: 50px;
}
</style>
