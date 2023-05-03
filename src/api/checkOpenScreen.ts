import {requests} from '@/utils/request'

export const getVersion = () => requests.get(`/version`)
