// 导入axios实例中的AxiosResponse泛型接口
import { AxiosResponse } from "axios";
//导入封装的axios请求方法
import request from "@/service/request";
// 获取区域统计数据
export const getMapData = (params: object): Promise<AxiosResponse<any, any>> => {
  return request({
    method: "GET",
    url: "/api/mission-vnext/BI-report/getProjectZoneReport",
    params,
  });
}

// 获取其他报表数据
export const getProjectOtherReport = (): Promise<AxiosResponse<any, any>> => {
  return request({
    method: "GET",
    url: "/api/mission-vnext/BI-report/getProjectOtherReport"
  });
}
