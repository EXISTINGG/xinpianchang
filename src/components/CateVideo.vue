<template>
  <!-- 标题 -->
  <van-nav-bar
    :title="title"
    left-arrow
    :fixed="true"
    :placeholder="true"
    :animated="true"
    :safe-area-inset-top="true"	
    @click-left="onClickLeft"
    z-index="999"
    class="page-title"
  />
  <div class="cate-box" :class="title == '全球案例' ? 'vmovier-cate-box-background' : ''">
    <!-- 标签栏 (全球案例页面用不到tag,且是大视频卡片)-->
    <van-tabs v-model:active="tagActive" :sticky="true" offset-top="1.33333rem" :border="true" title-active-color="#e74b3b"  title-inactive-color="#b2b2b2" shrink class="tabs" v-if="title != '全球案例' && title != '周榜单'">
      <van-tab v-for="(item, i) in videoDataStore.categories" :title="item.title" :key="item.value" class="tab-tag">
        <van-pull-refresh v-model="videoDataStore.refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="videoDataStore.loading"
            :finished="videoDataStore.finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 组件 v-if减少无用的渲染-->
            <div class="video-card" v-if="i === tagActive">
              <VideoCard v-for="items in videoDataStore.videoData.cateVideo" :key="items.id" :video="items"/>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <!-- 右侧更多 -->
      <template #nav-right v-if="videoDataStore.categories.length != 0">
        <!-- 占位标签 -->
        <i class="placeholder"></i>
        <div class="right-icon" @click="showPopup">
                      <!-- size="20px" -->
          <van-icon name="apps-o" size="0.53333rem"/>
        </div>
      </template>
    </van-tabs>

    <!-- 顶部弹出 (全球案例页面用不到tag)-->
    <van-popup v-model:show="showTop" closeable  position="top" :style="{ height: '50%' }" v-if="title != '全球案例' && title != '周榜单' && videoDataStore.categories.length != 0">
      <div class="tag-box">
        <div class="box-top">
          <span class="text">筛选</span>
          <div class="divider"></div>
        </div>
        <div class="tag-list">
          <div class="tag-item">
            <!-- tag -->
            <div class="tag" :class="tagActive === i ? 'tab-active' : ''" v-for="(item, i) in videoDataStore.categories" :key="item.value" @click="changeTag(i)">{{item.title}}</div>
          </div>
          <div class="tag-right"></div>
        </div>
      </div>
    </van-popup>
    
    <div class="vmovier-box" v-if="title == '全球案例'">
      <van-pull-refresh v-model="videoDataStore.refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="videoDataStore.loading"
            :finished="videoDataStore.finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 组件-->
            <div class="vmovier-videocard">
              <BigVideoCard v-for="item in videoDataStore.videoData.vmovierVideo" :key="item.children[0].model.resource.id" :video="item.children[0].model" />
            </div>            
          </van-list>
        </van-pull-refresh>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,watch, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import { useVideoDataStore } from '@/store/videoData.ts'
import VideoCard from '@/components/VideoCard.vue'
// 此组件仅在全球案例页面使用
import BigVideoCard from '@/components/BigVideoCard.vue'

const videoDataStore = useVideoDataStore()
// 路由
const router = useRouter()

const showTop = ref(false);
const tagActive = ref(0)
// 当前页面标题
const title = ref(router.currentRoute.value.params.title)
// discover用到id
const id = ref(router.currentRoute.value.params.id)

// 返回上一页
const onClickLeft = () => history.back()
// 展示弹出层
const showPopup = () => showTop.value = true

const onRefresh = () => {
  switch (title.value) {
    case '周榜单':
      break;
    case '分类热门':
      videoDataStore.getCateMoreList(true,title.value)
      break;
    case '分类精选':
      videoDataStore.getCateMoreList(true,title.value)
      break;
    case '全球案例':
      videoDataStore.getVmovierMoreList(true)
      break;
    default:
      // 其他:discover页面
      videoDataStore.getCateMoreList(true)
      break;
  }
}

const onLoad = () => {
  console.log('onLoad');
  
  switch (title.value) {
    case '周榜单':
      break;
    case '分类热门':
      videoDataStore.getCateMoreList(false, title.value)
      break;
    case '分类精选':
      videoDataStore.getCateMoreList(false, title.value)
      break;
    case '全球案例':
      videoDataStore.getVmovierMoreList(false)
      break;
    default:
      // 其他:discover页面
      videoDataStore.getCateMoreList(false)
      break;
  }
}

