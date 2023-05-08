<template>
  <section class="user-box">
    <div class="info">
      <div class="avator" @click="goUserInfo(user.id)">
        <img v-lazy="user.avatar">
        <i class="author-v" :class="user.author_type === 1 ? 'author-blue-v' : 'author-yellow-v'" v-if="user.author_type != 0"></i>
      </div>
      
      <div class="user-info">
        <div class="name-v">
          <h4 @click="goUserInfo(user.id)">{{strLength(user.username) >= 20 ? user.username.substring(0,10) + '···' : user.username}}</h4>
          <i class="vip-icon" :class="user.vip_status === 1 ? 'vip-size' : 'svip-size'" v-if="user.vip_status != 0"></i>
        </div>
        <div class="data">
          <i v-if="user?.occupation">{{user.occupation}} </i>
          <i v-if="user?.occupation && user?.ip_location">·</i>
          <i v-if="user?.ip_location">{{user.ip_location}}</i>
          <i v-if="user?.ip_location && user?.count?.count_follower">·</i>
          <i v-if="user?.count?.count_follower">粉丝 {{getVideoCount(user.count.count_follower)}}</i>
        </div>
      </div>

      <div class="btn">
        <button>关注</button>
      </div>
    </div>

    <!-- 推荐关注页面用到,暂时用不到 -->
    <!-- <div class="poster" v-if="showSlot">
      <span class="poster-box">
        <img src="https://oss-xpc0.xpccdn.com/passport/avatar/12501968/2022/11/6370fe0ad8f40.jpeg">
        <i>22:00</i>
      </span> 
    </div> -->
  </section>
</template>

<script setup lang="ts">
import useVideoCount from '@/hooks/useVideoCount'
import {useRouter} from 'vue-router'

const router = useRouter()

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  showSlot: {
    type: Boolean,
    default: false  
  }
})

const {getVideoDuration, getVideoCount, strLength} = useVideoCount()

const goUserInfo = (id: string) => router.push(`/userinfo/${id}`)

</script>


<style lang="scss" scoped>
.user-box {
  padding: 15px 10px;
  // margin: 10px;
  display: flex;
  flex-direction: column;
  background: #fff;
  // border-bottom: .5px solid #ccc;
  border-radius: 5px;

  .info {
    display: flex;
    align-items: center;
  }

  .avator {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    img {
      @extend .avator;
      object-fit: cover;
      border: .5px solid #ccc;
    }

    .author-v {
            position: absolute;
            bottom: 0;
            right: 0;
            display: inline-block;
            background-size: cover;
            background-repeat: no-repeat;
          }
          .author-yellow-v,
          .author-blue-v {
            width: 12px;
            height: 12px;
          }
          .author-yellow-v {
            background-image: url($author-yellow-v);
          }
          .author-blue-v {
            background-image: url($author-blue-v);
          }
  }

  .user-info {
    flex: 1;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
  }

  .name-v {
    display: flex;
    align-items: center;
    .vip-icon {
      margin-left: 5px;
          background-size: cover;
          background-repeat: no-repeat;
          display: inline-block;

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

  .data {
    margin-top: 5px;
    color: #a1a1a1;

    i {
      margin-right: 5px;
    }
  }

  .btn {
    button {
      background: #fdeeeb;
      color: #dc5041;
      border-radius: 25px;
      border: none;
      width: 60px;
      height: 30px;
    }
  }

  .poster {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    .poster-box {
      position: relative;
      border-radius: 5px;
      width: 100px;
      height: 50px;
      img {
        @extend .poster-box;
        object-fit: cover;
      }

      i {
        position: absolute;
        bottom: 2px;
        right: 5px;
        color: #fffefe;
        text-shadow: 0 0 5px rgba(0, 0, 0, 1);
      }
    }
  }
}
</style>