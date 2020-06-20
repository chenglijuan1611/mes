import request from '@/utils/request'

// 查询终端用户信息列表
export function listTerminalUser(query) {
  return request({
    url: '/system/terminalUser/list',
    method: 'get',
    params: query
  })
}

// 查询终端用户信息详细
export function getTerminalUser(terminalUserId) {
  return request({
    url: '/system/terminalUser/' + terminalUserId,
    method: 'get'
  })
}

// 新增终端用户信息
export function addTerminalUser(data) {
  return request({
    url: '/system/terminalUser',
    method: 'post',
    data: data
  })
}

// 修改终端用户信息
export function updateTerminalUser(data) {
  return request({
    url: '/system/terminalUser',
    method: 'put',
    data: data
  })
}

// 删除终端用户信息
export function delTerminalUser(terminalUserId) {
  return request({
    url: '/system/terminalUser/' + terminalUserId,
    method: 'delete'
  })
}

// 导出终端用户信息
export function exportTerminalUser(query) {
  return request({
    url: '/system/terminalUser/export',
    method: 'get',
    params: query
  })
}