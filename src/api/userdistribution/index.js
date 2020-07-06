import request from '@/utils/request'

 export function userdistributionapi( ) {
  return request({
    url: '/statistical/customer/distribution',
    method: 'get',
  })
}
 