<template>
  <LargeScreenMain class="project-screen">
    <Header title="项目统计大屏"></Header>
    <div class="project-body">
      <div class="project-body-left">
        <ScreenCard title="科室项目分布">
          <Echarts style="height: 23rem" :options="ecOptions.options1"></Echarts>
        </ScreenCard>
        <ScreenCard title="项目进展分析">
          <Echarts style="height: 23rem" :options="ecOptions.options2"></Echarts>
        </ScreenCard>
      </div>
      <div class="project-body-center">
        <div class="center-header">
          <div class="title">项目区域分布</div>
          <Total v-model="testData"></Total>
        </div>
        <div style="height: 35rem" class="map" ref="mapRef" id="map"></div>
        <div class="project-status">
          <Echarts style="height: 10rem" :options="ecOptions.options5"></Echarts>
          <Echarts style="height: 10rem" :options="ecOptions.options5"></Echarts>
          <Echarts style="height: 10rem" :options="ecOptions.options5"></Echarts>
        </div>
      </div>
      <div class="project-body-right">
        <ScreenCard title="大区统计">
          <Echarts style="height: 23rem" :options="ecOptions.options3"></Echarts>
        </ScreenCard>
        <ScreenCard title="领域分布">
          <Echarts style="height: 23rem" :options="ecOptions.options4"></Echarts>
        </ScreenCard>
      </div>
    </div>
  </LargeScreenMain>
</template>

<script setup lang="ts">
import Header from "@/components/commons/Header.vue"
import Echarts from "@/components/echarts/index.vue"
import ScreenCard from "@/components/commons/ScreenCard.vue"
import LargeScreenMain from "@/views/largeScreenMain/index.vue"
import Total from "@/components/commons/Total.vue"
import { onMounted, onUnmounted, reactive, ref } from "vue"
import * as echarts from "echarts"
import chinaData from "@/assets/geo/china.json"

import { pathSymbols, projectStatusPie, MAP_LEVEL } from "./constant"

const mapRef = ref()
const mapState = reactive<{
  ins?: echarts.EChartsType
  level?: MAP_LEVEL
  mapData?: any
}>({})

mapState.level = MAP_LEVEL.COUNTRY

const initMap = () => {
  if (mapRef.value) {
    // 初始化实例
    mapState.ins = echarts.init(mapRef.value)
    // 注册地图
    echarts.registerMap("china", chinaData as any)
    mapState.mapData = chinaData
    console.log(chinaData);
    
    // 绘制地图
    renderMap("china", [])
    // 绑定点击事件
    mapState.ins && mapState.ins.on("click", selectProvinces)
    // 解决第一次渲染 宽高问题
    setTimeout(() => {
      resize()
    }, 200)
  }
}

const testData = [
  { label: '区域项目总数', value: '554', unit: '单位'},
  { label: '区域在研项目数', value: '541', unit: '单位'},
  { label: '在研产品数', value: '897', unit: '单位'},
  { label: '区域客户数', value: '771', unit: '单位'},
  { label: '项目延期率', value: '21.3', unit: '%', color: '#FF0000'},
  { label: '一次开发成功率', value: '8.4', unit: '%', color: '#6DD400'},
]

const resize = () => {
  mapState.ins?.resize()
}

const selectProvinces = (params: any) => {
  const isCountry = mapState.level === MAP_LEVEL.COUNTRY
  // const isProvince = mapState.level === MAP_LEVEL.PROVINCE
  const isCity = mapState.level === MAP_LEVEL.CITY
  if (isCity) return
  const find = mapState.mapData.features.find(
    (item: any) => item.properties.name === params.name
  )

  if (find) {
    const folder = isCountry ? "province" : "city"
    import(`@/assets/geo/${folder}/${find.properties.id}`).then((res) => {
      mapState.mapData = res.default
      echarts.registerMap(find.properties.name, res.default as any)
      renderMap(find.properties.name, [])
      mapState.level = isCountry ? MAP_LEVEL.PROVINCE : MAP_LEVEL.CITY
      setTimeout(() => {
        resize()
      }, 200)
    })
  }
}

const renderMap = (map: string, data: any) => {
  let option = {}
  option = {
    // 地理坐标系组件
    geo: {
      type: 'map',
      map: map,
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
    series: [
      {
        type: "map",
        name: "china",
        map: map,
        tooltip: {
          show: true,
        },
        top: 10,
        bottom: 10,
        data: data,
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
        label: {
          show: true,
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: 13,
        },
      },
    ]
  }
  if (mapState.ins) {
    mapState.ins.setOption(option)
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

const ecOptions = reactive({
  options1: {
    tooltip: {},
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
      center:['50%','50%'],//上下距离
      radius: [0, '70%']//大小
    },
    series: [
      {
        type: "bar",
        data: [1, 2, 3, 4, 6, 7, 8, 9, 10],
        coordinateSystem: "polar",
        name: "故障",
        stack: "a",
        emphasis: {
          focus: "series",
        },
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
        emphasis: {
          focus: "series",
        },
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
  },
  options2: {
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
  },
  options3: {
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
      itemWidth: 14 ,
      itemHeight: 14 ,
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
  },
  options4: {
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
  },
  options5: projectStatusPie
})

onMounted(() => {
  initMap()
  window.addEventListener("resize", resize)
})

onUnmounted(() => {
  window.removeEventListener("resize", resize)
})
</script>
<style scoped lang="scss">
.project-screen {
  color: #ffffff;
  font-family: YouSheBiaoTiHei;
  background: url('~@/assets/images/project_bg.png') 100% 100% no-repeat;
  background-position: center;
  .project-body {
    width: 100%;
    display: flex;

    &-left {
      padding: 20px;
      width: 25%;
    }

    &-center {
      width: 50%;
      .center-header {
        margin: 0 auto;
        text-align: center;
        height: 6rem;
        width: 80%;
      }
      .map {
        height: 100%;
        width: 100%;
      }
      .project-status {
        display: flex;
        .echarts {
          flex: auto;
        }
      }
    }

    &-right {
      padding: 20px;
      width: 25%;
    }
  }
}
</style>
