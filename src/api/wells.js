import request from '@/utils/request'

export function getWells(params) {
  return request({
    url: '/wells/data',
    method: 'get',
    params
  })
}
