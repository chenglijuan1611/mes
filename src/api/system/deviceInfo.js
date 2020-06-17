import request from '@/utils/request'

// 查询设备列表信息列表
export function listDeviceInfo(query) {
  return request({
    url: '/system/deviceInfo/list',
    method: 'get',
    params: query
  })
}

// 查询设备列表信息详细
export function getDeviceInfo(id) {
  return request({
    url: '/system/deviceInfo/' + id,
    method: 'get'
  })
}

// 新增设备列表信息
export function addDeviceInfo(data) {
  return request({
    url: '/system/deviceInfo',
    method: 'post',
    data: data
  })
}

// 修改设备列表信息
export function updateDeviceInfo(data) {
  return request({
    url: '/system/deviceInfo',
    method: 'put',
    data: data
  })
}

// 删除设备列表信息
export function delDeviceInfo(id) {
  return request({
    url: '/system/deviceInfo/' + id,
    method: 'delete'
  })
}

// 导出设备列表信息
export function exportDeviceInfo(query) {
  return request({
    url: '/system/deviceInfo/export',
    method: 'get',
    params: query
  })
}