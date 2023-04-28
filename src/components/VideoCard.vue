<template>
 <router-link :to="`/video/${video.id}`">
  <div class="video-box">
  <div class="video-poster">
    <img v-lazy="video.cover">
    <span class="video-duration">{{getVideoDuration(video.duration)}}</span>
  </div>
  <div class="video-info">
    <h3 class="title">{{video.title}}</h3>
    <span class="view-like">播放量 {{getVideoCount(video.count.count_view)}} · 喜欢 {{getVideoCount(video.count.count_like)}}</span>
    <div class="author-info">
      <div class="avator">
        <img v-lazy="video.author.userinfo.avatar">
        <span class="author-v" :class="video.author.userinfo.author_type === 1 ? 'author-blue-v' : 'author-yellow-v'" v-if="video.author.userinfo.author_type != 0"></span>
      </div>
      <!-- name >= 8 -->
      <text class="name">{{strLength(video.author.userinfo.username) > 16 ? video.author.userinfo.username.substring(0,6) + '···' : video.author.userinfo.username}}</text>
      <span class="vip-icon" :class="video.author.userinfo.vip_status === 1 ? 'vip-size' : 'svip-size'" v-if="video.author.userinfo.vip_status != 0"></span>
    </div>
  </div>
</div>
 </router-link>
<van-divider />
</template>

<script setup lang="ts">
import useVideoCount from '@/hooks/useVideoCount.ts'

// 接收父组件的数据
const props = defineProps({
  video: {
    type: Object,
    required: true
  }
})

const {getVideoDuration,getVideoCount,strLength} = useVideoCount()
</script>

<style lang="scss">
.video-box {
  display: flex;
  align-items: center;

  .video-poster {
    position: relative;
    width: 150px;
    height: 100%;
    border-radius: 5px;

    img {
      @extend .video-poster;
      height: 85px;
      border: .5px solid #ccc;
    }

    .video-duration {
      position: absolute;
      bottom: 5px;
      right: 5px;
      color: #fffefe;
      text-shadow: 0 0 5px rgba(0, 0, 0, 1);
    }
  }

  .video-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    // height: 100%;

    .title {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .view-like {
      margin: 5px 0;
      font-size: 12px;
      color: #a1a1a1;
    }

    .author-info {
      display: flex;
      align-items: center;

      .avator {
        position: relative;
        width: 20px;
        height: 20px;
        border-radius:50%;

        img {
          @extend .avator;
        }

        .author-v {
          position: absolute;
          bottom: 0;
          right: 0;
          display: inline-block;
            background-size: cover;
            background-repeat: no-repeat;
        }

        .author-yellow-v,
          .author-blue-v {
            width: 7px;
            height: 7px;
          }
          .author-yellow-v {
            background-image: url($author-yellow-v);
          }
          .author-blue-v {
            background-image: url($author-blue-v);
          }
      }

      .name {
        margin-left: 5px;
        color: #5c5c5c;
      }

      .vip-icon {
        margin-left: 5px;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .vip-size {
          width: 15px;
          height: 15px;
          background-image: url($vip-icon);
        }
        .svip-size {
          width: 40px;
          height: 16px;
          background-image: url($sup-vip);
        }
    }
  }
}
</style>