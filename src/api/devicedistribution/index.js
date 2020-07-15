import request from "@/utils/request";

export function devicedistributionapi(query) {
  return request({
    url: "/statistical/device/distribution",
    method: "get",
    params: query
  });
}
