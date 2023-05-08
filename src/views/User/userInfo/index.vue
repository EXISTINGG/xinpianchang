<template>
<!-- userinfo/id:{{route.params.id}} -->
<div class="user-box" v-if="userStore.user.length != 0">
  <i class="goBack" :class="data.showNavBar ? 'darkColor' : 'whiteColor'" @click="onClickLeft">返回</i>
  <nav class="nav-bar" ref="navRef" :class="data.showNavBar ? 'flex' : 'none'" :style="{backgroundColor: `rgba(255,255,255,${data.bgOpacity})`}">
    <h3 class="user-name">{{userStore.user.username}}</h3>
  </nav>
  <!-- 作者信息 -->
  <div class="user-info-box">
    <img class="user-bg" :src="userStore.user.app_background || defaultBg">
    <div class="info-box">
      <div class="author-about">
        <div class="avator">
          <img :src="userStore.user.avatar">
          <i class="author-v" :class="userStore.user.author_type === 1 ? 'author-blue-v' : 'author-yellow-v'" v-if="userStore.user.author_type != 0"></i>
        </div>
        <div class="name-vip">
          <h3>{{userStore.user.username}}</h3>
          <i class="vip-icon" :class="userStore.user.vip_status === 1 ? 'vip-size' : 'svip-size'" v-if="userStore.user.vip_status != 0"></i>
        </div>
        <div class="occupation-ip">
          <i class="occupation">{{userStore.user.occupation}}</i> · <i class="ip">{{userStore.user.ip_location}}</i>
        </div>
        <div class="verify-description">{{userStore.user.verify_description}}</div>
      </div>
      <div class="count-attention">
        <div class="count-box" v-if="userStore.user?.count">
          <span>
            <i>{{getVideoCount(userStore.user.count.count_popularity)}}</i>
            <text>人气</text>
          </span>
          <span @click="goUserList('粉丝')">
            <i>{{getVideoCount(userStore.user.count.count_follower)}}</i>
            <text>粉丝</text>
          </span>
          <span>
            <i @click="goUserList('关注')">{{getVideoCount(userStore.user.count.count_followee)}}</i>
            <text>关注</text>
          </span>
        </div>
        <div class="attention-box">
          <button class="collaborate-btn">联系合作</button>
          <button class="attention-btn">关注</button>
        </div>
      </div>
    </div>
  </div>

  <!-- tab -->
  <div class="user-articles-box">
    <van-tabs v-model:active="data.active"  class="tabs"  color="#e74b3b" title-active-color="#e74b3b"	 animated swipeable sticky :offset-top="data.navOffsetHeight" @click-tab="changeTab">
      <van-tab title="作品" class="tab">
        <div  class="menu">
          <van-dropdown-menu active-color="#ee0a24">
            <van-dropdown-item teleport="body" v-model="value" :options="option"  @change="changeVal"/>
          </van-dropdown-menu>
        </div>

        <div class="video-list" v-if="userStore?.userArticle.length != 0">
          <van-list
          v-model:loading="userStore.articel.loading"
          :finished="userStore.articel.finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad">
            <VideoCard v-for="item in userStore.userArticle" :key="item.resource.id" :video="item.resource"/>
          </van-list>
        </div>

        <div class="empty" v-else><van-empty description="还没有发布作品" class="empty"/></div>
        
      </van-tab>
      <van-tab title="收藏夹">
        <div class="empty"><van-empty description="页面为空" class="empty"/></div>
      </van-tab>
      <van-tab title="专辑">
        <div class="video-list-collect" v-if="userStore?.userCollect.length != 0">
          <van-list
          v-model:loading="userStore.collect.loading"
          :finished="userStore.collect.finished"
          finished-text="没有更多了"
          @load="onLoadCollect">
            
            <div class="collect-card" v-for="item in userStore.userCollect" :key="item.id">
              <img :src="item.cover_url">
              <h3>{{item.title}}</h3>
              <div class="collect-count"><i>作品 {{getVideoCount(item.count.count_article)}}</i><i>·</i><i>浏览 {{getVideoCount(item.count.count_viewed)}}</i><i>·</i><i>赞 {{getVideoCount(item.count.count_liked)}}</i></div>
            </div>

          </van-list>
        </div>

        <div class="empty" v-else><van-empty description="还没有创建专辑" class="empty"/></div>
      </van-tab>
      <van-tab title="喜欢">
        <div class="video-list-approved" v-if="userStore?.userApproved.length != 0">
          <van-list
          v-model:loading="userStore.approved.loading"
          :finished="userStore.approved.finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoadApproved">
            <BigVideoCard v-for="item in userStore.userApproved" :key="item.resource.id" :video="item"/>
          </van-list>
        </div>

        <div class="empty" v-else><van-empty description="还没有喜欢作品" class="empty"/></div>
      </van-tab>
      <van-tab title="资料">
        <div class="user-data" v-if="userStore?.user">
          <h5>基本资料</h5>
          <div class="data-box">
            <li class="tr"><i class="title">性别</i> <text class="info">{{userStore.user?.sex == 0 ? '女' : '男'  || '无'}}</text></li>
            <li class="tr"><i class="title">年龄</i> <text class="info">{{getAge(userStore.user?.birthday) || '无'}}</text></li>
            <li class="tr"><i class="title">所在地区</i> <text class="info">{{userStore.user.location?.province.name || '无'}}</text></li>
            <li class="tr"><i class="title">简介</i> <text class="info">{{userStore.user?.about || '无'}}</text></li>
            <li class="tr"><i class="title">IP归属地</i> <text class="info">{{userStore.user?.ip_location || '无'}}</text></li>
          </div>
        </div>
        <div class="user-data" v-if="userStore.user?.graduation">
          <h5>教育背景</h5>
          <div class="data-box">
            <li class="tr"><i class="title">学校</i> <text class="info">{{userStore.user.graduation}}</text></li>
          </div>
        </div>
        <div class="user-data" v-if="userStore?.user">
          <h5>认证信息</h5>
          <div class="data-box">
            <li class="tr"><i class="title">认证身份</i> <text class="info">{{userStore.user?.occupation || '无'}}</text></li>
            <li class="tr"><i class="title">入行年份</i> <text class="info">{{userStore.user?.entry_year || '无'}}</text></li>
            <li class="tr"><i class="title">认证描述</i> <text class="info">{{userStore.user?.verify_description || '无'}}</text></li>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
  
