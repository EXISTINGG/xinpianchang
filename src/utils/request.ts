import axios from 'axios'
import { showLoadingToast,showFailToast } from 'vant';
// import { useVideoDataStore } from '@/store/videoData';
import {closeToast} from 'vant'
import 'vant/es/toast/style';

// const videoDataStore = useVideoDataStore()

// (有Loading效果)
export const request = axios.create({
  baseURL: 'https://apis.netstart.cn/xpc',
  // 请求超时时间
  timeout: 10000
})
// (无Loading效果)
export const requests = axios.create({
  baseURL: 'https://apis.netstart.cn/xpc',
  // 请求超时时间
  timeout: 10000
})

// 声明请求拦截器(有Loading效果)
request.interceptors.request.use(config => {
  //展示 Loading 效果
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  });
  return config
}, err => {
  showFailToast({ 
    message: err.message,
    forbidClick: true,
  })
  return Promise.reject(err)
})
// 声明响应拦截器
request.interceptors.response.use(response => {
  //隐藏 Loading 效果
  closeToast()
  return response
}, err => {
  showFailToast({ 
    message: err.message,
    forbidClick: true,
  })
  // 关闭加载(超时后,关闭下拉加载)
  // videoDataStore.refreshing = false
  return Promise.reject(err)
})

// 声明请求拦截器(无Loading效果)
requests.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})
// 声明响应拦截器
requests.interceptors.response.use(response => {
  return response
}, err => {
  return Promise.reject(err)
})
