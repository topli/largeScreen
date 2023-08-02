import * as echarts from 'echarts'
import plane from '@/assets/images/plane.png'
import missile from '@/assets/images/missile.png'
import train from '@/assets/images/train.png'
import ship from '@/assets/images/ship.png'
import car from '@/assets/images/car.png'
import satellite from '@/assets/images/satellite.png'
import radar from '@/assets/images/radar.png'

export const pathSymbols: { [key: string]: any } = {
  plane: plane,
  missile: missile,
  train: train,
  ship: ship,
  car: car,
  satellite: satellite,
  radar: radar,
}
export const projectStatusPie = function () {
  return {
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)",

    },
    grid: {
      left: 0
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
      selectedMode: false,
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
        name: '',
        type: 'pie',
        hoverAnimation: false,
        legendHoverLink: false,
        radius: ['40%', '50%'],
        center: ['50%', '50%'],
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
        name: '',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        labelLine: {
          show: false,
        },
        label: {
          show: false
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
}
// 项目区域分布 地图配置
export const projectMapOptions = function () {
  return {
    tooltip: {},
    // 地理坐标系组件
    geo: {
      type: 'map',
      map: '',
      top: 10,
      bottom: 10,
      itemStyle: {
        borderColor: '#ffffff',
        borderWidth: 3,
        // shadowColor: '#ffffff',
        // shadowColor:'red',
        shadowColor: '#00F6FF',
        // shadowColor:'red',
        shadowBlur: 15,
      }
    },
    // tooltip: {
    // show: true,
    // trigger: "item",
    // formatter: function (params: any) {
    // let value = params.value || 0
    // return params.name + ":" + value
    // },
    // backgroundColor: "rgba(0, 26, 33, 0.68)",
    // borderColor: "#01525b",
    // },
    roam: false, // 禁用缩放
    animationEasing: "cubicOut",
    animationDurationUpdate: 400,
    series: {
      type: "map",
      name: "china",
      map: '',
      tooltip: {
        show: true,
      },
      top: 10,
      bottom: 10,
      data: [],
      itemStyle: {
        borderColor: 'rgba(111, 253, 255, 1)',
        borderWidth: 0.5,
        // areaColor: 'rgba(29,85,139,.6)'
        areaColor: {
          type: 'linear-gradient',
          x: 0,
          y: 600,
          x2: 0,
          y2: 0,
          colorStops: [{
            offset: 0,
            color: 'RGBA(37,108,190,1)' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'RGBA(15,169,195,1)' // 50% 处的颜色
          }],
          global: true // 缺省为 false
        },
      },
      emphasis: {
        label: {
          color: '#fff'
        },
        itemStyle: {
          areaColor: {
            type: 'linear-gradient',
            x: 0,
            y: 600,
            x2: 0,
            y2: 0,
            colorStops: [{
              offset: 0,
              color: 'RGBA(37,108,190,1)' // 0% 处的颜色
            }, {
              offset: 1,
              color: 'RGBA(15,169,195,1)' // 50% 处的颜色
            }],
            global: true // 缺省为 false
          },
        }
      },
      select: {
        label: {
          color: '#fff'
        },
        itemStyle: {
          areaColor: {
            type: 'linear-gradient',
            x: 0,
            y: 600,
            x2: 0,
            y2: 0,
            colorStops: [{
              offset: 0,
              color: 'RGBA(37,108,190,1)' // 0% 处的颜色
            }, {
              offset: 1,
              color: 'RGBA(15,169,195,1)' // 50% 处的颜色
            }],
            global: true // 缺省为 false
          },
        }
      },
      label: {
        show: true,
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 13,
      },
    },
  }
}
// 科室项目分布
export const deptProjectOptions = function () {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    angleAxis: {
      axisTick: {
        alignWithLabel: true,
        show: true,
        lineStyle: {
          color: "#0065F3",
          width: 3,
        },
        length: 5,
      },
      axisLabel: {
        color: "#fff",
        margin: 15
      },
      type: "category",
      data: [
        "共性技术室",
        "功效芯片室",
        "前端芯片室",
        "太赫兹室",
        "射频微系统室",
        "波束赋形室",
        "变频芯片室",
        "开关环隔室",
        "硅芯片室",
      ],
    },
    radiusAxis: {
      axisLabel: {
        show: false,
        color: "#fff",
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: "#666",
          type: "dashed",
        },
      },
    },
    polar: {
      center: ['50%', '50%'],//上下距离
      radius: [0, '70%']//大小
    },
    series: [
      {
        type: "bar",
        data: [1, 2, 3, 4, 6, 7, 8, 9, 10],
        coordinateSystem: "polar",
        name: "故障",
        stack: "a",
        // emphasis: {
        //   focus: "series",
        // },
        itemStyle: {
          color: "rgba(255,20,0,0.6)",
        },
      },
      {
        type: "bar",
        data: [1, 2, 3, 4, 6, 7, 8, 9, 10],
        coordinateSystem: "polar",
        name: "正常",
        stack: "a",
        // emphasis: {
        //   focus: "series",
        // },
        itemStyle: {
          color: "rgba(0,101,243,0.6)",
        },
      },
    ],
    legend: {
      textStyle: {
        color: "#fff",
      },
      top: 10,
      right: 0,
    },
  }
}
// 项目进展分析
export const projectProgressOptions = function () {
  return {
    color: ["#6DD400", "#15D895", "#12F2FF", "#0065F3", "#8000F3", '#96C0FC', '#E8B429'],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      top: 10,
      icon: "rect",
      textStyle: {
        color: "#fff",
      },
      data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          color: '#FFFFFF'
        },
        axisTick: {
          show: false
        },
        data: ["1月", "2月", "3月", "5月", "6月", "7月", "8月"],
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: '#FFFFFF'
        },
        splitLine: {
          lineStyle: {
            color: '#666',
            type: 'dashed'
          }
        }
      },
    ],
    series: [
      {
        name: "Line 1",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 2,
        },
        showSymbol: false,
        // areaStyle: {
        //   opacity: 0.8,
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: 'rgb(128, 255, 165)'
        //     },
        //     {
        //       offset: 1,
        //       color: 'rgb(1, 191, 236)'
        //     }
        //   ])
        // },
        // emphasis: {
        //   focus: "series",
        // },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: "Line 2",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 2,
        },
        showSymbol: false,
        // areaStyle: {
        //   opacity: 0.8,
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: 'rgb(0, 221, 255)'
        //     },
        //     {
        //       offset: 1,
        //       color: 'rgb(77, 119, 255)'
        //     }
        //   ])
        // },
        // emphasis: {
        //   focus: "series",
        // },
        data: [120, 282, 111, 234, 220, 340, 310],
      },
      {
        name: "Line 3",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 2,
        },
        showSymbol: false,
        // areaStyle: {
        //   opacity: 0.8,
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: 'rgb(55, 162, 255)'
        //     },
        //     {
        //       offset: 1,
        //       color: 'rgb(116, 21, 219)'
        //     }
        //   ])
        // },
        // emphasis: {
        //   focus: "series",
        // },
        data: [320, 132, 201, 334, 190, 130, 220],
      },
      {
        name: "Line 4",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 2,
        },
        showSymbol: false,
        // areaStyle: {
        //   opacity: 0.8,
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: 'rgb(255, 0, 135)'
        //     },
        //     {
        //       offset: 1,
        //       color: 'rgb(135, 0, 157)'
        //     }
        //   ])
        // },
        // emphasis: {
        //   focus: "series",
        // },
        data: [220, 402, 231, 134, 190, 230, 120],
      },
      {
        name: "Line 5",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 2,
        },
        showSymbol: false,
        label: {
          show: true,
          position: "top",
        },
        // areaStyle: {
        // opacity: 0.8,
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: 'rgb(255, 191, 0)'
        //   },
        //   {
        //     offset: 1,
        //     color: 'rgb(224, 62, 76)'
        //   }
        // ])
        // },
        // emphasis: {
        //   focus: "series",
        // },
        data: [220, 302, 181, 234, 210, 290, 150],
      },
    ],
  }
}
// 大区统计
export const areaStatisticsOptions = function () {
  return {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      textStyle: {
        color: "#fff",
      },
    },
    legend: {
      top: 10,
      right: 0,
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        color: "#fff",
      },
      data: [
        { name: "完成", itemStyle: { color: '#00F1FF' } },
        { name: "进行", itemStyle: { color: '#0066F5' } },
        { name: "延期", itemStyle: { color: '#FF1400' } },
        { name: "项目总数", itemStyle: { color: '#6DD400' } }
      ],
    },

    xAxis: [
      {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#90979c",
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        axisLabel: {
          interval: 0,
        },
        data: ['华北', '华东', '西北', '西南'],
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#90979c",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
        },
        splitArea: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "完成",
        type: "bar",
        stack: "总量",
        barMaxWidth: 15,
        barGap: "10%",
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#00F1FF' // 0% 处的颜色
            }, {
              offset: 1,
              color: 'rgba(0,241,255,0)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          },
          barBorderRadius: 15,
        },
        data: [
          709, 1917, 2455, 2610
        ],
      },
      {
        name: "进行",
        type: "bar",
        stack: "总量",
        barMaxWidth: 15,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#0066F5' // 0% 处的颜色
            }, {
              offset: 1,
              color: 'rgba(0,102,245,0)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          },
          barBorderRadius: 15,
        },
        data: [327, 1776, 507, 1200],
      },
      {
        name: "延期",
        type: "bar",
        stack: "总量",
        barMaxWidth: 15,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#FF1400' // 0% 处的颜色
            }, {
              offset: 1,
              color: 'rgba(255,0,0,0)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          },
          barBorderRadius: 15,
        },
        data: [2807, 176, 57, 120],
      },
      {
        name: "项目总数",
        type: "line",
        data: [
          1036, 3693, 2962, 3810
        ],
        smooth: true,
        lineStyle: {
          color: '#6DD400'
        }
      },
    ],
  }
}
const linearGradient1 = new echarts.graphic.LinearGradient(0, 1, 0, 0, [
  {
    offset: 0,
    color: 'rgba(0,241,255,0)'
  },
  {
    offset: 1,
    color: '#00F1FF'
  }
])

