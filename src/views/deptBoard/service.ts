import request from "@/service/request";
import { AxiosResponse } from "axios";

// 部门、领域数据
export const getReportDataByCond = (params: any): Promise<AxiosResponse<any, any>> => {
  return request({
    method: "GET",
    url: "/api/mission-vnext/BI-report/getReportDataByCond",
    params
  });
}