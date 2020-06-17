import request from '@/utils/request'

// 查询设备分类信息列表
export function listDeviceModel(query) {
  return request({
    url: '/system/deviceModel/list',
    method: 'get',
    params: query
  })
}

// 查询设备分类信息详细
export function getDeviceModel(deviceModelId) {
  return request({
    url: '/system/deviceModel/' + deviceModelId,
    method: 'get'
  })
}

// 新增设备分类信息
export function addDeviceModel(data) {
  return request({
    url: '/system/deviceModel',
    method: 'post',
    data: data
  })
}

// 修改设备分类信息
export function updateDeviceModel(data) {
  return request({
    url: '/system/deviceModel',
    method: 'put',
    data: data
  })
}

// 删除设备分类信息
export function delDeviceModel(deviceModelId) {
  return request({
    url: '/system/deviceModel/' + deviceModelId,
    method: 'delete'
  })
}

// 导出设备分类信息
export function exportDeviceModel(query) {
  return request({
    url: '/system/deviceModel/export',
    method: 'get',
    params: query
  })
}