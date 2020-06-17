import request from '@/utils/request'

// 查询维保信息列表
export function listMaintenance(query) {
  return request({
    url: '/system/maintenance/list',
    method: 'get',
    params: query
  })
}

// 查询维保信息详细
export function getMaintenance(id) {
  return request({
    url: '/system/maintenance/' + id,
    method: 'get'
  })
}

// 新增维保信息
export function addMaintenance(data) {
  return request({
    url: '/system/maintenance',
    method: 'post',
    data: data
  })
}

// 修改维保信息
export function updateMaintenance(data) {
  return request({
    url: '/system/maintenance',
    method: 'put',
    data: data
  })
}

// 删除维保信息
export function delMaintenance(id) {
  return request({
    url: '/system/maintenance/' + id,
    method: 'delete'
  })
}

// 导出维保信息
export function exportMaintenance(query) {
  return request({
    url: '/system/maintenance/export',
    method: 'get',
    params: query
  })
}