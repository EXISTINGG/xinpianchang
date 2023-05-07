<template>
  <div class="comment-list" v-if="videoArticleStore.commentsList.length != 0">
    <van-pull-refresh v-model="videoArticleStore.refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="videoArticleStore.loading"
        :finished="videoArticleStore.finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <!-- 评论 -->
      <div class="comment-box" v-for="item in videoArticleStore.commentsList" :key="item.id">
        <div class="comment-left">
          <div class="avator" @click="goUserInfo(item.userInfo.id)">
            <img :src="item.userInfo.avatar">
            <span class="author-v" :class="item.userInfo.author_type === 1 ? 'author-blue-v' : 'author-yellow-v'" v-if="item.userInfo.author_type != 0"></span>
          </div>
        </div>
        <div class="comment-right">
            <div class="name-more">
              <div class="name-box">
                <text class="name" @click="goUserInfo(item.userInfo.id)">{{item.userInfo.username}}</text>
                <span class="vip-img" :class="item.userInfo.vip_status === 1 ? 'vip-size' : 'svip-size'" v-if="item.userInfo.vip_status != 0"></span>
              </div>
              <span class="more">:</span>
            </div>
            <div class="comment-item"><span class="reply" v-if="item?.referer">回复{{item.referer.userInfo.username}}: </span><span class="content">{{item.content}}</span></div>
            <div class="time-tool">
              <span class="tiem-ip">{{formatTime(item.addtime)}} <span v-if="item.ip_location != ''">·</span> {{item.ip_location}}</span>
              <div class="tool">
                <span class="comment-icon"><img :src="commentIcon" /></span>
                <span class="like-icon"><img :src="likeIcon" />&nbsp;{{item.count_approve}}</span>
              </div>
            </div>
          </div>
      </div>
      </van-list>
    </van-pull-refresh>
  </div>
  <div v-else>
    <van-empty description="还没有人评论" />
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {useVideoArticleStore} from '@/store/videoArticle.ts'
import useVideoCount from '@/hooks/useVideoCount.ts'
import {useRoute,useRouter} from 'vue-router'
import comment from '@/assets/icon/comment.png'
import like from '@/assets/icon/like.png'

const videoArticleStore = useVideoArticleStore()
const {strLength,formatTime} = useVideoCount()
const commentIcon = comment
const likeIcon = like
const route = useRoute()
const router = useRouter()
const id = ref(route.params.id)

const onLoad = () => videoArticleStore.getMoreList(false)

const onRefresh = () => videoArticleStore.getMoreList(true)

const goUserInfo = (id: string) => router.push(`/userinfo/${id}`)


videoArticleStore.commentsList = []

onMounted(() => {
  videoArticleStore.getCommentsList(id.value)
})
</script>

<style lang="scss" scoped>
.comment-list {
  margin-top: 10px;

  .comment-box {
    display: flex;
    padding: 10px;
    border-bottom: .5px solid #ccc;

    .comment-left {

      .avator {
        position: relative;
        width: 30px;
        height: 30px;

        img {
          @extend .avator;
          border-radius: 50%;
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
    }

    .comment-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;


      .name-more {
        display: flex;
        justify-content: space-between;

        .name-box {
          display: flex;
          align-items: center;
          font-size: 13px;

          .vip-img {
            margin-left: 3px;
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
      }

      .comment-item {
          margin: 5px 0;
          font-size: 14px;

          .reply {
            color: #a1a1a1;
          }

          .content {
            word-break:break-all;
          }
        }

        
      .time-tool {
        display: flex;
        justify-content: space-between;
        
        .tiem-ip {
            color: #a1a1a1;
          }

       .tool {
        display: flex;
        align-items: center;

        .like-icon {
          margin-left: 10px;
        }
        img {
          width: 13px;
          height: 13px;
        }
      }
      }

     
    }
  }
}
</style>
