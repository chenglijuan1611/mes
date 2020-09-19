import request from '@/utils/request'

// 查询各省市水质信息列表
export function listWaterQuality(query) {
  return request({
    url: '/system/waterQuality/list',
    method: 'get',
    params: query
  })
}

// 查询各省市水质信息详细
export function getWaterQuality(id) {
  return request({
    url: '/system/waterQuality/' + id,
    method: 'get'
  })
}

// 新增各省市水质信息
export function addWaterQuality(data) {
  return request({
    url: '/system/waterQuality',
    method: 'post',
    data: data
  })
}

// 修改各省市水质信息
export function updateWaterQuality(data) {
  return request({
    url: '/system/waterQuality',
    method: 'put',
    data: data
  })
}

// 删除各省市水质信息
export function delWaterQuality(id) {
  return request({
    url: '/system/waterQuality/' + id,
    method: 'delete'
  })
}

// 导出各省市水质信息
export function exportWaterQuality(query) {
  return request({
    url: '/system/waterQuality/export',
    method: 'get',
    params: query
  })
}