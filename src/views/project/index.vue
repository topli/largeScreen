<template>
  <LargeScreenMain class="project-screen">
    <Header title="项目统计大屏"></Header>
    <div class="project-body">
      <div class="project-body-left">
        <ScreenCard title="科室项目分布">
          <div style="height: 20rem">
            <Echarts :options="ecOptions.options1"></Echarts>
          </div>
        </ScreenCard>
        <ScreenCard title="项目进展分析">
          <div style="height: 20rem">
            <Echarts :options="ecOptions.options2"></Echarts>
          </div>
        </ScreenCard>
      </div>
      <div class="project-body-center">
        <div class="map" ref="mapRef" id="map"></div>
      </div>
      <div class="project-body-right">
        <ScreenCard title="大区统计">
          <div style="height: 20rem">
            <Echarts :options="ecOptions.options3"></Echarts>
          </div>
        </ScreenCard>
        <ScreenCard title="领域分布">
          <div style="height: 20rem">
            <Echarts :options="ecOptions.options4"></Echarts>
          </div>
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
import { onMounted, onUnmounted, reactive, ref } from "vue"
import * as echarts from "echarts"
import chinaData from "@/assets/geo/china.json"
import plane from '@/assets/images/plane.png';
import missile from '@/assets/images/missile.png';

