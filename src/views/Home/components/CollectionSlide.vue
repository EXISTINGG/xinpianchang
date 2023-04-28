<template>
  <van-swipe class="swipe" :width="160" :loop="false" :show-indicators="false" :duration="500">
          <van-swipe-item class="swipe-item" v-for="item in collection" :key="item.model.resource.id">
            <div class="author-box">
              <div class="avator-v">
                <img v-lazy="item.model.resource.avatar">
                <span class="author-v-img" :class="item.model.resource.author_type === 1 ? 'author-blue-v' : 'author-yellow-v'" v-if="item.model.resource.author_type != 0"></span>
              </div>
              <div class="name-vip">
                <text class="name">{{strLength(item.model.resource.username) > 8 ? item.model.resource.username.substring(0,4) + '···' : item.model.resource.username}}</text>&nbsp;
                <span class="vip-img" :class="item.model.resource.vip_status === 1 ? 'vip-size' : 'svip-size'" v-if="item.model.resource.vip_status != 0"></span>
              </div>
              <div class="count">
                <div>{{item.model.resource.count.count_article}}作品 · {{item.model.resource.count.count_follower}} 粉丝</div>
                <div>{{item.model.resource.occupation}}</div>
              </div>
              <div class="follow">
                  <button>+ 关注</button>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
</template>

<script setup lang="ts">
import useVideoCount from '@/hooks/useVideoCount.ts'
const {strLength} = useVideoCount()

// 接收父组件的数据
const props = defineProps({
  collection: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss">
    .swipe {
  width: 100%;
  height: 170px;
  margin: 10px 0;

  .swipe-item {
  width: 150px !important;
  height: 100%;
  border-radius: 5px;
  background: #fff;
  margin-right: 10px;

  .author-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    height: 85%;
    // height:100%;
    

    .avator-v, img {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: .5px solid #ccc;     
    }
    .author-v-img {
      position: absolute;
      bottom: 0;
      right: 0;
      display: inline-block;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .author-yellow-v,
    .author-blue-v {
      width: 10px;
      height: 10px;
    }
    .author-yellow-v {
      background-image: url($author-yellow-v);
    }
    .author-blue-v {
      background-image: url($author-blue-v);
    }

    .name-vip {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #1a1a1a;

      .vip-img {
          display: inline-block;
          background-size: cover;
          background-repeat: no-repeat;
        }
        .vip-size {
          width: 15px;
          height: 15px;
          background-image: url($vip-icon);
        }
        .svip-size {
          width: 40px;
          height: 16px;
          background-image: url($sup-vip);
        }
    }

    .count {
      text-align: center;
      color: #bfbfbf;
    }

    .follow {
      button {
        width: 60px;
        height:25px;
        line-height: 25px;
        color: #fff;
        border-radius: 25px;
        border: none;
        background: ($color-primary);
      }
    }
  }
}
}
</style>