import { request } from '@/utils/request'

export const getNotes = () => request.get(`/notes`)

// 加载更多
export const getNotesMore = (url: string) => request.get(`${url}`)