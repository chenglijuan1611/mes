import request from '@/utils/request'

// 查询经销商信息列表
export function listAgency(query) {
  return request({
    url: '/system/agency/list',
    method: 'get',
    params: query
  })
}

// 查询经销商信息详细
export function getAgency(id) {
  return request({
    url: '/system/agency/' + id,
    method: 'get'
  })
}

// 新增经销商信息
export function addAgency(data) {
  return request({
    url: '/system/agency',
    method: 'post',
    data: data
  })
}

// 修改经销商信息
export function updateAgency(data) {
  return request({
    url: '/system/agency',
    method: 'put',
    data: data
  })
}

// 删除经销商信息
export function delAgency(id) {
  return request({
    url: '/system/agency/' + id,
    method: 'delete'
  })
}

// 导出经销商信息
export function exportAgency(query) {
  return request({
    url: '/system/agency/export',
    method: 'get',
    params: query
  })
}