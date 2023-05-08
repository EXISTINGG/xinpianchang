<template>
  <section class="search-box">
    <div class="cancel" @click="onClickLeft">
      返回
    </div>
    <div class="search">
      <img :src="searchIconPng">
      <input v-model="data.text" :autofocus="data.isFocus"  placeholder="请输入作品名、创作人" @keyup.enter="goSearch" @focus="onFocus"/>
      <i class="clear" v-show="data.showClear" @click="clearInput">清空</i>
    </div>
    <div class="cancel go-search" @click="goSearch">
      搜索
    </div>
  </section>
</template>

<script setup lang="ts">
import {reactive,watchEffect,onMounted} from 'vue'
import {useSearchDataStore} from '@/store/searchData'
import {useRouter,useRoute} from 'vue-router'
import searchIconPng from '@/assets/icon/search.png'

const router = useRouter()
const route = useRoute()
const searchDataStore = useSearchDataStore()

const data = reactive({
  text: ''  || route.params.kw, // 搜索文本
  showClear: false,
  isFocus: false
})

if (route.fullPath == '/search') {
  data.isFocus = true
}

const clearInput = () => data.text = ''
const onClickLeft = () => history.back();

const goSearch = () => {  
  if (data.text == '') return

  searchDataStore.setHistoryKes(data.text)

  data.text = ''

  // searchDataStore.getresultByKwList(data.text)

  router.push(`/searchinfo/${data.text}`)
}

const onFocus = () => router.push('/search')

onMounted(() => {

})

watchEffect(() => {
  if(data.text != '') {
    data.showClear = true
  } else {
    data.showClear = false
  }
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
  z-index: 99999999999999999999999999999999999;

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
</style>