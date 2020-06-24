import request from '@/utils/request'

// 查询设备信息表列表
export function listDevice(query) {
  return request({
    url: '/system/device/list',
    method: 'get',
    params: query
  })
}

// 查询设备信息表详细
export function getDevice(id) {
  return request({
    url: '/system/device/' + id,
    method: 'get'
  })
}

// 新增设备信息表
export function addDevice(data) {
  return request({
    url: '/system/device',
    method: 'post',
    data: data
  })
}

// 修改设备信息表
export function updateDevice(data) {
  return request({
    url: '/system/device',
    method: 'put',
    data: data
  })
}

// 删除设备信息表
export function delDevice(id) {
  return request({
    url: '/system/device/' + id,
    method: 'delete'
  })
}

// 导出设备信息表
export function exportDevice(query) {
  return request({
    url: '/system/device/export',
    method: 'get',
    params: query
  })
}