</div>

<div v-if="userStore.user.length == 0 && !userStore.showSkeleton">
  <van-empty description="加载失败或该类型用户可能无主页">
    <van-button round type="primary" class="bottom-button" @click="onClickLeft">返回</van-button>
  </van-empty>
</div>

<div v-if="userStore.showSkeleton">
  <van-skeleton title avatar :row="3" v-for="item in 6" :key="item"/>
</div>
</template>

<script setup lang='ts'>
import {ref,reactive,onMounted,onBeforeUnmount,watch,watchEffect } from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {useUserStore} from '@/store/userData'
import useVideoCount from '@/hooks/useVideoCount'
import useGetAge from '@/hooks/useGetAge'
import defaultBg from '@/assets/images/default_bg.jpg'
import VideoCard from '@/components/VideoCard.vue'
import BigVideoCard from '@/components/BigVideoCard.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const {getVideoDuration, getVideoCount, strLength} = useVideoCount()
const {getAge} = useGetAge()

const data = reactive({
  active: 0,
  navOffsetHeight: 0,
  scrollTop: 0, // 被卷去的距离
  showNavBar: false,
  bgOpacity: 0, // nav背景透明度渐变
})
const navRef = ref(null)

const value = ref(0);
const option = [
  { text: '默认排序', value: 0 },
  { text: '热门排序', value: 1 },
  { text: '最新上传', value: 2 },
]

const changeVal = (value) => {
  // 选中的值,例如: 0(默认排序)
  // console.log(value);
}

const onClickLeft = () => history.back();

const goUserList = (title) => router.push(`/userlist/${route.params.id}/${title}`)

const getScrollTop = () => {
  data.scrollTop = window.pageYOffset
  if (data.scrollTop > 50) {
    data.showNavBar = true
    
    // 根据被卷去的高度调整背景透明度
    data.bgOpacity = (data.scrollTop -100) / 100
  } else {
    data.showNavBar = false
  }  
}

const changeTab = (val) => {
  let {title} = val
  switch (title) {
    case '专辑':
      userStore.userCollect = []
      userStore.getUserCollectionsList(route.params.id)
      break;
    case '喜欢':
      userStore.userApproved = []
      userStore.getUseruserApprovedList(route.params.id)
      break; 
    default:
      break;
  }
}

