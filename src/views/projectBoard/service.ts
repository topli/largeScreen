import request from "@/service/request";
import { AxiosResponse } from "axios";

// 列表数据
export const getReportDataList = (params: any): Promise<AxiosResponse<any, any>> => {
  return request({
    method: "GET",
    url: "/api/mission-vnext/BI-report/getReportDataList",
    params
  });
}