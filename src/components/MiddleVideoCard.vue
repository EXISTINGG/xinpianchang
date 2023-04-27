<template>
<!-- :to="video.resource.url" -->
<router-link :to="`/video/${video.resource.id}`">
  <div class="middlecard-box">
    <div class="video-cover">
      <img
        v-lazy="video.resource.cover"
      />
      <div class="collect-like-duration">
        <span><van-icon name="eye-o" /> {{getVideoCount(video.resource.count.count_view)}}</span>
        <span><van-icon name="good-job-o" /> {{getVideoCount(video.resource.count.count_like)}}</span>
        <span>{{getVideoDuration(video.resource.duration)}}</span>
      </div>
    </div>
    <div class="title-author">
      <div class="video-title">
        <h4>{{video.resource.title}}</h4>
      </div>
      <div class="video-author">
        <div class="name-vip">
          <span class="name">{{strLength(video.resource.author.userinfo.username) >= 16 ? video.resource.author.userinfo.username.substring(0,6) + '···' : video.resource.author.userinfo.username}}</span>
          &nbsp;<span class="vip-icon" :class="video.resource.author.userinfo.vip_status === 1 ? 'vip-size' : 'svip-size'" v-if="video.resource.author.userinfo.vip_status != 0"></span>
        </div>
        <div>:</div>
      </div>
    </div>
  </div>
</router-link>
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

const {getVideoDuration, getVideoCount, strLength} = useVideoCount()
</script>

<style lang="scss" scoped>
.middlecard-box {
  display: flex;
  flex-direction: column;
  background: #fff;
  // width: 49%;
  width: 100%;
  height: 160px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;

  .video-cover {
    position: relative;
    height: 50%;
    width: 100%;
    

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .collect-like-duration {
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: 1px;
      width: 100%;
      color: #fffefe;
      text-shadow: 0 0 5px rgba(0, 0, 0, 1);
    }
  }

  .title-author {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
      height: 50%;


    .video-title {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .video-author {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      color: #a1a1a1;

      .name-vip {
        .vip-icon {
          display: inline-block;
          background-size: cover;
          background-repeat: no-repeat;
        }
        .vip-size {
          width: 11px;
          height: 11px;
          background-image: url($vip-icon);
        }
        .svip-size {
          width: 30px;
          height: 12px;
          background-image: url($sup-vip);
        }
      }
    }
  }
}
</style>
