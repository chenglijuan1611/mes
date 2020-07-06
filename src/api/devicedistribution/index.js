import request from '@/utils/request'

 export function devicedistributionapi( ) {
  return request({
    url: '/statistical/device/distribution',
    method: 'get',
  })
}
 