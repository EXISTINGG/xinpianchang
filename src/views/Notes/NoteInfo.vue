<template>
<div v-if="noteDataStore.noteInfo.length != 0">
  <section class="author-bar">
    <div class="bar-left">
      <i @click="onClickLeft">返回</i>
      <div class="author">
        <div class="avator">
          <img :src="noteDataStore.noteInfo.user.avatar">
          <i class="author-v" :class="noteDataStore.noteInfo.user.author_type === 1 ? 'author-blue-v' : 'author-yellow-v'" v-if="noteDataStore.noteInfo.user.author_type != 0"></i>
        </div>
        <div class="name">
          <text>{{strLength(noteDataStore.noteInfo.user.username) >= 16 ? noteDataStore.noteInfo.user.username.substring(0,6) + '···' : noteDataStore.noteInfo.user.username}}</text>
          <i class="vip-icon" :class="noteDataStore.noteInfo.user.vip_status === 1 ? 'vip-size' : 'svip-size'" v-if="noteDataStore.noteInfo.user.vip_status != 0"></i>
        </div>
      </div>
    </div>
    <div class="bar-right">
      <button>+关注</button>
      <img :src="share">
    </div>
</section>

<section class="note-info">
  <div class="img-box" v-if="noteDataStore.noteInfo.images != null">
    <img v-for="(img, i) in noteDataStore.noteInfo.images" :src="img" @click="getImg(noteDataStore.noteInfo.images,i)">
  </div>

  <div class="title-content">
    <h3 v-if="noteDataStore.noteInfo.title != ''">{{noteDataStore.noteInfo.title}}</h3>
    <text class="content" v-if="noteDataStore.noteInfo.content != ''">{{noteDataStore.noteInfo.content}}</text>
    <i class="topics" v-for="item in noteDataStore.noteInfo.topics" :key="item.id" v-if="noteDataStore.noteInfo?.topics != null">#{{item.name}}</i>
  </div>

    <!-- 根据有没有视频封面来判断是否有视频 -->
  <div class="video-card" v-if="noteDataStore.noteInfo.article?.cover">
    <div class="poster">
        <router-link  :to="`/video/${noteDataStore.noteInfo.article.id}`">
          <img :src="noteDataStore.noteInfo.article.cover">
          <div class="count">
            <i><van-icon name="eye-o" />{{getVideoCount(noteDataStore.noteInfo.article.count.count_view)}}</i>
            <i><van-icon name="good-job-o" />{{getVideoCount(noteDataStore.noteInfo.article.count.count_like)}}</i>
            <i>{{getVideoDuration(noteDataStore.noteInfo.article.duration)}}</i>
          </div>
        </router-link>
      </div>
      <div class="video-title">
        <h5>{{noteDataStore.noteInfo.article.title}}</h5>
        <text>@{{noteDataStore.noteInfo.article.author.userinfo.username}}</text>
      </div>
  </div>

  <span class="time-ip">
    <i class="time">{{formatTime(noteDataStore.noteInfo.addtime)}}</i> · <i>{{noteDataStore.noteInfo.ip_location}}</i>
  </span>
</section>
<hr>

<!-- 评论 -->
<section class="comment-area">
  <i class="comment-num" v-if="noteDataStore.noteComment.length != 0">共{{noteDataStore.noteComment.length}}条评论</i>
  <div class="comment-list">
    <div v-if="noteDataStore.noteComment.length != 0">
      <div class="comment-box" v-for="item in noteDataStore.noteComment" :key="item.id">
        <i class="like">{{item.likeCount === 0 ? '' : item.likeCount}}<img :src="like"></i>
        <div class="avator">
          <img v-lazy="item.userDetail.avatar_big">
          <i class="author-v" :class="item.userDetail.badge === 1 ? 'author-blue-v' : 'author-yellow-v'" v-if="item.userDetail.badge != 0"></i>
        </div>
        <div class="author-content">
          <div class="author-name">
            <text>{{item.userDetail.nickname}}</text>
            <i class="vip-icon" :class="item.userDetail.vip_type === 1 ? 'vip-size' : 'svip-size'" v-if="item.userDetail.vip_type != 0"></i>
          </div>
          <div class="content">{{item.contentText}}</div>
          <span><i class="time">{{formatTime(item.createTimeUnix / 1000)}}</i> · <i>{{item.ipLocation}}</i></span>

              <!-- 回复 -->             
              <div class="comment-box reply" v-if="item?.parent">
                <div class="avator reply-avator">
                  <img v-lazy="item.parent.userDetail.avatar_big">
                  <i class="author-v" :class="item.parent.userDetail.badge === 1 ? 'author-blue-v' : 'author-yellow-v'" v-if="item.parent.userDetail.badge != 0"></i>
                </div>
                <div class="author-content content-noborder">
                  <div class="author-name">
                    <text>{{item.parent.userDetail.nickname}}</text>
                    <i class="vip-icon" :class="item.parent.userDetail.vip_type === 1 ? 'vip-size' : 'svip-size'" v-if="item.parent.userDetail.vip_type != 0"></i>
                  </div>
                  <div class="content">{{item.parent.contentText}}</div>
                  <span><i class="time">{{formatTime(item.parent.createTimeUnix / 1000)}}</i> · <i>{{item.parent.ipLocation}}</i></span>
                </div>
              </div>
              <!-- 回复end -->
        </div>
      </div>
    </div>
    <i v-else>还没有人评论</i>
  </div>
