import request from '@/utils/request'

// 查询告警信息列表
export function listFault(query) {
  return request({
    url: '/system/fault/list',
    method: 'get',
    params: query
  })
}

// 查询告警信息详细
export function getFault(id) {
  return request({
    url: '/system/fault/' + id,
    method: 'get'
  })
}

// 新增告警信息
export function addFault(data) {
  return request({
    url: '/system/fault',
    method: 'post',
    data: data
  })
}

// 修改告警信息
export function updateFault(data) {
  return request({
    url: '/system/fault',
    method: 'put',
    data: data
  })
}

// 删除告警信息
export function delFault(id) {
  return request({
    url: '/system/fault/' + id,
    method: 'delete'
  })
}

// 导出告警信息
export function exportFault(query) {
  return request({
    url: '/system/fault/export',
    method: 'get',
    params: query
  })
}