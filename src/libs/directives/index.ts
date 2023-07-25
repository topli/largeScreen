import echarts from './echarts'

export default function (app: any) {
  const all = {
    ...echarts
  }
  Object.keys(all).forEach(key => {
    app.directive(key, (all as any)[key])
  })
}