const onLoad = () => userStore.getMoreArticlesList()

const onLoadApproved = () => userStore.getMoreApprovedList()

const onLoadCollect = () => userStore.getMoreCollectList()

userStore.user = []
userStore.userArticle = []
onMounted(() => {
window.addEventListener('scroll',getScrollTop)

userStore.getUserList(route.params.id)

userStore.getUserArticlesList(route.params.id)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll',getScrollTop)
})


watchEffect(() => {
   // 如果展示了nav,获取高度，
   if (data.showNavBar) {
    setTimeout(() => {
      data.navOffsetHeight = navRef.value.offsetHeight
    }, 100)
   }

})
</script>

<style lang="scss" scoped>
$left: 20px;
.user-box {
  height: 100vh;
  
  .darkColor {
    color: #000;
  }
  .whiteColor {
    color: #fff;
  }
  .goBack {
    position: fixed;
    left: $left;
    top: 10px;
    // color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    z-index: 99999999999999999;
  }
  .flex {
    display: flex;
  }
  .none {
    display: none;
  }
  .nav-bar {
    padding: 10px;
    position: fixed;
    top: 0;
    // display: flex;
    // display: none;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    // background: rgba(255,255,255,1);
    // background: pink;
    z-index: 999;
    

    .user-name {
     

    }
  }

  .user-info-box {
    position: relative;
    width: 100%;
    // height: 40%;
    height: 250px;
    // margin: 10px;
    // box-sizing: border-box;

    .user-bg {
      position: absolute;
      left: 0;
      width: 100%;
      height: 250px;
      object-fit: cover;
      z-index: -1;
    }

    .info-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $left;
      box-sizing: border-box;
      width: 100%;
      height: 100%;

        .author-about {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          color: #fff;

          .avator {
            position: relative;
            width: 40px;
            height: 40px;

            img {
              @extend .avator;
              border-radius: 50%;
              border: .5px solid #ccc;
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

          .name-vip {
            display: flex;
            align-items: center;
            margin-top: 10px;

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
              width: 44px;
              height: 18px;
              background-image: url($sup-vip);
            }
          }

          .occupation-ip {
            margin: 5px 0;
          }

          .verify-description {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
           
        }

        .count-attention {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .count-box {
            display: flex;
            color: #fff;
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);

            span {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-right: 30px;
              font-weight: 600;

              text {
                color: #efefef;
              }
            }
          }

          .attention-box {
            margin-left: 10px;
            button {
              border: none;
              width: 60px;
              height: 30px;
              border-radius: 25px;
            }

            .collaborate-btn {
              background: #fff;
            }

            .attention-btn {
              margin-left: 15px;
              color: #fff;
              background: $color-primary;
            }
          }
        }

        
      
    }
  }

  .user-articles-box {
    // height: 60%;

    .tabs {
      background:$color-background;
      // position: relative;

      .tab {
        // position: relative;
      }
    }

    .menu {
      --van-dropdown-menu-height: 30px;
      // position: fixed;
      // top: 100px;
    }

    .video-list {
      margin-top: 10px;
      padding: $left;
      background: #fff;
    }

    .video-list-approved {
      padding: 10px;
      background:$color-background; 
    }

    .empty {
      width: 100%;
      height: 100%;
      display: flex;
      background: #fff;
      justify-content: center;
    }

    .user-data {
      background: #fff;
      padding: 20px;

      h5 {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: #efefef solid .5px;
      }

      .data-box {
        margin-top: 20px;
        display: flex;
        flex-direction: column;

        .tr {
          margin: 5px 0;
          display: flex;
          justify-content: space-between;

          .title {
            display: flex;
            width: 50px;
            flex: 2.5;
          }

          .info {
            display:flex;
            flex: 7.5;
          }
        }
      }
    }

    .video-list-collect {
      padding: 10px 0;
      background:$color-background; 

      .collect-card {
        margin-bottom:10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        background: #fff;

        img {
          object-fit: cover;
          width: 100%;
          height: 150px;
          border-radius: 5px;
        }

        h3 {
          margin: 5px 0;
        }

        .collect-count {
          color: #a1a1a1;

          i {
            margin-right: 10px;
          }
        }
      }
    }


  }
}
 .bottom-button {
    width: 160px;
    height: 40px;
    background: $color-primary;
    border: none;
  }
</style>