const linearGradient2 = new echarts.graphic.LinearGradient(0, 1, 0, 0, [
  {
    offset: 0,
    color: 'rgba(109,212,0,0)'
  },
  {
    offset: 1,
    color: '#6DD400'
  }
])
// 领域分析
export const domainAnalysisOptions = function () {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      formatter: function (params: any) {
        return params[0].name + ': ' + params[0].value;
      }
    },
    xAxis: {
      data: ['飞机', '火箭', '高铁', '轮船', '汽车', '卫星', '雷达'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: '#fff'
      }
    },
    yAxis: {
      splitLine: { show: true, lineStyle: { type: 'dashed', color: ['#666'] } },
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false }
    },
    // color: ['#e54035'],
    series: [
      {
        name: 'hill',
        type: 'pictorialBar',
        barCategoryGap: '-130%',
        // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        itemStyle: {
          opacity: 0.5
        },
        emphasis: {
          itemStyle: {
            opacity: 1
          }
        },
        data: [
          {
            value: 123,
            itemStyle: {
              color: linearGradient1
            }
          },
          {
            value: 60,
            itemStyle: {
              color: linearGradient2
            }
          },
          {
            value: 25,
            itemStyle: {
              color: linearGradient1
            }
          },
          {
            value: 18,
            itemStyle: {
              color: linearGradient2
            }
          },
          {
            value: 20,
            itemStyle: {
              color: linearGradient1
            }
          },
          {
            value: 9,
            itemStyle: {
              color: linearGradient2
            }
          },
          {
            value: 2,
            itemStyle: {
              color: linearGradient1
            }
          }],
        z: 10
      },
      {
        name: 'glyph',
        type: 'pictorialBar',
        barGap: '-100%',
        symbolPosition: 'end',
        symbolOffset: [0, '-40px'],
        data: [
          {
            value: 123,
            symbol: 'image://' + pathSymbols.plane,
            symbolSize: [24, 24]
          },
          {
            value: 60,
            symbol: 'image://' + pathSymbols.missile,
            symbolSize: [24, 24]
          },
          {
            value: 18,
            symbol: 'image://' + pathSymbols.train,
            symbolSize: [24, 24]
          },
          {
            value: 12,
            symbol: 'image://' + pathSymbols.ship,
            symbolSize: [24, 24]
          },
          {
            value: 9,
            symbol: 'image://' + pathSymbols.car,
            symbolSize: [24, 24]
          },
          {
            value: 2,
            symbol: 'image://' + pathSymbols.satellite,
            symbolSize: [24, 24]
          },
          {
            value: 1,
            symbol: 'image://' + pathSymbols.radar,
            symbolSize: [24, 24]
          }
        ]
      }
    ]
  }
}

