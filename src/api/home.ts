import {request} from '@/utils/request'
import countdown from '@/utils/test'

export const getTab = () => request.get(`/home/config`)


export const getSelect = () => request.get(`/home/selection`)

// 加载更多(首页,全球案例)
let page = 1
let num = 1 // 只需获取一次今日日期
let date: string // 每日精选日期
export const getloadMore = (url: string, tab?: string) => {
  console.log(tab);
  
  // 推荐页返回的moreUrl中,page=2没有加,这里手动增加
  if (tab === 'recommend') {
    page += 1    
    return request.get(url.replace(/\?page=[0-9]*&/,`?page=${page}&`))
  } else if (tab === 'selection') {
    if (num == 1) {
      date = url.slice(-8)
      num = 0
    } else {
      date = countdown(date)
    }
    return request.get(url.replace(/[0-9]{8}/,`${date}`))
  } else {
    return request.get(url)
  }
}

export const getMust = () => request.get(`/home/mustSee`)


export const getCommend = () => request.get(`/home/recommend`)


export const getCateRecommend = (link: string) => request.get(`${link}&page&pageSize=20`)


export const getHot = () => request.get(`home/hot`)

// 热门分类(带有标签)
export const getCateHot = () => request.get(`/home/cateHot`)

// 热门分类(根据标签id分类)
export const getCateListById = (id: string) => request.get(`/home/cateHot?category_id=${id}&offset=20&pageSize=20`)

// 分类精选(带有标签)
export const getCateSelection = () => request.get(`/home/cateSelection`)
// 分类精选(根据标签id分类)
export const getCateSelectionById = (id: string) => request.get(`/home/cateSelection?type=${id}&offset=40&pageSize=20`)
// 全球案例(无需标签/id)
export const getVmovier = () => request.get(`/home/vmovier`)
// 加载更多-热门分类
export const getCateHotMore = (url: string) => request.get(url)
// 加载更多-分类精选
export const getCateSelectionMore = (url: string) => request.get(url)
