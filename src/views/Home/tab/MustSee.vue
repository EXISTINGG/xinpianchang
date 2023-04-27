<template>
MustSee
<div calss="big-video">
  <BigVideoCard v-for="item in videoDataStore.videoData.mustVideo" :key="item.children[0].model.resource.id" :video="item.children[0].model"/>
</div>
</template>

<script setup lang="ts">
// import {onBeforeMount} from 'vue'
console.log('MustSee');
import {onMounted} from 'vue'
import BigVideoCard from '@/components/BigVideoCard.vue'
import {useVideoDataStore} from '@/store/videoData.ts'

const videoDataStore = useVideoDataStore()

onMounted(() => {
  videoDataStore.getMustList()
})

</script>