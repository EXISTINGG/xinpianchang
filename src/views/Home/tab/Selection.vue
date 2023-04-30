<template>
<h2>{{videoDataStore.videoCardTitle}}</h2>
<div calss="big-video">
  <BigVideoCard v-for="item in videoDataStore.videoData.selectVideo" :key="item.children[0].model.resource.id" :video="item.children[0].model"/>
</div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import BigVideoCard from '@/components/BigVideoCard.vue'
import {useVideoDataStore} from '@/store/videoData.ts'

const videoDataStore = useVideoDataStore()

onMounted(() => {
  videoDataStore.getSelectList()
})
</script>