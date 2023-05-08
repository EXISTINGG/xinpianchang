import { request } from '@/utils/request'

export const getSearchKws = () => request.get(`/search/recommend_kws`)

// 根据关键词搜索
export const getresultByKw = (kw: string) => request.get(`/search?kw=${kw}`)

export const getMore = (url: string) => request.get(url)

// 根据关键词搜索&排序方式&不限制/可下载
export const getresultByKwAndSort = (kw: string, sort: string,downLoad?: string | number) => request.get(`/search?type=article&kw=${kw}&sort=${sort}&page&allow_download=${downLoad}`)

// 创作人
export const getCreators = () => request.get(`/creators`)