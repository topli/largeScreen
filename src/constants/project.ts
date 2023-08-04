export enum MAP_LEVEL {
  "COUNTRY" = "COUNTRY",
  "PROVINCE" = "PROVINCE",
  "CITY" = "CITY",
}

export interface TotalItem {
  label?: string,
  value?: string,
  unit?: string,
  color?: string,
  hide?: boolean,
  click?: Function
}