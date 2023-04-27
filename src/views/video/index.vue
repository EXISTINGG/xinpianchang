<template>
  <!-- 视频 -->
  <div class="video-box">
    <video controls autoplay muted>
      <source v-for="item in videoArticleStore.videoArticle.video.content.progressive" :key="item.id" :src="item.url" type="video/mp4" v-if="videoArticleStore.videoArticle.length != 0"/>
      <!-- <source src="video.webm" type="video/webm" />
      <source src="video.ogv" type="video/ogg" /> -->
    </video>
  </div>
  <!-- 视频简介/评论tab -->
  <InfoComments />
</template>

<script setup lang="ts">
import {useVideoArticleStore} from '@/store/videoArticle.ts'

import InfoComments from './components/InfoComments.vue'

const videoArticleStore = useVideoArticleStore()
</script>

<style lang="scss" scoped>
.video-box {
  height: 200px;
  width: 100%;

  video {
    @extend .video-box;
    object-fit: fill;
  }
}
</style>
