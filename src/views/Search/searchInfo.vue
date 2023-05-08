<template>
  <SearchBox />

<van-tabs v-model:active="data.active" class="tabs" color="#e74b3b" title-active-color="#e74b3b" sticky swipeable :offset-top="1.33333 + 'rem'" @change="changeTabs">
  <van-tab title="作品" class="tab">
    <van-dropdown-menu active-color="#ee0a24">
      <van-dropdown-item v-model="data.value1" :options="data.option1" teleport="body" @change="changeDropdownSort"/>
      <van-dropdown-item v-model="data.value2" :options="data.option2" teleport="body" @change="changeDropdownDownLoad"/>
    </van-dropdown-menu>

    <van-list
    v-model="searchDataStore.article.loading"
    :finished="searchDataStore.article.finished"
    :immediate-check="false"
    finished-text="没有更多了"
    class="card-list"
    @load="onLoadArticle">

    <text class="total">共<i class="num">{{searchDataStore.total}}</i>部新作品</text>

    <VideoCard v-for="item in searchDataStore.articleResult" :key="item.id" :video="item"/>
      
    </van-list>
  </van-tab>
  <van-tab title="创作人">
    <van-list
    v-model="searchDataStore.creator.loading"
    :finished="searchDataStore.creator.finished"
    :immediate-check="false"
    finished-text="没有更多了"
    class="card-list"
    @load="onLoadCreator">

    <UserCard v-for="item in searchDataStore.creatorsResult" :key="item.id" :user="item"/>
      
    </van-list>
  </van-tab>
</van-tabs>

  
</template>

<script setup lang="ts">
import {reactive,onMounted} from 'vue'
import {useSearchDataStore} from '@/store/searchData'
import {useRouter,useRoute} from 'vue-router'
import SearchBox from './components/SearchBox.vue'
import VideoCard from '@/components/VideoCard.vue'
import UserCard from '@/components/UserCard.vue'

const searchDataStore = useSearchDataStore()
const route = useRoute()

const data = reactive({
  active: 0,
  checked: true,
  value1: 'hot',
  option1: [
    { text: '最热门', value: 'hot' },
    { text: '新发布', value: 'addtime'},
    ],
  value2: 0,
  option2: [
    { text: '全部', value: 0 },
    { text: '可下载', value: 1 },
    ],
})

const changeTabs = (e) => {
  // 0:作品 1:创作人
  if (e == 1) {
    searchDataStore.getCreatorsList()
  }
  
}

const onLoadArticle = () => searchDataStore.getMoreArticleList()
const onLoadCreator = () => {
  // 进入创作者页面,onLoadCreator事件优先于changeTabs,
  // 会导致loadMoreUrl为空,误判为加载完成
  // 异步进行onLoadCreator,后于changeTabs
  setTimeout(() => {
    searchDataStore.getMoreCreatorsList()
  }, 100);
}

const changeDropdownSort = (e) => searchDataStore.getresultByKwAndSortList(route.params.kw,e)
const changeDropdownDownLoad = (e) => searchDataStore.getresultByKwAndSortList(route.params.kw,data.value1,e)

searchDataStore.articleResult = []
searchDataStore.articleResult = []

onMounted(() => {
  searchDataStore.getresultByKwList(route.params.kw)
})
</script>

<style lang="scss" scoped>
.tabs {
  margin-top: 50px;

  .card-list {
    margin-top: 20px;
    padding: 0 20px;

    .total {
      margin-bottom: 10px;

      .num {
        color: $color-primary;
      }
    }
  }
}
</style>