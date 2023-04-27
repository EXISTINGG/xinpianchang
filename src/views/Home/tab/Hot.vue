<template>
hot
<Banner />
<!-- 分类选项 -->
<section class="hot-function">
  <div v-for="item in videoDataStore.hotFunction" :key="item.model.title">
      <router-link :to="'/cate/' + item.model.title">
        <div class="function">
          <img :src="item.model.icon" class="icon"/>
          <span class="title">{{item.model.title}}</span>
        </div>
      </router-link>
  </div> 
</section>

<BigVideoCard v-for="item in videoDataStore.videoData.hotVideo" :key="item.children[0].model.resource.id" :video="item.children[0].model"/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useVideoDataStore} from '@/store/videoData.ts'
import Banner from '@/components/Banner.vue'
import BigVideoCard from '@/components/BigVideoCard.vue'

const videoDataStore = useVideoDataStore()

onMounted(() => {
  videoDataStore.getHotList()
})
</script>

<style lang="scss" scoped>
.hot-function {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;

  .function {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      margin-bottom: 5px;
    }
  }
}
</style>