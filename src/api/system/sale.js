import request from '@/utils/request'

// 查询售后账号信息列表
export function listSale(query) {
  return request({
    url: '/system/sale/list',
    method: 'get',
    params: query
  })
}

// 查询售后账号信息详细
export function getSale(id) {
  return request({
    url: '/system/sale/' + id,
    method: 'get'
  })
}

// 新增售后账号信息
export function addSale(data) {
  return request({
    url: '/system/sale',
    method: 'post',
    data: data
  })
}

// 修改售后账号信息
export function updateSale(data) {
  return request({
    url: '/system/sale',
    method: 'put',
    data: data
  })
}

// 删除售后账号信息
export function delSale(id) {
  return request({
    url: '/system/sale/' + id,
    method: 'delete'
  })
}

// 导出售后账号信息
export function exportSale(query) {
  return request({
    url: '/system/sale/export',
    method: 'get',
    params: query
  })
}