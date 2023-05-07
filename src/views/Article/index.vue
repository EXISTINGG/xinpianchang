<template>
  <section v-if="id != 'null'">
    <van-nav-bar
      :title="articleDataStore.article.title"
      :fixed="true"
      :placeholder="true"
      :safe-area-inset-top="true"
      left-arrow
      z-index="999"
      class="page-title"
      @click-left="onClickLeft"
    />
    <div class="banner-img">
      <img :src="articleDataStore.article.banner" />
    </div>
    <div class="article-box">
      <div class="article-info" v-if="articleDataStore.article.info">
        <span class="label">{{ articleDataStore.article.info.label }}</span>
        <span class="publish-time">{{
          articleDataStore.article.info.time
        }}</span>
        <span class="categroy"
          ><i>{{ articleDataStore.article.info.categroy[0] }}</i
          ><i v-if="articleDataStore.article.info.categroy[1]"> - </i
          ><i>{{ articleDataStore.article.info.categroy[1] }}</i></span
        >
      </div>
      <h1>{{ articleDataStore.article.title }}</h1>
      <hr class="hr" />
      <div class="article-content">
        <div v-html="articleDataStore.article.content"></div>
      </div>

      <div class="author-box">
        <h2>文章作者</h2>
        <div class="author">
          <div class="avator-name">
            <div class="avator">
              <img
                v-lazy="articleDataStore.article.author.avatar"
                v-if="articleDataStore.article.author?.avatar"
              />
              <span
                class="author-v"
                v-if="articleDataStore.article.author?.isUserV"
              ></span>
            </div>
            <div class="name-about">
              <span v-if="articleDataStore.article.author?.name">{{
                articleDataStore.article.author.name
              }}</span>
              <text v-if="articleDataStore.article.author?.name">{{
                articleDataStore.article.author.about || 'TA还没有添加相关描述'
              }}</text>
            </div>
          </div>
          <div class="btn">
            <button>+关注</button>
          </div>
        </div>
      </div>

      <div class="comment-box" v-if="articleDataStore.articleComments.length != 0">
        <h2>全部评论</h2>
        <section v-for="item in articleDataStore.articleComments">
          <div class="comment">
            <div class="comment-left">
              <div class="avator" @click="goUserInfo(item.userid)">
                <img v-lazy="item.userInfo.avatar" />
                <span
                  class="author-v"
                  :class="
                    item.userInfo.author_type === 1
                      ? 'author-blue-v'
                      : 'author-yellow-v'
                  "
                  v-if="item.userInfo.author_type != 0"
                ></span>
              </div>
            </div>
            <div class="comment-right">
              <div class="name">
                <text @click="goUserInfo(item.userid)">{{ item.userInfo.username }}</text>
                <span
                  class="vip-icon"
                  :class="
                    item.userInfo.vip_status === 1 ? 'vip-size' : 'svip-size'
                  "
                  v-if="item.userInfo.vip_status != 0"
                ></span>
              </div>
              <span class="comment-content">{{ item.content }}</span>
              <div class="time-ip-like">
                <div class="time-ip">
                  <span>{{ formatTime(item.addtime) }}</span>
                  <span v-if="item.ip_location != ''">{{
                    item.ip_location
                  }}</span>
                </div>
                <i class="like"
                  >{{ item.userInfo.count.count_liked }}<img :src="like"
                /></i>
              </div>
            </div>
          </div>
          <hr />
        </section>
      </div>

      <div class="addComment">
        <h2>参与评论</h2>
        <div class="input"><input type="text" placeholder="你有什么想说的呢?" v-model="addComment"></div>
        <button v-show="showBtn" @click="clearContent">发表</button>
      </div>

      <div class="hotArticle-box" v-if="articleDataStore.article.relations?.length != 0">
        <h2>热门文章</h2>
        <div class="hotArticle-list">
          <router-link class="hotArticle-item" v-for="item in articleDataStore.article.relations"  :to="'/article/' + /[a-zA-Z0-9]*\?/.exec(item.link)">
            <img v-lazy="item.thumb">
            <section class="title-name">
              <h6>{{item.title}}</h6>
              <div class="name">
                <text>{{item.author}}</text>
                <i class="vip-icon" :class="item.isVip ? 'vip-size': ''" v-if="item.isVip"></i>
              </div>
            </section>
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <section v-else><EmptyPage /></section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useArticleDataStore } from '@/store/articleData.ts'
import useVideoCount from '@/hooks/useVideoCount.ts'
import like from '@/assets/icon/like.png'
import EmptyPage from '../EmptyPage.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const articleDataStore = useArticleDataStore()
const { getVideoDuration, getVideoCount, strLength, formatTime } = useVideoCount()

