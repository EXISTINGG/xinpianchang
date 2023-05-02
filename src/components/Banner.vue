<template>
<van-swipe :autoplay="3000" :duration="1000" class="swipe-box">
  <van-swipe-item v-for="item in videoDataStore.banner" class="swipe-item">
    <router-link :to="'/article/' + /[a-zA-Z0-9]*\?/.exec(/[a-zA-Z0-9]*\?from/.exec(decodeURIComponent(item.model.link)))">
      <img :src="item.model.cover" />
  <!-- banner-title -->
  <span class="banner-title">{{item.model.title}}</span>
    </router-link>
  </van-swipe-item>
  <!-- indicator -->
  <template #indicator="{ active, total }">
    <div class="custom-indicator"><h2>{{ active + 1 }}</h2>/{{ total }}</div>
  </template>
</van-swipe>
</template>

<script setup lang="ts">
import { useVideoDataStore } from '@/store/videoData.ts'

const videoDataStore = useVideoDataStore()
</script>

<style lang="scss" scoped>
.swipe-box, .swipe-item {
  width: 100%;
  height: 170px;
  border-radius: 5px;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .banner-title {
    position: absolute;
    left: 10px;
    bottom: 5px;
    z-index: 999;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }

  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 14px;
    color: #fff;

    h2 {
      display: inline-block;
    }
  }
} 
</style>