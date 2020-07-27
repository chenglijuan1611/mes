import request from '@/utils/request'

// 查询24小时用水分布
export function usewater( ) {
  return request({
    url: '/statistical/hourWater',
    method: 'get',
   })
}
//用户统计
export function userstatistics( ) {
  return request({
    url: '/WeChatApp/addAvtive',
    method: 'get',
   })
}
 
//用户平均每日用水量比例
export function dayAverageWater( ) {
  return request({
    url: '/statistical/customer/dayAverageWater',
    method: 'get',
   })
}

// 首页 设备统计

export function devicecount(query) {
  return request({
    url: '/system/device/countStatis',
    method: 'get',
    params:query
   })
}
