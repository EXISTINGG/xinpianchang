<template>
  <!-- 视频 -->
  <div class="video-box">
    <video controls autoplay playsinline ref="videoRef" @loadedmetadata="getVideo">
      <source v-for="item in videoArticleStore.videoArticle.video.content.progressive" :key="item.id" :src="item.url" type="video/mp4" v-if="videoArticleStore.videoArticle.length != 0"/>
      <!-- <source src="video.webm" type="video/webm" />
      <source src="video.ogv" type="video/ogg" /> -->
    </video>
  </div>
  <!-- 视频简介/评论tab -->
   <!-- + .00001 解决需要滑动一下才出现tab的bug -->
  <van-tabs class="tabs" v-model:active="active" color="#e74b3b" animated swipeable sticky  :offset-top="videoHeight + .00001">
    <van-tab title="简介" :style="{marginTop: tabHeight + 'px'}">
      <VideoInfo />
    </van-tab>
    <van-tab title="评论" :style="{marginTop: tabHeight + 'px'}">
      <template #title>评论 <span class="comment-num">{{commentNum}}</span></template>
      <Comments />
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import {ref, onMounted, onUpdated } from 'vue'
import {useVideoArticleStore} from '@/store/videoArticle.ts'
import VideoInfo from './components/VideoInfo.vue'
import Comments from '@/components/Comments.vue'

const active = ref(0)
const videoRef = ref(null)
const videoHeight = ref(0)
const tabHeight = ref(0)
const commentNum = ref(0)
const videoArticleStore = useVideoArticleStore()

const getVideo = () => {
  videoHeight.value = videoRef.value.offsetHeight
  tabHeight.value = videoHeight.value
}

const timer = () => setTimeout(() => {
  getVideo()
}, 500);

onMounted(() => { 
timer()
commentNum.value = videoArticleStore.commentsList.length
})

onUpdated(() => {
timer()
commentNum.value = videoArticleStore.commentsList.length
})
</script>

<style lang="scss" scoped>
.video-box {
  z-index: 9999;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: black;

// http://localhost:5173/#/video/10948059

  video {
    @extend .video-box;
    object-fit: contain;
    max-height: 300px;
    // object-fit: fill;
    // object-fit: cover;
  }
}
.tabs {
  --van-tabs-line-height: 50px;	
}

.comment-num {
  color: $color-primary;
  font-weight: 400;
}
</style>
