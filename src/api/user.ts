import {request} from '@/utils/request'

export const getUser = (id: string) => request.get(`/user/${id}`)
// 用户作品
export const getUserArticles = (id: string) => request.get(`/user/${id}/articles`)

export const getMore = (url: string) => request.get(url)
// 粉丝
export const getUserFollowers = (id: string) => request.get(`/user/${id}/followers`)

export const getUseruserApproved = (id: string) => request.get(`/user/${id}/articles-approved`)

export const getUserCollections = (id: string) => request.get(`/user/${id}/collections`)
// 关注
export const getUserFollowees = (id: string) => request.get(`/user/${id}/followees`)