export interface PieItem {
  name: string,
  color: string,
  innerColor: string,
  key: string,
  value: string | number
}


export const pie1Config: Array<PieItem> = [
  { name: '在研', color: '#4E66FA', innerColor: '#3D55E8', key: 'running', value: 0 },
  { name: '挂起', color: '#DF4949', innerColor: '#C94040', key: 'suspend', value: 0 },
  { name: '终止', color: '#46F9FF', innerColor: '#1DD2D8', key: 'cancel', value: 0 },
  { name: '已完成', color: '#6DD400', innerColor: '#4A9400', key: 'completed', value: 0 }
]

export const pie2Config: Array<PieItem> = [
  { name: '特紧急', color: '#FFD264', innerColor: '#BC9A48', key: 'urgent', value: 0 },
  { name: '三级', color: '#6DD400', innerColor: '#4A9400', key: 'three_star', value: 0 },
  { name: '二级', color: '#46F9FF', innerColor: '#1DD2D8', key: 'two_star', value: 0 },
  { name: '一级', color: '#4E66FA', innerColor: '#3D55E8', key: 'one_star', value: 0 }
]
export const pie3Config: Array<PieItem> = [
  { name: '正常', color: '#4E66FA', innerColor: '#3D55E8', key: 'normal', value: 0 },
  { name: '预警', color: '#FFD264', innerColor: '#BC9A48', key: 'warn', value: 0 },
  { name: '延期', color: '#DF4949', innerColor: '#C94040', key: 'delay', value: 0 },
]

export const pie4Config = [
  { name: '高频及高线性功率芯片组', color: '#6DD400', innerColor: '#4A9400', key: '' },
  { name: '在研混合模式增强功率芯片组', color: '#4E66FA', innerColor: '#3D55E8', key: '' },
  { name: '宽带高频率芯片组', color: '#46F9FF', innerColor: '#1DD2D8', key: '' },
]