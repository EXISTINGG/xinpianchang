import {request} from '@/utils/request'

export const getVideoArtice = (id: number) => request.get(`/article/${id}`)

export const getSimilarVidoe = (id: number) => request.get(`/article/${id}/next`)