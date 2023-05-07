<template>
  <van-nav-bar
  :title="`TA的${route.params.title}`"
  left-text="返回"
  left-arrow
  :fixed="true"
  :placeholder="true"
  :safe-area-inset-top="true"
  z-index="999"
  class="nav-bar"
  @click-left="onClickLeft"/>

  <div class="user-list" v-if="userStore.userFollowers.length != 0">
    <van-pull-refresh v-model="userStore.follower.refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="userStore.follower.loading"
        :finished="userStore.follower.finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad">
          <UserCard class="card" v-for="item in userStore.userFollowers" :key="item.id" :user="item"/>
      </van-list>
    </van-pull-refresh>
  </div>

  <div v-else><van-empty :description="`还没有${route.params.title}`" /></div>
  
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {useUserStore} from '@/store/userData'
import UserCard from '@/components/UserCard.vue'

const route = useRoute()
const userStore = useUserStore()


const onClickLeft = () => history.back();

const onRefresh = () => userStore.getMoreFollowersList(true)
const onLoad = () => userStore.getMoreFollowersList()

userStore.userFollowers = []
onMounted(() => {
  if(route.params.title == '粉丝') {
    userStore.getUserFollowersList(route.params.id)
  } else if (route.params.title == '关注') {
    userStore.getUserFolloweesList(route.params.id)
  }
})
</script>

<style lang="scss" scoped>
.nav-bar {
  --van-nav-bar-text-color: #000;
  --van-nav-bar-icon-color: #000;
}

.user-list {
  padding: 0 20px;

  .card {
    border-bottom: .5px solid #ccc;
    border-radius: 0;
  }
}
</style>