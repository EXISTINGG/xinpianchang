import { request } from '@/utils/request'

export const getNotes = () => request.get(`/notes`)

// 加载更多
export const getNotesMore = (url: string) => request.get(`${url}`)

// 手记详情内容
export const getNoteById = (id: string) => request.get(`/note/${id}`)

// 手记评论
export const getNoteComment = (id: string) => request.get(`/note/${id}/comment`)