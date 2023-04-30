<template>
  <div class="item-box" v-if="videoArticleStore.videoArticle.length != 0">
    <div class="intro-box">
      <div class="title">
        <h1>{{videoArticleStore.videoArticle.title}}</h1>
      </div>
      <div class="video-type-time-ip">
        <span class="categories" v-for="(item, i) in videoArticleStore.videoArticle.categories" :key="i">{{item.category_name}}-{{item.sub.category_name}}</span>
        <span class="time">{{formatTime(videoArticleStore.videoArticle.publish_time)}} </span><span class="ip" v-if="videoArticleStore.videoArticle.ip_location != ''">&nbsp;·&nbsp; {{ videoArticleStore.videoArticle.ip_location}}</span>
        <span class="video-view">{{getVideoCount(videoArticleStore.videoArticle.count.count_view)}}次播放</span>
      </div>
      <div class="content">
        <van-text-ellipsis
          rows="4"
          :content="videoArticleStore.videoArticle.content"
          expand-text="展开"
          collapse-text="收起"
        />
      </div>
    </div>
    <div class="tool-bar">
      <div class="like flex">
        <img :src="likeIcon">
        <span>{{videoArticleStore.videoArticle.count.count_like}}</span>
      </div>
      <div class="collect flex">
        <img :src="collectIcon">
        <span>{{videoArticleStore.videoArticle.count.count_collect}}</span>
      </div>
      <div class="share flex">
        <img :src="shareIcon"> 
        <span>{{videoArticleStore.videoArticle.count.count_share}}</span>
      </div>
      <div class="download flex">
        <img :src="downloadIcon"> 
        <span>下载</span>
      </div>
    </div>
    <div class="tags-box">
      <router-link v-for="item in videoArticleStore.videoArticle.tags" :key="item.id" to="/*">
        <span class="tag">{{item.name}}</span>
      </router-link>
    </div>
    <div class="team-box">
      <div class="box-title">
        <h3>创作人</h3>
        <span>申请加入</span>
      </div>
      <div class="team-item">
        <van-swipe class="swipe" :width="260" :loop="false" :show-indicators="false" :duration="500">
          <van-swipe-item class="swipe-item">
            <div class="author-box">
              <div class="left-author">
                <div class="avator-v">
                  <img v-lazy="videoArticleStore.videoArticle.author.userinfo.avatar">
                  <span class="v-icon" :class="videoArticleStore.videoArticle.author.userinfo.author_type === 1 ? 'author-blue-v' : 'author-yellow-v'" v-if="videoArticleStore.videoArticle.author.userinfo.author_type != 0"></span>
                </div>
                <div class="name-role">
                  <div class="name-vip">
                      <text>{{strLength(videoArticleStore.videoArticle.author.userinfo.username) > 8 ? videoArticleStore.videoArticle.author.userinfo.username.substring(0,4) + '···' : videoArticleStore.videoArticle.author.userinfo.username}}</text>
                      <span class="vip-icon" :class="videoArticleStore.videoArticle.author.userinfo.vip_status === 1 ? 'vip-size' : 'svip-size'" v-if="videoArticleStore.videoArticle.author.userinfo.vip_status != 0"></span>
                  </div>
                  <div class="role">{{videoArticleStore.videoArticle.author.role}}</div>
                </div>
              </div>
              <div class="follow">
                <button>关注</button>
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item class="swipe-item" v-for="item in videoArticleStore.videoArticle.team" :key="item.userinfo.id">
            <div class="author-box">
              <div class="left-author">
                <div class="avator-v">
                  <img v-lazy="item.userinfo.avatar">
                  <span class="v-icon" :class="item.userinfo.author_type === 1 ? 'author-blue-v' : 'author-yellow-v'" v-if="item.userinfo.author_type != 0"></span>
                </div>
                <div class="name-role">
                  <div class="name-vip">
                      <text>{{strLength(item.userinfo.username) > 8 ? item.userinfo.username.substring(0,4) + '···' : item.userinfo.username}}</text>
                      <span class="vip-icon" :class="item.userinfo.vip_status === 1 ? 'vip-size' : 'svip-size'" v-if="item.userinfo.vip_status != 0"></span>
                  </div>
                  <div class="role">{{item.role}}</div>
                </div>
              </div>
              <div class="follow">
                <button>关注</button>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="recommend-video">
      <h3>相似视频</h3>
      <VideoCard v-for="item in videoArticleStore.similarVidoe" :key="item.id" :video="item"/>
    </div>
  </div>
