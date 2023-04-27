import {requests} from '@/utils/request'

export const getVersion = () => {
  return requests.get(`/version`)
}