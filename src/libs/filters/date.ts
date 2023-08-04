import dayjs from "dayjs"

export const unixDate = (date: number, format: string = 'YYYY-MM-DD') => {
  const d = dayjs.unix(date)
  return d.format(format)
}

export default {
  unixDate
}