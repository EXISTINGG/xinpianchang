<template>
  <div class="comment-list">
    评论
    <van-pull-refresh v-model="videoDataStore.refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="videoDataStore.loading"
        :finished="videoDataStore.finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <!-- 评论 -->
      <div class="comment-box">
        <div class="comment-left">
          <div class="avator">
            <img src="https://oss-v6.xpccdn.com/Uploads/avatar/2014/10/04/543016e781908_180.jpeg">
            <span></span>
          </div>
          <div class="name-content">
            <text class="name">哈哈哈</text>
            <div><span class="reply" v-if="true">回复哈哈哈:</span><span class="content">hhhhhh</span></div>
            <span class="tiem">2022-05-20</span>
          </div>
        </div>
        <div class="comment-right">
          <span class="more">:</span>
          <div class="tool">
            <span class="comment-icon"></span>
            <span class="like-icon"></span>
          </div>
        </div>
      </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { useVideoDataStore } from '@/store/videoData.ts'

const videoDataStore = useVideoDataStore()

const onLoad = () => {}

const onRefresh = () => {}
</script>

<style lang="scss" scoped>
.comment-list {
  margin-top: 10px;
  // padding: 0 10px;

  .comment-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: .5px solid #ccc;
    border-right: none;
    border-left: none;

    .comment-left {
      display: flex;
    }
  }
}
</style>
