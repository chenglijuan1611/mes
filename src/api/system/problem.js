import request from '@/utils/request'

// 查询常见问题列表
export function listProblem(query) {
  return request({
    url: '/system/problem/list',
    method: 'get',
    params: query
  })
}

// 查询常见问题详细
export function getProblem(comproblemId) {
  return request({
    url: '/system/problem/' + comproblemId,
    method: 'get'
  })
}

// 新增常见问题
export function addProblem(data) {
  return request({
    url: '/system/problem',
    method: 'post',
    data: data
  })
}

// 修改常见问题
export function updateProblem(data) {
  return request({
    url: '/system/problem',
    method: 'put',
    data: data
  })
}

// 删除常见问题
export function delProblem(comproblemId) {
  return request({
    url: '/system/problem/' + comproblemId,
    method: 'delete'
  })
}

// 导出常见问题
export function exportProblem(query) {
  return request({
    url: '/system/problem/export',
    method: 'get',
    params: query
  })
}