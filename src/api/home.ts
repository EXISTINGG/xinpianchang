import {request} from '@/utils/request'

export const getTab = () => {
  return request.get(`/home/config`)
}

export const getSelect = () => {
  return request.get(`/home/selection`)
}

// 加载更多(首页,全球案例)
let page = 1
export const getloadMore = (url: string, tab?: string) => {
  // 推荐页返回的moreUrl中,page=2没有加,这里手动增加
  if (tab === 'recommend') {
    page += 1
    return request.get(url.replace(/\?page=[0-9]*&/,`?page=${page}&`))
  }
  return request.get(url)
}

export const getMust = () => {
  return request.get(`/home/mustSee`)
}

export const getCommend = () => {
  return request.get(`/home/recommend`)
}

export const getCateRecommend = (link: string) => {
  return request.get(`${link}&page&pageSize=20`)
}

export const getHot = () => {
  return request.get(`home/hot`)
}
// 热门分类(带有标签)
export const getCateHot = () => {
  return request.get(`/home/cateHot`)
}
// 热门分类(根据标签id分类)
export const getCateListById = (id: string) => {
  return request.get(`/home/cateHot?category_id=${id}&offset=20&pageSize=20`)
}
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
