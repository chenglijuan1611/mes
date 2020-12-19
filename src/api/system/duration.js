import request from '@/utils/request'

// 查询用户用水统计列表
export function listDuration(query) {
  return request({
    url: '/system/duration/list',
    method: 'get',
    params: query
  })
}

// 查询用户用水统计详细
export function getDuration(id) {
  return request({
    url: '/system/duration/' + id,
    method: 'get'
  })
}

// 新增用户用水统计
export function addDuration(data) {
  return request({
    url: '/system/duration',
    method: 'post',
    data: data
  })
}

// 修改用户用水统计
export function updateDuration(data) {
  return request({
    url: '/system/duration',
    method: 'put',
    data: data
  })
}

// 删除用户用水统计
export function delDuration(id) {
  return request({
    url: '/system/duration/' + id,
    method: 'delete'
  })
}

// 导出用户用水统计
export function exportDuration(query) {
  return request({
    url: '/system/duration/export',
    method: 'get',
    params: query
  })
}