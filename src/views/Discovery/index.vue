<template>
<section class="search-box">
  <router-link to="/search" class="search-bar"><img :src="searchIconPng"/>请输入作品名、创作人</router-link>
</section>
<div class="discover-box">
  <div class="banner-recommended">
    <van-swipe class="banner" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in discoverDataStore.banners" :key="item.id"><img :src="item.cover"/></van-swipe-item>
    </van-swipe>
    <div class="recommended">
      <div class="recommended-item" v-for="item in discoverDataStore.recommended_position" :key="item.title">
        <img :src="item.icon" /> 
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
  <div class="categories-box">
    <div class="title-more">
      <h3>分类作品库</h3>
      <span><router-link to="/cate/全部/0">查看全部</router-link></span>
    </div>
    <div class="categories-item">
      <router-link v-for="item in discoverDataStore.categories" class="categories" :to="'/cate/' + item.category_name + '/'  + item.id">
        <img :src="item.cover" /> 
        <span>{{item.category_name}}</span>
      </router-link>
    </div>
  </div>
</div>
<Tabbar />
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useDiscoverDataStore} from '@/store/discoverData.ts'
import Tabbar from '@/components/Tabbar.vue'
import searchIconPng from '@/assets/icon/search.png'

const discoverDataStore = useDiscoverDataStore()

onMounted(() => {
  discoverDataStore.getDiscoveryList()
})
</script>

<style lang="scss" socped>
html {
  background: $color-background;
}
.search-box {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  background: #fff9f8;
  height: 60px;
  width: 100%;
  z-index: 999;

  .search-bar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    background: #fff;
    margin: 20px 15px 0;
    border-radius: 5px;
    color: #9ca3af;
    font-size: 13px;
    box-shadow: 0 0 1px 2px rgba(0,0,0, .1);

    img {
      margin: 0 5px 0;
      width: 15px;
      height: 15px;
    }
  }
}
.discover-box {
  margin-top: 60px;
  padding: 5px 10px 10px;

  .banner-recommended {
    margin-bottom: 10px;
    //
    .banner {
      width: 100%;
      height: 170px;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .recommended {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .recommended-item {
        margin-bottom: 15px;
        flex-basis: 25%;
        max-width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 40px;
          height: 40px;
        }

        span {
          margin-top: 5px;
        }
      }
    }
  }

  .categories-box {
    width: 100%;
    margin-top: 10px; //
    background: #fff;

    .title-more {
      margin: 5px 0;
      display: flex;
      justify-content: space-between;
    }

    .categories-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 50px;

      .categories {
        flex-basis: 33%;
        max-width: 33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
        img {
          width: 100px;
          height: 100px;
          border-radius: 5%;
          object-fit: cover;
        }

        span {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