import { MAP_LEVEL } from "./constant"

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
      map: map,
      tooltip: {
        show: false,
      },
      roam: false, // 禁用缩放
      animationDuration: 400,
      animationEasing: "cubicOut",
      animationDurationUpdate: 400,
      itemStyle: {
        borderColor: "#BEC2CC",
        borderWidth: 2,
        shadowColor: "#585C66",
        shadowOffsetX: 0,
        shadowOffsetY: 10,
        opacity: 1,
      },
    },
    // tooltip: {
    //   show: true,
    //   trigger: "item",
    //   formatter: function (params: any) {
    //     let value = params.value || 0
    //     return params.name + ":" + value
    //   },
    //   backgroundColor: "rgba(0, 26, 33, 0.68)",
    //   borderColor: "#01525b",
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
        nameMap: {
          china: "中国",
        },
        data: data,
        itemStyle: {
          // 每一块的样式
          label: {
            show: false,
            color: "rgba(255,255,255,0.6)",
            fontSize: 12,
          },
          color: "#fff",
          borderColor: "#BEC2CC",
          borderWidth: 0.5,
          areaColor: {
            type: "linear-gradient",
            x: 0,
            y: 1000,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 1,
                color: "#2F8CBD", // 0% 处的颜色
              },
              {
                offset: 0,
                color: "#035D84", // 100% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
        },
        // 鼠标经过
        emphasis: {
          label: {
            color: "rgba(255,255,255,0.6)",
          },
          itemStyle: {
            areaColor: "#15577C",
            borderWidth: 1,
            borderColor: "#97A5C2",
          },
        },
        select: {
          label: {
            color: "rgba(255,255,255,0.6)",
          },
          itemStyle: {
            areaColor: "#15577C",
            borderWidth: 1,
            borderColor: "#97A5C2",
          },
        },
        label: {
          show: true,
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: 13,
        },
      },
    ],
  }
  if (mapState.ins) {
    mapState.ins.setOption(option)
  }
}
const pathSymbols = {
  plane: plane,
  missile: missile,
  train:
    'path://M67.335,33.596L67.335,33.596c-0.002-1.39-1.153-3.183-3.328-4.218h-9.096v-2.07h5.371 c-4.939-2.07-11.199-4.141-14.89-4.141H19.72v12.421v5.176h38.373c4.033,0,8.457-1.035,9.142-5.176h-0.027 c0.076-0.367,0.129-0.751,0.129-1.165L67.335,33.596L67.335,33.596z M27.999,30.413h-3.105v-4.141h3.105V30.413z M35.245,30.413 h-3.104v-4.141h3.104V30.413z M42.491,30.413h-3.104v-4.141h3.104V30.413z M49.736,30.413h-3.104v-4.141h3.104V30.413z  M14.544,40.764c1.143,0,2.07-0.927,2.07-2.07V35.59V25.237c0-1.145-0.928-2.07-2.07-2.07H-9.265c-1.143,0-2.068,0.926-2.068,2.07 v10.351v3.105c0,1.144,0.926,2.07,2.068,2.07H14.544L14.544,40.764z M8.333,26.272h3.105v4.141H8.333V26.272z M1.087,26.272h3.105 v4.141H1.087V26.272z M-6.159,26.272h3.105v4.141h-3.105V26.272z M-9.265,41.798h69.352v1.035H-9.265V41.798z',
  ship: 'path://M16.678,17.086h9.854l-2.703,5.912c5.596,2.428,11.155,5.575,16.711,8.607c3.387,1.847,6.967,3.75,10.541,5.375 v-6.16l-4.197-2.763v-5.318L33.064,12.197h-11.48L20.43,15.24h-4.533l-1.266,3.286l0.781,0.345L16.678,17.086z M49.6,31.84 l0.047,1.273L27.438,20.998l0.799-1.734L49.6,31.84z M33.031,15.1l12.889,8.82l0.027,0.769L32.551,16.1L33.031,15.1z M22.377,14.045 h9.846l-1.539,3.365l-2.287-1.498h1.371l0.721-1.352h-2.023l-0.553,1.037l-0.541-0.357h-0.34l0.359-0.684h-2.025l-0.361,0.684 h-3.473L22.377,14.045z M23.695,20.678l-0.004,0.004h0.004V20.678z M24.828,18.199h-2.031l-0.719,1.358h2.029L24.828,18.199z  M40.385,34.227c-12.85-7.009-25.729-14.667-38.971-12.527c1.26,8.809,9.08,16.201,8.213,24.328 c-0.553,4.062-3.111,0.828-3.303,7.137c15.799,0,32.379,0,48.166,0l0.066-4.195l1.477-7.23 C50.842,39.812,45.393,36.961,40.385,34.227z M13.99,35.954c-1.213,0-2.195-1.353-2.195-3.035c0-1.665,0.98-3.017,2.195-3.017 c1.219,0,2.195,1.352,2.195,3.017C16.186,34.604,15.213,35.954,13.99,35.954z M23.691,20.682h-2.02l-0.588,1.351h2.023 L23.691,20.682z M19.697,18.199l-0.721,1.358h2.025l0.727-1.358H19.697z',
  car: 'path://M49.592,40.883c-0.053,0.354-0.139,0.697-0.268,0.963c-0.232,0.475-0.455,0.519-1.334,0.475 c-1.135-0.053-2.764,0-4.484,0.068c0,0.476,0.018,0.697,0.018,0.697c0.111,1.299,0.697,1.342,0.931,1.342h3.7 c0.326,0,0.628,0,0.861-0.154c0.301-0.196,0.43-0.772,0.543-1.78c0.017-0.146,0.025-0.336,0.033-0.56v-0.01 c0-0.068,0.008-0.154,0.008-0.25V41.58l0,0C49.6,41.348,49.6,41.09,49.592,40.883L49.592,40.883z M6.057,40.883 c0.053,0.354,0.137,0.697,0.268,0.963c0.23,0.475,0.455,0.519,1.334,0.475c1.137-0.053,2.762,0,4.484,0.068 c0,0.476-0.018,0.697-0.018,0.697c-0.111,1.299-0.697,1.342-0.93,1.342h-3.7c-0.328,0-0.602,0-0.861-0.154 c-0.309-0.18-0.43-0.772-0.541-1.78c-0.018-0.146-0.027-0.336-0.035-0.56v-0.01c0-0.068-0.008-0.154-0.008-0.25V41.58l0,0 C6.057,41.348,6.057,41.09,6.057,40.883L6.057,40.883z M49.867,32.766c0-2.642-0.344-5.224-0.482-5.507 c-0.104-0.207-0.766-0.749-2.271-1.773c-1.522-1.042-1.487-0.887-1.766-1.566c0.25-0.078,0.492-0.224,0.639-0.241 c0.326-0.034,0.345,0.274,1.023,0.274c0.68,0,2.152-0.18,2.453-0.48c0.301-0.303,0.396-0.405,0.396-0.672 c0-0.268-0.156-0.818-0.447-1.146c-0.293-0.327-1.541-0.49-2.273-0.585c-0.729-0.095-0.834,0-1.022,0.121 c-0.304,0.189-0.32,1.919-0.32,1.919l-0.713,0.018c-0.465-1.146-1.11-3.452-2.117-5.269c-1.103-1.979-2.256-2.599-2.737-2.754 c-0.474-0.146-0.904-0.249-4.131-0.576c-3.298-0.344-5.922-0.388-8.262-0.388c-2.342,0-4.967,0.052-8.264,0.388 c-3.229,0.336-3.66,0.43-4.133,0.576s-1.633,0.775-2.736,2.754c-1.006,1.816-1.652,4.123-2.117,5.269L9.87,23.109 c0,0-0.008-1.729-0.318-1.919c-0.189-0.121-0.293-0.225-1.023-0.121c-0.732,0.104-1.98,0.258-2.273,0.585 c-0.293,0.327-0.447,0.878-0.447,1.146c0,0.267,0.094,0.379,0.396,0.672c0.301,0.301,1.773,0.48,2.453,0.48 c0.68,0,0.697-0.309,1.023-0.274c0.146,0.018,0.396,0.163,0.637,0.241c-0.283,0.68-0.24,0.524-1.764,1.566 c-1.506,1.033-2.178,1.566-2.271,1.773c-0.139,0.283-0.482,2.865-0.482,5.508s0.189,5.02,0.189,5.86c0,0.354,0,0.976,0.076,1.565 c0.053,0.354,0.129,0.697,0.268,0.966c0.232,0.473,0.447,0.516,1.334,0.473c1.137-0.051,2.779,0,4.477,0.07 c1.135,0.043,2.297,0.086,3.33,0.11c2.582,0.051,1.826-0.379,2.928-0.36c1.102,0.016,5.447,0.196,9.424,0.196 c3.976,0,8.332-0.182,9.423-0.196c1.102-0.019,0.346,0.411,2.926,0.36c1.033-0.018,2.195-0.067,3.332-0.11 c1.695-0.062,3.348-0.121,4.477-0.07c0.886,0.043,1.103,0,1.332-0.473c0.132-0.269,0.218-0.611,0.269-0.966 c0.086-0.592,0.078-1.213,0.078-1.565C49.678,37.793,49.867,35.408,49.867,32.766L49.867,32.766z M13.219,19.735 c0.412-0.964,1.652-2.9,2.256-3.244c0.145-0.087,1.426-0.491,4.637-0.706c2.953-0.198,6.217-0.276,7.73-0.276 c1.513,0,4.777,0.078,7.729,0.276c3.201,0.215,4.502,0.611,4.639,0.706c0.775,0.533,1.842,2.28,2.256,3.244 c0.412,0.965,0.965,2.858,0.861,3.116c-0.104,0.258,0.104,0.388-1.291,0.275c-1.387-0.103-10.088-0.216-14.185-0.216 c-4.088,0-12.789,0.113-14.184,0.216c-1.395,0.104-1.188-0.018-1.291-0.275C12.254,22.593,12.805,20.708,13.219,19.735 L13.219,19.735z M16.385,30.511c-0.619,0.155-0.988,0.491-1.764,0.482c-0.775,0-2.867-0.353-3.314-0.371 c-0.447-0.017-0.842,0.302-1.076,0.362c-0.23,0.06-0.688-0.104-1.377-0.318c-0.688-0.216-1.092-0.155-1.316-1.094 c-0.232-0.93,0-2.264,0-2.264c1.488-0.068,2.928,0.069,5.621,0.826c2.693,0.758,4.191,2.213,4.191,2.213 S17.004,30.357,16.385,30.511L16.385,30.511z M36.629,37.293c-1.23,0.164-6.386,0.207-8.794,0.207c-2.412,0-7.566-0.051-8.799-0.207 c-1.256-0.164-2.891-1.67-1.764-2.865c1.523-1.627,1.24-1.576,4.701-2.023C24.967,32.018,27.239,32,27.834,32 c0.584,0,2.865,0.025,5.859,0.404c3.461,0.447,3.178,0.396,4.699,2.022C39.521,35.623,37.887,37.129,36.629,37.293L36.629,37.293z  M48.129,29.582c-0.232,0.93-0.629,0.878-1.318,1.093c-0.688,0.216-1.145,0.371-1.377,0.319c-0.231-0.053-0.627-0.371-1.074-0.361 c-0.448,0.018-2.539,0.37-3.313,0.37c-0.772,0-1.146-0.328-1.764-0.481c-0.621-0.154-0.966-0.154-0.966-0.154 s1.49-1.464,4.191-2.213c2.693-0.758,4.131-0.895,5.621-0.826C48.129,27.309,48.361,28.643,48.129,29.582L48.129,29.582z',
  run: 'path://M13.676,32.955c0.919-0.031,1.843-0.008,2.767-0.008v0.007c0.827,0,1.659,0.041,2.486-0.019 c0.417-0.028,1.118,0.325,1.14-0.545c0.014-0.637-0.156-1.279-0.873-1.367c-1.919-0.241-3.858-0.233-5.774,0.019 c-0.465,0.062-0.998,0.442-0.832,1.069C12.715,32.602,13.045,32.977,13.676,32.955z M14.108,29.013 c1.47-0.007,2.96-0.122,4.414,0.035c1.792,0.192,3.1-0.412,4.273-2.105c-3.044,0-5.882,0.014-8.719-0.01 c-0.768-0.005-1.495,0.118-1.461,1C12.642,28.731,13.329,29.014,14.108,29.013z M23.678,36.593c-0.666-0.69-1.258-1.497-2.483-1.448 c-2.341,0.095-4.689,0.051-7.035,0.012c-0.834-0.014-1.599,0.177-1.569,1.066c0.031,0.854,0.812,1.062,1.636,1.043 c1.425-0.033,2.852-0.01,4.278-0.01v-0.01c1.562,0,3.126,0.008,4.691-0.005C23.614,37.239,24.233,37.174,23.678,36.593z  M32.234,42.292h-0.002c-1.075,0.793-2.589,0.345-3.821,1.048c-0.359,0.193-0.663,0.465-0.899,0.799 c-1.068,1.623-2.052,3.301-3.117,4.928c-0.625,0.961-0.386,1.805,0.409,2.395c0.844,0.628,1.874,0.617,2.548-0.299 c1.912-2.573,3.761-5.197,5.621-7.814C33.484,42.619,33.032,42.387,32.234,42.292z M43.527,28.401 c-0.688-1.575-2.012-0.831-3.121-0.895c-1.047-0.058-2.119,1.128-3.002,0.345c-0.768-0.677-1.213-1.804-1.562-2.813 c-0.45-1.305-1.495-2.225-2.329-3.583c2.953,1.139,4.729,0.077,5.592-1.322c0.99-1.61,0.718-3.725-0.627-4.967 c-1.362-1.255-3.414-1.445-4.927-0.452c-1.933,1.268-2.206,2.893-0.899,6.11c-2.098-0.659-3.835-1.654-5.682-2.383 c-0.735-0.291-1.437-1.017-2.293-0.666c-2.263,0.927-4.522,1.885-6.723,2.95c-1.357,0.658-1.649,1.593-1.076,2.638 c0.462,0.851,1.643,1.126,2.806,0.617c0.993-0.433,1.994-0.857,2.951-1.374c1.599-0.86,3.044-0.873,4.604,0.214 c1.017,0.707,0.873,1.137,0.123,1.849c-1.701,1.615-3.516,3.12-4.933,5.006c-1.042,1.388-0.993,2.817,0.255,4.011 c1.538,1.471,3.148,2.869,4.708,4.315c0.485,0.444,0.907,0.896-0.227,1.104c-1.523,0.285-3.021,0.694-4.538,1.006 c-1.109,0.225-2.02,1.259-1.83,2.16c0.223,1.07,1.548,1.756,2.687,1.487c3.003-0.712,6.008-1.413,9.032-2.044 c1.549-0.324,2.273-1.869,1.344-3.115c-0.868-1.156-1.801-2.267-2.639-3.445c-1.964-2.762-1.95-2.771,0.528-5.189 c1.394-1.357,1.379-1.351,2.437,0.417c0.461,0.769,0.854,1.703,1.99,1.613c2.238-0.181,4.407-0.755,6.564-1.331 C43.557,30.447,43.88,29.206,43.527,28.401z',
  walk: 'path://M29.902,23.275c1.86,0,3.368-1.506,3.368-3.365c0-1.859-1.508-3.365-3.368-3.365 c-1.857,0-3.365,1.506-3.365,3.365C26.537,21.769,28.045,23.275,29.902,23.275z M36.867,30.74c-1.666-0.467-3.799-1.6-4.732-4.199 c-0.932-2.6-3.131-2.998-4.797-2.998s-7.098,3.894-7.098,3.894c-1.133,1.001-2.1,6.502-0.967,6.769 c1.133,0.269,1.266-1.533,1.934-3.599c0.666-2.065,3.797-3.466,3.797-3.466s0.201,2.467-0.398,3.866 c-0.599,1.399-1.133,2.866-1.467,6.198s-1.6,3.665-3.799,6.266c-2.199,2.598-0.6,3.797,0.398,3.664 c1.002-0.133,5.865-5.598,6.398-6.998c0.533-1.397,0.668-3.732,0.668-3.732s0,0,2.199,1.867c2.199,1.865,2.332,4.6,2.998,7.73 s2.332,0.934,2.332-0.467c0-1.401,0.269-5.465-1-7.064c-1.265-1.6-3.73-3.465-3.73-5.265s1.199-3.732,1.199-3.732 c0.332,1.667,3.335,3.065,5.599,3.399C38.668,33.206,38.533,31.207,36.867,30.74z'
};
const ecOptions = reactive({
  options1: {
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
    polar: {},
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
      right: 0,
    },
  },
  options2: {
    color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
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
      icon: "rect",
      textStyle: {
        color: "#fff",
      },
      data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
    },
    grid: {
      top: "50",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
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
        emphasis: {
          focus: "series",
        },
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
        emphasis: {
          focus: "series",
        },
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
        emphasis: {
          focus: "series",
        },
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
        emphasis: {
          focus: "series",
        },
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
        emphasis: {
          focus: "series",
        },
        data: [220, 302, 181, 234, 210, 290, 150],
      },
    ],
  },
  options3: {
    grid: {
      top: 60,
      bottom: 40,
      textStyle: {
        color: "#fff",
      },
    },
    legend: {
      top: "3%",
      textStyle: {
        color: "#fff",
      },
      data: ["完成", "进行", "延期", '项目总数'],
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
        barMaxWidth: 35,
        barGap: "10%",
        data: [
          709, 1917, 2455, 2610
        ],
      },

      {
        name: "进行",
        type: "bar",
        stack: "总量",
        data: [327, 1776, 507, 1200],
      },
      {
        name: "延期",
        type: "bar",
        stack: "总量",
        data: [27, 176, 57, 120],
      },
      {
        name: "项目总数",
        type: "line",
        data: [
          1036, 3693, 2962, 3810
        ],
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
      data: ['驯鹿', '火箭', '飞机', '高铁', '轮船', '汽车', '跑步', '步行'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: '#e54035'
      }
    },
    yAxis: {
      splitLine: { show: false },
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
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(0,241,255,0)'
              },
              {
                offset: 1,
                color: '#00F1FF'
              }
            ])
          }
        }
          , {
            value: 60,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(109,212,0,0)'
              },
              {
                offset: 1,
                color: '#6DD400'
              }
            ])
          }

          }, 25, 18, 12, 9, 2, 1],
        z: 10
      },
      {
        name: 'glyph',
        type: 'pictorialBar',
        barGap: '-100%',
        symbolPosition: 'end',
        symbolOffset: [0, '-120%'],
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
            value: 25,
            symbol: pathSymbols.plane,
            symbolSize: [65, 35]
          },
          {
            value: 18,
            symbol: pathSymbols.train,
            symbolSize: [50, 30]
          },
          {
            value: 12,
            symbol: pathSymbols.ship,
            symbolSize: [50, 35]
          },
          {
            value: 9,
            symbol: pathSymbols.car,
            symbolSize: [40, 30]
          },
          {
            value: 2,
            symbol: pathSymbols.run,
            symbolSize: [40, 50]
          },
          {
            value: 1,
            symbol: pathSymbols.walk,
            symbolSize: [40, 50]
          }
        ]
      }
    ]
  }
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

  .project-body {
    width: 100%;
    display: flex;

    &-left {
      padding: 20px;
      width: 25%;
    }

    &-center {
      display: flex;
      width: 50%;

      .map {
        height: 100%;
        width: 100%;
      }
    }

    &-right {
      padding: 20px;
      width: 25%;
    }
  }
}
</style>
