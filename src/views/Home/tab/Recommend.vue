<template>
  <!-- Recommend.vue -->
  <div class="banner">
    <Banner />
  </div>
  <div class="video-list">
    <div :class="item.type === 'uiMiddleCard' ? 'middlecard-width' : 'bigcard-width'"  v-for="item in videoDataStore.videoData.commendVideo" :key="item.children[0].model.resource.id">
      <div class="middlecard">
        <MiddleVideoCard :video="item.children[0].model" v-if="item.type === 'uiMiddleCard'"/>
      </div>
      <div>
        <BigVideoCard :video="item.children[0].model" v-if="item.type === 'uiBigCardTop'"/>
      </div>
      <!-- 推荐关注 -->
      <div class="collect" v-if="item.type === 'uiCollectionSlideOne'">
        <div class="title">
          <h2>推荐创作人</h2>
          <span>查看更多 ></span>
        </div>
        <CollectionSlide :collection="item.children"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useVideoDataStore } from '@/store/videoData.ts'
import BigVideoCard from '@/components/BigVideoCard.vue'
import Banner from '@/components/Banner.vue'
import MiddleVideoCard from '@/components/MiddleVideoCard.vue'
import CollectionSlide from '../components/CollectionSlide.vue'

const videoDataStore = useVideoDataStore()

onMounted(() => {
  videoDataStore.getCommendList()
})
</script>

<style lang="scss" scoped>
.video-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .middlecard-width {
    width: 49%;

    .middlecard {
      width: 100%;
    }
  } 

  .bigcard-width {
    width: 100%;
  }
  
  .collect {
      margin: 10px 0;

      .title {
        display: flex;
        align-items: center;
              
        span {
          color: #bfbfbf;
          position: absolute;
          right: 0;
        }
      }
  }
}

</style>