</section>
</div>
<!-- 图片展示 -->
<van-image-preview></van-image-preview>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useNoteDataStore} from '@/store/noteData'
import useVideoCount from '@/hooks/useVideoCount.ts'
import {useRoute} from 'vue-router'
import { showImagePreview } from 'vant'
import share from '@/assets/icon/share.png'
import like from '@/assets/icon/like.png'
import comment from '@/assets/icon/comment.png'


const route = useRoute()
const noteDataStore = useNoteDataStore()
const {strLength,formatTime} = useVideoCount()

const onClickLeft = () => history.back();
const getImg = (imgs, i) => { 
  showImagePreview({
    images: imgs,
    loop: false,
    startPosition: i
  });
}
noteDataStore.noteInfo = []
noteDataStore.noteComment = []
onMounted(() => {
  noteDataStore.getNoteByIdList(route.params.id)
  noteDataStore.getNoteCommentList(route.params.id)
})
</script>

<style lang="scss" scoped>
.avator {
  position: relative;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  img {
    @extend .avator;
    object-fit: cover;
    border: .5px #ccc solid;
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

.vip-icon {
          margin-left: 5px;
          background-size: cover;
          background-repeat: no-repeat;
          display: inline-block;

        }
        .vip-size {
          width: 14px;
          height: 14px;
          background-image: url($vip-icon);
        }
        .svip-size {
          width: 40px;
          height: 16px;
          background-image: url($sup-vip);
}
.author-bar {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 50px;
  background: #fff;
  box-sizing: border-box;
  border-bottom: .5px solid #ccc;
  z-index: 9999999;

  .bar-left {
    display: flex;
    align-items: center;


    .author {
      margin-left: 10px;
      display: flex;
      align-items: center;

      .name {
        display: flex;
        align-items: center;
        margin-left: 5px;
        font-size: 13px;

      }
    }
  }

  .bar-right {
    button {
      width: 50px;
      height: 25px;
      background: #fff;
      border-radius: 25px;
      color: $color-primary;
      border: $color-primary .5px solid;
    }

    img {
      margin-left: 20px;
      width: 20px;
      height: 20px;
    }
  }
}

.note-info {
  margin-top: 50px;
  padding: 10px;

  .img-box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    img {
      margin: 5px 2px 0;
      max-width: 32%;
      width: 32%;
      height: 100px;
      border-radius: 5px;
      object-fit: cover;
    }
  }

  .title-content {
    margin-top: 10px;

    .topics {
      display: block;
      color: blue;
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

  .time-ip {
    margin-top: 10px;
  }
}

.comment-area {
  padding: 0 10px;
  margin: 10px 0;

  .comment-num {

  }

  .comment-list {
    margin-top: 10px;

    .comment-box {
      display: flex;
      position: relative;
      margin-top: 10px;

      .like {
        position: absolute;
        right: 0;

        img {
          width: 12px;
          height: 12px;
          margin-left: 2px;
        }
      }

      .avator {
        img {
          width: 30px;
          height: 30px;
        }
        .author-v {
          bottom: -5px;
          right: -5px;
        }
      }

      .author-content {
        margin-left: 10px;
        padding-bottom:  10px;
        display: flex;
        flex-direction: column;
        width: 100%;
        border-bottom: .5px solid #ccc;

        .author-name {
          display: flex;
          align-items:center;
        }
      }
    }

    // 回复
    .reply {
      margin-top: 10px;

      .reply-avator {
        width: 20px;
        height: 20px;

        img {
          @extend .reply-avator;
        }

        .author-v {
          right: -3px;
          bottom: -2px;
        }
      }

      .content-noborder {
        border-bottom: none;
      } 
    }
  }
}
</style>