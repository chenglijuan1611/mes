import request from '@/utils/request'

// 查询告警详情信息列表
export function listFaultMessage(query) {
  return request({
    url: '/system/faultMessage/list',
    method: 'get',
    params: query
  })
}

// 查询告警详情信息详细
export function getFaultMessage(faultMessageId) {
  return request({
    url: '/system/faultMessage/' + faultMessageId,
    method: 'get'
  })
}

// 新增告警详情信息
export function addFaultMessage(data) {
  return request({
    url: '/system/faultMessage',
    method: 'post',
    data: data
  })
}

// 修改告警详情信息
export function updateFaultMessage(data) {
  return request({
    url: '/system/faultMessage',
    method: 'put',
    data: data
  })
}

// 删除告警详情信息
export function delFaultMessage(faultMessageId) {
  return request({
    url: '/system/faultMessage/' + faultMessageId,
    method: 'delete'
  })
}

// 导出告警详情信息
export function exportFaultMessage(query) {
  return request({
    url: '/system/faultMessage/export',
    method: 'get',
    params: query
  })
}