export const setPieData = (options: any, config: Array<any>, title?: string) => {
  options.title.text = title
  options.legend.data = config.map(item => item.name)
  options.series[0].data = config.map(item => {
    return {
      value: item.value,
      name: item.name,
      itemStyle: {
        color: item.innerColor
      }
    }
  })
  options.series[1].data = config.map(item => {
    return {
      value: item.value,
      name: item.name,
      itemStyle: {
        color: item.color
      }
    }
  })
}