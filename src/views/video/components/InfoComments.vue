<!-- <template>
  <van-tabs v-model:active="active" color="#e74b3b" animated swipeable sticky :offset-top="videoHeight">
    <van-tab title="简介" class="top">
      <VideoInfo />
    </van-tab>
    <van-tab title="评论">
      <Comments />
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import VideoInfo from './VideoInfo.vue'
import Comments from '@/components/Comments.vue'

// 接收父组件的数据
const props = defineProps({
  video: {
    type: Number,
    required: true
  }
})
console.log(props.video);

const active = ref(0)
const videoHeight = ref(0)
onMounted(() => {
  videoHeight.value = props.videoHeight
  console.log(props.video);
})
</script>
 -->