</template>

<script setup lang="ts">
// icon
import collect from '@/assets/icon/collect.png'
import like from '@/assets/icon/like.png'
import share from '@/assets/icon/share.png'
import download from '@/assets/icon/download.png'
// icon
const collectIcon = collect
const likeIcon = like
const shareIcon = share
const downloadIcon = download

import {ref,onMounted} from 'vue'
import {useVideoArticleStore} from '@/store/videoArticle.ts'
import {useRouter,useRoute} from 'vue-router'
import useVideoCount from '@/hooks/useVideoCount.ts'
import VideoCard from '@/components/VideoCard.vue'

const videoArticleStore = useVideoArticleStore()
const router = useRouter()
const route = useRoute()
const {getVideoCount, strLength,formatTime} = useVideoCount()

const id = ref(router.currentRoute.value.params.id)
console.log(route.params.id);
console.log(router.currentRoute.value.params.id);

videoArticleStore.videoArticle = []
videoArticleStore.similarVidoe = []
onMounted(() => {
  videoArticleStore.getVideoArticeList(id.value)
  videoArticleStore.getSimilarVidoeList(id.value)
})
</script>

<style lang="scss" scoped>
.item-box {
  margin-top: 10px;

  .intro-box {
    padding: 0 10px;

    .video-type-time-ip {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0;

      .categories,.ip {
        margin-right: 10px;
      }
      .video-view {
        margin-left: 10px;
      }
    }

    .content {
      --van-text-ellipsis-action-color: #e74b3b;
    }
  }

  .tool-bar {
    padding: 0 20px;
    margin: 10px 0; 
    display: flex;
    justify-content: space-between;

    img {
      width: 25px;
      height: 25px;
    }

    .flex {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    span {
      margin-top: 3px;
    }
  }

  .tags-box {
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    border: .5px solid #f0f0f0;
    border-left: none;
    border-right: none;

    .tag {
      display: flex;
      justify-content: center;
      align-items: center;
      margin:5px 10px 5px 0;
      padding: 5px 10px;
      background: #f7f7f7;
    } 
  }

  .team-box {
    padding: 0 10px;
    margin: 15px 0;
    border-bottom: .5px solid #f0f0f0;


    .box-title {
      display: flex;
      justify-content: space-between;

      span {
        color: $color-primary;
      }
    }

    .team-item {
      height: 100%;
      .swipe {
        margin: 10px 0;
        width: 100%;
        height: 70px;

        .swipe-item {
          width: 250px !important;
          height: 90%;
          border-radius: 5px;
          background: #fefefe;
          margin-right: 10px;
          box-shadow: 0 0 2px 2px rgba(0,0,0, .1);

          .author-box {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            box-sizing: border-box;
            height: 100%;

            .left-author {
                display: flex;
                align-items: center;

              .avator-v,img {
                position: relative;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: .5px solid #ccc;
              }
              .v-icon {
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

                .name-role {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  margin-left: 5px;

                  .name-vip {
                    display: flex;
                    align-items: center;

                    text {
                      font-size: 14px;
                    }

                    .vip-icon {
                        margin-left: 3px;
                        display: inline-block;
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

            .follow {
                button {
                  width: 60px;
                  height:25px;
                  line-height: 25px;
                  color: ($color-primary);
                  border-radius: 25px;
                  border: none;
                  background: #fbebed;
                }
              }
          }
        }
      }
      

      
    }
  }

  .recommend-video {
    padding: 0 10px;

    h3 {
      margin-bottom: 10px;
    }
  }
}
</style>
