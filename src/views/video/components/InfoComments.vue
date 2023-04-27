<template>
  <van-tabs v-model:active="active" color="#e74b3b" animated swipeable>
    <van-tab title="简介">
      <videoInfo />
    </van-tab>
    <van-tab title="评论">
      <Comments />
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import videoInfo from './VideoInfo.vue'
import Comments from '@/components/Comments.vue'

const active = ref(0)
</script>

<style>

</style>