// 点击弹出层的tag,改变当前tag，并关闭弹出层
const changeTag = (i: number) =>  {
  tagActive.value = i
  showTop.value = false
}
const showPageData = () => {
  // 根据不同的页面展示不同的数据
  switch(title.value) {
    case '周榜单':
      break;
    case '分类热门':
      videoDataStore.getCateHotList()
      break;
    case '分类精选':
      videoDataStore.getCateSelectionList()
      break;
    case '全球案例':
      videoDataStore.getVmovierList()
      break;
    case '全部':
      videoDataStore.getCateArticles(id.value,true)
      break;
    default:
      // 其他:discover页面(根据id)
      videoDataStore.getCateArticles(id.value)
      break;
  }
}

onMounted(() => {
  // 根据不同的页面展示不同的数据
  showPageData()
})

watch(tagActive, (newVal) => {
// 筛选新tabActive对应的
  // 如果是'全部',则重新请求
  if (tagActive.value === 0) {
    showPageData()
  }
  // 对应的title的id(value)
  let currentTagId = videoDataStore.categories.filter((item, i) => i === newVal).map(item => item.value)[0]
  console.log('currentTagId: ',currentTagId);
  // 根据id请求数据
  switch(title.value) {
    case '全球案例' || '周榜单':
      break;
    case '分类热门':
      videoDataStore.getCateListByIdList(currentTagId)
      break;
    case '分类精选':
      videoDataStore.getCateSelectionByIdList(currentTagId)
      break;
    case '全部':
      videoDataStore.getCateArticles(currentTagId,true)
      break;
    default:
      videoDataStore.getCateArticles(currentTagId)
      break;
  }
  videoDataStore.finished = false
  videoDataStore.refreshing = false
  videoDataStore.loading = false
})
</script>

<style lang="scss" scoped>
// 修改标题颜色
.page-title {
  --van-nav-bar-icon-color: #000;
}
// 修改标题盒子高度
:deep(.van-nav-bar__content){
  height: 50px;
}
// 修改tab左侧padding
:deep(.van-tabs__nav--line) {
  padding-left: 0;
}
// 修改tab选中状态的字体粗细
:deep(.van-tab--active) {
    font-weight: 400;
  }
// 修改tab的背景颜色和外边距
:deep(.van-tab){
  background: #f7f7f7;
  margin: 5px;
  height: 30px;
  border-radius: 5px;
}
// 修改弹出层顶部距离
:deep(.van-popup--top) {
  top: 50px;
}
// 修改遮罩层顶部距离
:deep(.van-overlay) {
  top: 50px;
}
.vmovier-cate-box-background {
  background: $color-background;
}
.cate-box {
  padding: 0 10px;

  .tabs {
    --van-tabs-bottom-bar-color: transparent; // 取消tab下划线
    
    .tab-tag {
      // margin: 5px;
    }


    .placeholder {
      flex-shrink: 0;
      width: 25px;
    }

    .right-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
      position: fixed;
      right: 0;
      width: 40px;
      height: 40px;
      background: #fff;
    }
  }


  .tag-box {
    // position: relative;
    padding: 10px;

    .box-top {
      // position: absolute;
      // top: 15px;
      margin-top: 7px;
      font-size: 14px;
      .text {
      }

      .divider {
        margin-top: 12px;
        border: .5px #ccc solid;
        width: 100%;
      }
    }  

    .tag-list {
      display: flex;
      padding: 30px 0;
      // height: 100%;

      .tag-item {
        display: flex;
        flex-wrap: wrap;
        flex: 2;
        
        .tag {
          padding: 5px 10px;
          background: #f7f7f7;
          margin: 0 15px 10px 0;
          border-radius: 5px;
        }

        .tab-active {
          color: $color-primary;
        }
      }

      .tag-right {
        flex: .3;
        height: 100%;
      }

    }

    
  }

  .video-card {
    margin-top: 10px;
  }

  .vmovier-box {
    .vmovier-videocard {
      margin-top: 10px;
    }
  }
}
</style>
