import {request} from '@/utils/request'
// 所有分类(Discovery页整个页面)
export const getDiscovery = () => request.get(`page/discovery`)
// 分类内容列表
export const getCateArticles = (id: string) => request.get(`/articles?category_id=${id}`)
// 加载更多
export const getDiscoveryMore =(url: string) => request.get(url)