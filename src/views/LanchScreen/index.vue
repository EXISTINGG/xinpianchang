<template>
  <div class="bottom-logo">
    <div>
      <div class="log-row">
        <img class="logo" :src="logo" />
        <text>新片场</text>
      </div>
      <span>与百万创作人一起成长</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getVersion } from '@/api/checkOpenScreen.ts'
import {useRouter} from 'vue-router'
import logoPng from '@/assets/images/logo.png'

interface IVersion {
  description?: string
  force?: boolean
  local_version?: string
  remind?: number
  size?: number
  update?: boolean
  url?: string
  version?: string
  versionCode?: number
  version_compare?: number
}

const logo = ref(logoPng)
let version = ref<IVersion>({})
const router = useRouter()

const checkVersion = async () => {
  const data  = await getVersion()
}

// 自动跳转到首页
const toHomePage = () => {
  router.push('/home')
}
toHomePage()
</script>

<style lang="scss" scoped>
.bottom-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 40px;
  width: 100%;

  .log-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5px;


    .logo {
      width: 35px;
      height: 35px;
    }

    text {
      font-size: 20px;
      font-weight: 600;
      font-style: italic;
    }
  }

  span {
    color: #666;
  }
}
</style>
