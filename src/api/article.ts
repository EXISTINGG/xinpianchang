import {request} from '@/utils/request'

export const getArticle = (id: string) => request.get(`/e_article/${id}`)

export const getArticleComments = (id: string) => request.get(`/e_comments/${id}`)