const addComment = ref('') 
const showBtn = ref(false)

const onClickLeft = () => history.back()
const clearContent = () => addComment.value = ''
const goUserInfo = (id: string) => router.push(`/userinfo/${id}`)


articleDataStore.article = []
articleDataStore.articleComments = []

onMounted(() => {
  articleDataStore.getArticleList(route.params.id)
  articleDataStore.getArticleCommentsList(route.params.id)
})

watch(addComment, () => {
  if(addComment.value != '') {
    showBtn.value = true
  } else {
    showBtn.value = false
  }
})
</script>

<style lang="scss" scoped>
// 修改标题颜色
.page-title {
  --van-nav-bar-icon-color: #000;
}

.banner-img {
  width: 100%;
  height: 200px;

  img {
    @extend .banner-img;
    object-fit: cover;
  }
}

.article-box {
  position: relative;
  padding: 10px;
  z-index: 1;
  .article-info {
    display: flex;
    padding: 10px;
    color: #999999;

    span {
      margin-right: 15px;
    }

    .label {
      display: flex;
      align-items: center;
      padding: 1px 5px;
      background: #fdedeb;
      color: $color-primary;
    }
  }

  .hr {
    margin: 15px 0;
  }

  .article-content {
    width: 100%;

    :deep(img) {
      max-width: 100%;
      object-fit: cover;
    }
  }

  .author-box {
    margin: 30px 0;
    .author {
      margin-top: 10px;
      display: flex;
      justify-items: space-between;
      align-items: center;

      .avator-name {
        display: flex;
        flex: 1;
        .avator {
          position: relative;
          width: 35px;
          height: 35px;
          border-radius: 50%;

          img {
            @extend .avator;
            border: 0.5px solid #ccc;
            object-fit: cover;
          }

          .author-v {
            position: absolute;
            bottom: 5px;
            right: -8px;
            display: inline-block;
            background-size: cover;
            background-repeat: no-repeat;
            width: 12px;
            height: 12px;
            background-image: url($author-blue-v);
          }
        }

        .name-about {
          margin-left: 10px;
          display: flex;
          flex-direction: column;

          span {
            color: #333333;
            font-size: 13px;
          }

          text {
            color: #999999;
          }
        }
      }

      .btn {
        button {
          background: #e74b3b;
          border: none;
          color: #fff;
          padding: 5px;
        }
      }
    }
  }

  .comment-box {
    .comment {
      position: relative;
      margin: 10px 0;
      display: flex;

      padding: 10px 0;

      .comment-left {
        .avator {
          position: relative;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 0.5px solid #ccc;

          img {
            @extend .avator;
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
      }

      .comment-right {
        margin-left: 10px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .name {
          flex: 1;
          display: flex;
          align-items: center;
          text {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            border-bottom: 0.5px solid #ccc;
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

        .comment-content {
          margin: 20px 0 10px;
          word-break:break-all;
        }

        .time-ip-like {
          display: flex;
          justify-content: space-between;
          color: #999999;

          .time-ip {
            flex: 1;
            span {
              margin-right: 5px;
            }
          }

          .like {
            position: absolute;
            right: 0;
            img {
              margin-left: 2px;
              width: 10px;
              height: 10px;
            }
          }
        }
      }
    }
  }

  .addComment {
    margin: 20px 0;

    h2 {
      // margin-bottom: 10px;
    }

    .input {
      display: flex;
      margin-top: 10px;
      width: 100%;
      height: 30px;
      border: .5px solid #ccc;

      input {
        margin-left: 10px;
        border: none;
      }
    }

    button {
      box-sizing: border-box;
      padding: 5px 10px;
      margin-top: 5px;
      float: right;
      border: none;
      background: $color-primary;
      color: #fff;
      font-size: 14px;
    }
  }

  .hotArticle-box {
    margin: 20px 0;

    h2 {
      margin-bottom: 20px;
    }

    .hotArticle-list {
      display: flex;
      flex-direction: column;

      .hotArticle-item {
        display: flex;
        margin: 5px 0;

        img {
          width: 100px;
          height: 100%;
          object-fit: cover;
        }

        .title-name {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin:5px 0 5px 5px;
          

          h6 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1; /* 行数 */
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .name {
            display: flex;
            align-items: center;

            .vip-icon {
            margin-left: 5px;
            background-size: cover;
            background-repeat: no-repeat;
            display: inline-block;
          }
          .vip-size {
            width: 12px;
            height: 12px;
            background-image: url($vip-icon);
          }
          .svip-size {
            width: 35px;
            height: 14px;
            background-image: url($sup-vip);
          }
          }
        }
      }
    }
  }
}
</style>
