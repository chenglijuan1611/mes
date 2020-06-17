import request from '@/utils/request'

// 查询设备分类信息列表
export function listModel(query) {
  return request({
    url: '/system/model/list',
    method: 'get',
    params: query
  })
}

// 查询设备分类信息详细
export function getModel(deviceModelId) {
  return request({
    url: '/system/model/' + deviceModelId,
    method: 'get'
  })
}

// 新增设备分类信息
export function addModel(data) {
  return request({
    url: '/system/model',
    method: 'post',
    data: data
  })
}

// 修改设备分类信息
export function updateModel(data) {
  return request({
    url: '/system/model',
    method: 'put',
    data: data
  })
}

// 删除设备分类信息
export function delModel(deviceModelId) {
  return request({
    url: '/system/model/' + deviceModelId,
    method: 'delete'
  })
}

// 导出设备分类信息
export function exportModel(query) {
  return request({
    url: '/system/model/export',
    method: 'get',
    params: query
  })
}