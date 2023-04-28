<template>
  <van-tabs v-model:active="active" color="#e74b3b" animated swipeable>
    <van-tab title="简介">
      <VideoInfo />
    </van-tab>
    <van-tab title="评论">
      <Comments />
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import VideoInfo from './VideoInfo.vue'
import Comments from '@/components/Comments.vue'

const active = ref(0)
</script>

<style>
/* .top {
  margin-top: 0.53333rem + 5.33333rem 5.86666rem;
  offset-top="5.33333rem"	
} */
</style>
