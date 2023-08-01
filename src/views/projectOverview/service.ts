// 导入axios实例中的AxiosResponse泛型接口
import { AxiosResponse } from "axios";
//导入封装的axios请求方法
import request from "@/service/request";

export const getMapData = (params: object): Promise<AxiosResponse<any, any>> => {
  return request({
    method: "POST",
    url: "/api/mission-vnext/BI-report/getProjectZoneReport",
    params,
  });
}
  