<template>
  <van-tabbar v-model="tabbarActive" route inactive-color="#666" active-color="#000">
    <van-tabbar-item to="/home">
      <span>首页</span>
      <template #icon="props">
        <img :src="props.active ? homeActiveIcon : homeInactiveIcon" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/notes">
      <span>手记</span>
      <template #icon="props">
        <img :src="props.active ? notesActiveIcon : notesInactiveIcon" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/discovery">
      <span>搜索</span>
      <template #icon="props">
        <img :src="props.active ? searchActiveIcon : searchInactiveIcon" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/user">
      <span>我的</span>
      <template #icon="props">
        <img :src="props.active ? myActiveIcon : myInactiveIcon" />
      </template>
    </van-tabbar-item>   
  </van-tabbar>
</template>

<script setup lang="ts">
import {ref} from 'vue'
// 导入tabbar图标
import homeActiveIcon from '@/assets/icon/home-active.png'
import homeInactiveIcon from '@/assets/icon/home-inactive.png'
import notesActiveIcon from '@/assets/icon/notes-active.png'
import notesInactiveIcon from '@/assets/icon/notes-inactive.png'
import searchActiveIcon from '@/assets/icon/search-active.png'
import searchInactiveIcon from '@/assets/icon/search-inactive.png'
import myActiveIcon from '@/assets/icon/my-active.png'
import myInactiveIcon from '@/assets/icon/my-inactive.png'

// 当前的标签(默认0)
const tabbarActive = ref(0)
</script>

<style></style>
