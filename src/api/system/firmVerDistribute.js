import request from '@/utils/request'

// 查询客户信息列表
export function firmVerDistribute(query) {
  return request({
    url: '/system/device/firmVerDistribute',
    method: 'get',
    params: query
  })
}
 