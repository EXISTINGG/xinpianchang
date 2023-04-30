<template>
  <!-- :key="route.fullPath"防止路由相同,参数不同不刷新 -->
  <router-view :key="route.fullPath" v-if="/video\/[0-9]*/.test(route.fullPath)"></router-view>
  <router-view v-else></router-view>

</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
const route = useRoute()
</script>

<style>

</style>
