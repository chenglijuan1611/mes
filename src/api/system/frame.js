import request from '@/utils/request'

// 查询帧信息列表
export function listFrame(query) {
  return request({
    url: '/system/frame/list',
    method: 'get',
    params: query
  })
}

// 查询帧信息详细
export function getFrame(id) {
  return request({
    url: '/system/frame/' + id,
    method: 'get'
  })
}

// 新增帧信息
export function addFrame(data) {
  return request({
    url: '/system/frame',
    method: 'post',
    data: data
  })
}

// 修改帧信息
export function updateFrame(data) {
  return request({
    url: '/system/frame',
    method: 'put',
    data: data
  })
}

// 删除帧信息
export function delFrame(id) {
  return request({
    url: '/system/frame/' + id,
    method: 'delete'
  })
}

// 导出帧信息
export function exportFrame(query) {
  return request({
    url: '/system/frame/export',
    method: 'get',
    params: query
  })
}