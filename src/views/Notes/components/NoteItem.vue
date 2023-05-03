<template>
  <router-link :to="'/note/'+ note.id">
    <section class="note-box">
    <div class="author-box">
      <div class="avator-name">
        <div class="avator" @click.prevent="">
          <img v-lazy="note.user.avatar">
          <i class="author-v" :class="note.user.author_type === 1 ? 'author-blue-v' : 'author-yellow-v'" v-if="note.user.author_type != 0"></i>
        </div>
        <div class="name-time">
          <div class="name">
            <text>{{note.user.username}}</text>
            <i class="vip-icon" :class="note.user.vip_status === 1 ? 'vip-size' : 'svip-size'" v-if="note.user.vip_status != 0"></i>
          </div>
          <span class="time">{{formatTime(note.addtime)}} 发布</span>
        </div>
      </div>
      <div class="attention-more" @click.prevent="">
        <i class="attention">+ 关注</i>
        <i class="more">:</i>
      </div>
    </div>

    <div class="title-content">
      <h3 v-if="note.title != ''">{{note.title}}</h3>
      <div class="topics-content">
        <i class="topics" v-for="item in note.topics" :key="item.id" v-if="note?.topics != null">#{{item.name}}</i>
        <text class="content" v-if="note.content != ''">
          <van-text-ellipsis
            rows="3"
            :content="note.content"
            expand-text="全部"
            collapse-text="收起"
            @click-action.prevent=""
          />
        </text>
      </div>
    </div>

    <div class="images" v-if="note.images != null">
      <img v-for="(item,i) in note.images.slice(0,3)" :key="item" v-lazy="item" @click.prevent ="getImg(note.images,i)">
      <i class="img-num" v-if="note.images.length > 3">+{{note.images.length}}</i>
    </div>

    <hr v-if="!note.article?.cover"/>
    <!-- 根据有没有视频封面来判断是否有视频 -->
    <div class="video-card" v-if="note.article?.cover">
      <div class="poster">
        <router-link  :to="`/video/${note.article.id}`">
          <img v-lazy="note.article.cover">
          <div class="count">
            <i><van-icon name="eye-o" />{{getVideoCount(note.article.count.count_view)}}</i>
            <i><van-icon name="good-job-o" />{{getVideoCount(note.article.count.count_like)}}</i>
            <i>{{getVideoDuration(note.article.duration)}}</i>
          </div>
        </router-link>
      </div>
      <div class="video-title">
        <h5>{{note.article.title}}</h5>
        <text>@{{note.article.author.userinfo.username}}</text>
      </div>
    </div>

    <div class="tool-bar" @click.prevent="">
      <i><img :src="like"><text v-if="note.count.count_liked != 0">{{note.count.count_liked}}</text><i v-else>喜欢</i></i>
      <i><img :src="comment"><text v-if="note.count.count_commented != 0">{{note.count.count_commented}}</text><i v-else>评论</i></i>
      <i><img :src="share"><text v-if="note.count.count_shared != 0">{{note.count.count_shared}}</text><i v-else>分享</i></i>
    </div>
  </section>
  </router-link>
<!-- 图片展示 -->
<van-image-preview></van-image-preview>
</template>

<script setup lang="ts">
import {ref,reactive, onMounted} from 'vue'
import useVideoCount from '@/hooks/useVideoCount.ts'
import { showImagePreview } from 'vant'
import like from '@/assets/icon/like.png'
import comment from '@/assets/icon/comment.png'
import share from '@/assets/icon/share.png'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})
const {getVideoCount, strLength,formatTime,getVideoDuration} = useVideoCount()

const getImg = (imgs, i) => {   
  showImagePreview({
    images: imgs,
    loop: false,
    startPosition: i
  });
}

onMounted(() => {})
</script>


<style lang="scss" socped>
.note-box {
  padding: 5px 10px; 
  margin: 10px 0;
  background: #fff;

  hr {
    margin: 5px 0;
  }

  .author-box {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .avator-name {
      display: flex;
      align-items: center;

      .avator {
        position: relative;
        border-radius: 50%;
        width: 40px;
        height: 40px;

        img {
          @extend .avator;
          object-fit: cover;
          border: .5px solid #ccc;
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
            width: 12px;
            height: 12px;
          }
          .author-yellow-v {
            background-image: url($author-yellow-v);
          }
          .author-blue-v {
            background-image: url($author-blue-v);
          }
      }

      .name-time {
        margin-left: 10px;

        .name {
          display: flex;
          align-items: center;

          text {
            font-size: 14px;
          }

          .vip-icon {
          margin-left: 5px;
          background-size: cover;
          background-repeat: no-repeat;
          display: inline-block;

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

        .time {
          margin-top: 5px;
          color:#9ca3ad;
        }
      }
    }

    .attention-more {
      display: flex;
      align-items: center;
      .attention {
        color:$color-primary;
      }

      .more {
        margin-left: 10px;
      }
    }
  }

  .title-content {
    margin-top: 10px;

    .topics-content {

      .topics {
        white-space: nowrap;
        color: blue;
      }

      .content {
            word-break:break-all;
      }
    }
    
    
  }

  .images {
    margin: 10px 0;
    position: relative;
    display: flex;
    width: 100%;
    height: 100px;

    img {
      margin-right: 5px;
      max-width: 33%;
      width: 33%;
      height: 100%;
      border-radius: 5px;
      object-fit: cover;
    }

    .img-num {
      position: absolute;
      bottom: 0;
      right: 10px;
      color: #fff;
      font-size: 14px;
      background: rgba(0,0,0,.2);
      padding: 2px;
    }
  }

  .video-card {
    display: flex;
    width: 100%;
    height: 90px;
    margin: 5px 0;
    
    .poster {
      position: relative;
      width: 50%;
      height: 100%;

      img {
        @extend .poster;
        width: 100%;
        object-fit: cover;
      }

      .count {
        display: flex;
        justify-content: space-around;
        position: absolute;
        bottom: 0;
        width: 100%;
        color: #fffefe;
        text-shadow: 0 0 5px rgba(0, 0, 0, 1);
      }
    }

    .video-title {
      display: flex;
      flex-direction: column;
      padding: 10px;
      width: 50%;
      background: #f3f4f6;

      h5 {
         display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 显示 3 行内容 */
        overflow: hidden;
      }

      text {
        margin-top: 10px;
      }
    }
  }

  .tool-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;

    img {
      margin-right: 5px;
      width: 15px;
      height: 15px;
    }
  }
}
</style>
