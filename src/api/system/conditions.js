import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listConditions(query) {
  return request({
    url: '/system/conditions/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getConditions(id) {
  return request({
    url: '/system/conditions/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addConditions(data) {
  return request({
    url: '/system/conditions',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateConditions(data) {
  return request({
    url: '/system/conditions',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delConditions(id) {
  return request({
    url: '/system/conditions/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportConditions(query) {
  return request({
    url: '/system/conditions/export',
    method: 'get',
    params: query
  })
}