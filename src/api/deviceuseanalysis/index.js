import request from '@/utils/request'

// 查询24小时用水分布
export function usewater(query) {
  return request({
    url: '/statistical/hourWater',
    method: 'get',
   })
}
 
export function userstatistics(query) {
  return request({
    url: '/WeChatApp/addAvtive',
    method: 'get',
   })
}
 