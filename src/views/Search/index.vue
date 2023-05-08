<template>
<SearchBox />
<!-- <section class="search-box">
  <div class="cancel" @click="onClickLeft">
    返回
  </div>
  <div class="search">
    <img :src="searchIconPng">
    <input v-model="data.text" autofocus placeholder="请输入作品名、创作人"/>
    <i class="clear" v-show="data.showClear" @click="clearInput">清空</i>
  </div>
  <div class="cancel go-search" @click="goSearch">
    搜索
  </div>
</section> -->

<section class="search-list">
<!-- 历史搜索 -->
  <div class="text-box"  v-if="searchDataStore.historyKes.length != 0">
    <div class="title-box">
      <i class="title">历史搜索</i>
      <i class="clear-text" @click="removeHistory">清空历史</i>
    </div>
    <div class="text-item-box">
      <i class="text" v-for="item in searchDataStore.historyKes" :key="item" @click="goSearchByKe(item)">{{item}}</i>
    </div>
  </div>

<!-- 热门搜索 -->
  <div class="text-box"  v-if="searchDataStore.searchKws.length != 0">
    <div class="title-box">
      <i class="title">热门搜索</i>
    </div>
    <div class="text-item-box">
      <i class="text" v-for="item in searchDataStore.searchKws" :key="item.id" @click="goSearchByKe(item.name)">{{item.name}}</i>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">
import {reactive,watchEffect, onMounted} from 'vue'
import {useSearchDataStore} from '@/store/searchData'
import {useRouter,useRoute} from 'vue-router'
import SearchBox from './components/SearchBox.vue'
import searchIconPng from '@/assets/icon/search.png'

const searchDataStore = useSearchDataStore()
const router = useRouter()
const route = useRoute()

const removeHistory = () => {
  searchDataStore.removeHistoryKes()
  searchDataStore.historyKes = []
}
console.log(route.params);


const goSearchByKe = (name: string) => {
  // searchDataStore.getresultByKwList(name)

  searchDataStore.setHistoryKes(name)

  router.push(`/searchinfo/${name}`)
}

onMounted(() => {
  searchDataStore.getHistoryKes()

  searchDataStore.getSearchKwsList()

// 视频页的tag
// searchDataStore.setHistoryKes(route.params.kw)

})
</script>

<style lang="scss" scoped>
.search-box {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  padding: 10px;
  background: #fff;
  border-bottom: .5px solid #ccc;
  width: 100%;
  height: 50px;
  box-sizing: border-box;

  .search {
    flex: 1;
    display: flex;
    background: #f0f0f0;
    padding: 5px 15px;

    img {
      width: 15px;
      height: 15px;
    }

    input {
      flex: 1;
      margin-left: 5px;
      border: none;
      background: #f0f0f0;
    }

    .clear {
      margin-left: 10px;
    }
  } 

  .cancel {
    padding: 0 10px;
  }
}

.search-list {
  margin-top: 50px;
  padding: 15px;

  .text-box {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;

    .title-box {
      display: flex;
      justify-content: space-between;
    }

    .text-item-box {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;

      .text {
        display: flex;
        padding: 5px 10px;
        margin:0 10px 10px 0;
        background: #f7f7f7;
      }
    }
  }
}
</style>