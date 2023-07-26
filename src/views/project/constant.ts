export const pathSymbols = {
  plane: require("../../assets/images/plane.png"),
  missile: require("../../assets/images/missile.png"),
  train: require("../../assets/images/train.png"),
  ship: require("../../assets/images/ship.png"),
  car: require("../../assets/images/car.png"),
  satellite: require("../../assets/images/satellite.png"),
  radar: require("../../assets/images/radar.png"),
}
export const projectStatusPie = (function () {
  return {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",

    },
    title: {
        text: '在研项目\n紧急度\n分布',
        left: 'center',
        top: '30%',
        padding: [24, 0],
        textStyle: {
          color: '#fff',
          fontSize: 12,
          align: 'center',
          width: 60
        }
    },
    legend: {
      orient: 'vertical',
      right: 0,
      top: 'center',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        color: '#fff'
      },
      data: ['特紧急', '三级', '二级', '一级']
    },
    series: [
      {
            name: '人员类型',
            type: 'pie',
            hoverAnimation: false,
            legendHoverLink: false,
            radius: ['40%', '50%'],
            label: {
              show: false,
            },
            labelLine: {
              normal: {
                  show: false
              },
            },
            tooltip: {
              show: false,
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  color: '#BC9A48'
                }
              },
              {
                  value: 100,
                  itemStyle: {
                    color: '#4A9400'
                  }
              },
              {
                  value: 100,
                  itemStyle: {
                    color: '#1DD2D8'
                  }
              },
              {
                  value: 100,
                  itemStyle: {
                    color: '#3D55E8'
                  }
              }
            ]
        },
        {
            name: '人员类型',
            type: 'pie',
            radius: ['50%', '70%'],
            labelLine: {
              show: false,
            },
            label: {
              show:false
            },
            data: [
              {
                    value: 100,
                    name: '特紧急',
                    itemStyle: {
                      color: '#F7B500'
                    }
                },
                {
                    value: 100,
                    name: '三级',
                    itemStyle: {
                      color: '#5DB703'
                    }
                },
                {
                    value: 100,
                    name: '二级',
                    itemStyle: {
                      color: '#00FAD4'
                    }
                },
                {
                    value: 100,
                    name: '一级',
                    itemStyle: {
                      color: '#4E8AFA'
                    }
                }
            ]
        }
    ]
}
})()

export enum MAP_LEVEL {
  "COUNTRY" = "COUNTRY",
  "PROVINCE" = "PROVINCE",
  "CITY" = "CITY",
}

