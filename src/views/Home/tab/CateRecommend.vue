<template>
<div v-if="videoDataStore.banner.length != 0">
  <Banner />
</div>
<BigVideoCard v-for="item in videoDataStore.videoData.CateRecommendVideo" :key="item.children[0].model.resource.id" :video="item.children[0].model"/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import { useVideoDataStore } from '@/store/videoData.ts'
import Banner from '@/components/Banner.vue'
import BigVideoCard from '@/components/BigVideoCard.vue'

const videoDataStore = useVideoDataStore()

onMounted(() => {
  videoDataStore.getCateRecommendList(videoDataStore.recommendLink)
})
</script>