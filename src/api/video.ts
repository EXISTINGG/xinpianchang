import {request} from '@/utils/request'

export const getVideoArtice = (id: number) => request.get(`/article/${id}`)

export const getSimilarVidoe = (id: number) => request.get(`/article/${id}/next`)

export const getComments = (id: number) => request.get(`https://apis.netstart.cn/xpc/comments?resource_id=${id}`)

export const getMore = (url: string) => request.get(`${url}`)