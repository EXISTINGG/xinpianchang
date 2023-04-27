<template>

  <div class="bigcard-box">
    <div class="author-box">
      <!-- 作者 -->
      <div class="author">
        <div class="author-left">
          <div class="author-avator">
            <img
              v-lazy="video.resource.author.userinfo.avatar"
            />
            <span class="author-v" :class="video.resource.author.userinfo.author_type === 1 ? 'author-blue-v' : 'author-yellow-v'" v-if="video.resource.author.userinfo.author_type != 0"></span>
          </div>
          &nbsp;
          <!-- name>=8 ··· -->
          <span class="author-name">{{strLength(video.resource.author.userinfo.username) >= 16 ? video.resource.author.userinfo.username.substring(0,6) + '···' : video.resource.author.userinfo.username}}</span> &nbsp;
          <span class="vip-img" :class="video.resource.author.userinfo.vip_status === 1 ? 'vip-size' : 'svip-size'" v-if="video.resource.author.userinfo.vip_status != 0"></span> &nbsp;
          <span class="team-count" v-if="video.resource.team_user_count != 0">和其他 <strong>{{video.resource.team_user_count}}</strong> 人</span>
        </div>
        <div class="author-right">
          <text class="attention">+关注</text>
          <span class="share">:</span>
        </div>
      </div>
      <!-- 标题 -->
      <h6 class="video-title">{{video.resource.title}}</h6>
    </div>
    <!-- 视频 -->
    <router-link :to="`/video/${video.resource.id}`">
      <div class="video-box">
        <!-- src web_url?url?id? -->
        <!-- :src="'https://apis.netstart.cn/xpc/media/' + video.resource.video_library_id" -->
        <!-- https://us-xpc5.xpccdn.com/af035d5d-3d0e-4866-a448-44355a69f7d4.mp4 -->
        <!-- :src="video.resource.video_library_id" -->
        <video
          muted
          autoplay
          playsinline
          :poster="video.resource.cover"
        >
          <source :src="video.resource.video_library_id" type="video/mp4">
        </video>
        <!-- 4k -->
        <span class="resolution_type" v-if="video.resource.resolution_type != ''">{{video.resource.resolution_type}}</span>
        <span class="count_view-duration">{{getVideoCount(video.resource.count.count_view)}}观看 | {{getVideoDuration(video.resource.duration)}}</span>
      </div>
    </router-link>
    <!-- 收藏 -->
    <div class="toolbar-box">
      <span class="count_collect"><img :src="collectIcon"/>{{getVideoCount(video.resource.count.count_collect)}}</span>
      <span class="count_comment"><img :src="commentIcon"/>{{getVideoCount(video.resource.count.count_comment)}}</span>
      <span class="count_like"><img :src="likeIcon"/>{{getVideoCount(video.resource.count.count_like)}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref } from 'vue'
import useVideoCount from '@/hooks/useVideoCount.ts'
// icon
import collect from '@/assets/icon/collect.png'
import collected from '@/assets/icon/collected.png'
import comment from '@/assets/icon/comment.png'
import like from '@/assets/icon/like.png'
import liked from '@/assets/icon/liked.png'
// icon
const collectIcon = collect
const collectedIcon = collected
const commentIcon = comment
const likeIcon = like
const likedIcon = liked
// 接收父组件的数据
const props = defineProps({
  video: {
    type: Object,
    required: true
  }
})
// console.log(111,props.video.resource.author.userinfo.username);

const {getVideoDuration, getVideoCount, strLength} = useVideoCount()
</script>

<style lang="scss" scoped>
.bigcard-box {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  width: 100%;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 10px;

  .author-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 20px;

    .author {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .author-left {
        display: flex;
        align-items: center;
        width: 80%;

        .author-avator {
          position: relative;
          width: 30px;
          height: 30px;

          img {
            @extend .author-avator;
            border-radius: 50%;
            object-fit: cover;
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
            width: 10px;
            height: 10px;
          }
          .author-yellow-v {
            background-image: url($author-yellow-v);
          }
          .author-blue-v {
            background-image: url($author-blue-v);
          }
        }

        .vip-img {
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

      .author-right {
        .attention {
          margin-right: 20px;
          color: $color-primary;
        }
      }
    }

    .video-title {
      margin: 5px 0;
      font-size: 14px;
    }
  }

  .video-box {
    width: 100%;
    height: 200px;
    position: relative;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .resolution_type,.count_view-duration {
      position: absolute;
      right: 10px;
      color: #fff;
    }
    .resolution_type {
      top: 10px;
      width: 20px;
      text-align: center;
      font-weight: 600;
      background: rgba(0,0,0,.1);
      border: 1px solid #fff;
    }
    .count_view-duration {
      color: #fffefe;
      bottom: 10px;
      font-weight: 300;
      z-index: 1;
      text-shadow: 0 0 5px rgba(0, 0, 0, 1);
    }
  }

  .toolbar-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 16px;
    margin-top: 5px;

    img {
      width: 16px;
      margin-right: 5px;
    }

    .count_collect img {
      width: 20px;
    }
  }
}
</style>
