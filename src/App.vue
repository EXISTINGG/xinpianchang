<template>
  <!-- :key="route.fullPath"防止路由相同,参数不同不刷新 -->
  <!-- <router-view :key="route.fullPath"></router-view> -->
  <!-- <router-view :key="route.path"></router-view> -->
  <!-- <router-view :key="route.name"></router-view> -->
  <router-view></router-view>
  <!-- <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route.path" />
  </router-view> -->
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
const route = useRoute()
</script>

<style>

</style>
