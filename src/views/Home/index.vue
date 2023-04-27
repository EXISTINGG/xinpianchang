<template>
  <!-- tab -->
  <div class="tabmenu-search">
    <van-tabs
      v-model:active="tabActive"
      color="#e74b3b"
      swipeable
      animated
      sticky
    >
      <van-tab
        class="tabmenu"
        v-for="(item, i) in tabMenuList"
        :key="item.title"
        :title="item.title"
      >
        {{ item.link }}
        <hr />

        <van-pull-refresh v-model="videoDataStore.refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="videoDataStore.loading"
            :finished="videoDataStore.finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 防止生成多个router-view (但会重新生成路由,导致页面不缓存,出现离开页面时执行当前页面函数)-->
            <div v-if="i === tabActive">
              <router-view></router-view>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 右侧搜索 -->
      <template #nav-right>
        <!-- 占位标签 -->
        <i class="placeholder"></i>
        <div class="right-img">
          <img :src="searchIcon" />
          <img :src="settingIcon" />
        </div>
      </template>
    </van-tabs>
  </div>


  <!-- Tabbar -->
  <Tabbar />
</template>

<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getTab, getloadMore } from '@/api/home.ts'
import { useVideoDataStore } from '@/store/videoData.ts'
import Tabbar from '@/components/Tabbar.vue'
import videoList from './components/video-list.vue'

import searchIconPng from '@/assets/icon/search.png'
import settingIconPng from '@/assets/icon/setting.png'

import { showToast } from 'vant'

// tab列表
const tabMenuList = ref([])
let tabMenuLists = [] // 用于筛选的tab数据
const currenTab = ref('')
// tabActive
let tabActive = ref()
// 路由
const router = useRouter()
// 图标
const searchIcon = searchIconPng
const settingIcon = settingIconPng
// 视频store
const videoDataStore = useVideoDataStore()

//请求tab列表
const getTabMenu = async () => {
  const { data: res } = await getTab()
  if (res.status === 0) {
    tabMenuList.value = res.data.tab
    tabMenuLists = res.data.tab
    console.log(res.data.tab);
    
    // tabActive默认为推荐页面
    tabActive.value = res.data.tab.findIndex(
      (item) => item.alias === 'recommend'
    )
  }
}
const onLoad = () => videoDataStore.getMore(false,currenTab.value)

const onRefresh = () => videoDataStore.getMore(true,currenTab.value)

onBeforeMount(() => getTabMenu())

// 侦听tab变化，切换路由(解决滑动时不切换路由的bug)
watch(tabActive, (newVal) => {
  // 筛选新tabActive对应的link(push到对应路由使用)
  let toRouterLink = tabMenuLists.map((item, i) => {
    if (i === newVal) return item.link
  })[newVal]
  // 推荐分类页面请求时的url
  videoDataStore.recommendLink = toRouterLink
  // 筛选新tabActive对应的tab名称(供刷新/加载页面使用)
  currenTab.value = tabMenuLists.map((item, i) => {
    if (i === newVal) return item.alias
  })[newVal]
  videoDataStore.currentTab = currenTab.value
  console.log(videoDataStore.currentTab ,1111);
  
  // 更具当前的tabActive到对应的路由
  switch (newVal) {
    case newVal:
      router.push(toRouterLink)
  }
  // 上一个页面无数据finished为true,切换时,改为false
  videoDataStore.finished = false
  videoDataStore.refreshing = false
  videoDataStore.loading = false
})
</script>

<style lang="scss" scoped>
.tabmenu-search {
  .tabmenu {
    padding: 5px 10px;
    background: $color-background;
  }

  .placeholder {
    flex-shrink: 0;
    width: 50px;
    // height: 50px;
  }

  .right-img {
    z-index: 999;
    position: fixed;
    // top: 10px;
    right: 0;
    width: 70px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #fff;
    // opacity: 0.902;

    img {
      width: 25px;
      height: 25px;
    }
  }
}
// .slide_left-enter-active,
// .slide_left-leave-active,
// .slide_right-enter-active,
// .slide_right-leave-active {
//   transition: all 0.5s;
//   position: absolute !important;
//   background-color: white;
//   width: 100%;
//   height: 100%;
//   /* z-index: 1; */
// }

.slide_left-enter-from,
.slide_right-leave-to {
  opacity: 1;

  transform: translateX(100%);
}

.slide_right-enter-from,
.slide_left-leave-to {
  opacity: 1;

  transform: translateX(-100%);
}

.slide_left-leave-to,
.slide_right-leave-to {
  opacity: 0.3;
}
</style>
