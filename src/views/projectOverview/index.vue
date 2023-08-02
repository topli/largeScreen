<template>
  <LargeScreenMain class="project-screen">
    <Header title="项目统计大屏"></Header>
    <div class="project-body">
      <div class="project-body-left">
        <ScreenCard title="科室项目分布">
          <Echarts ref="deptProjectRef" style="height: 23rem" :options="ecOptions.deptProjectOptions"></Echarts>
        </ScreenCard>
        <ScreenCard title="项目进展分析">
          <Echarts style="height: 23rem" :options="ecOptions.projectProgressOptions"></Echarts>
        </ScreenCard>
      </div>
      <div class="project-body-center">
        <div class="top-title">项目区域分布</div>
        <div class="center-header">
          <Total v-model="totalData.totalItems">
            <div class="to-detail">
              <a-tooltip title="查看详情">
                <img src="~@/assets/images/to_detail.png" @click="toDetail">
              </a-tooltip>
            </div>
          </Total>
        </div>
        <div style="height: 35rem" class="map-wrapper">
          <div ref="mapRef" id="map" class="map"></div>
          <div class="back-map" v-if="mapState.level !== MAP_LEVEL.COUNTRY">
            <a-tooltip title="返回">
              <img src="~@/assets/images/back_map.png" @click="backMap">
            </a-tooltip>
          </div>
        </div>
        <div class="project-status">
          <Echarts style="height: 10rem" :options="ecOptions.projectStatusPie1"></Echarts>
          <Echarts style="height: 10rem" :options="ecOptions.projectStatusPie2"></Echarts>
          <Echarts style="height: 10rem" :options="ecOptions.projectStatusPie3"></Echarts>
        </div>
      </div>
      <div class="project-body-right">
        <ScreenCard title="大区统计">
          <Echarts style="height: 23rem" :options="ecOptions.areaStatisticsOptions"></Echarts>
        </ScreenCard>
        <ScreenCard title="领域分布">
          <Echarts style="height: 23rem" :options="ecOptions.domainAnalysisOptions"></Echarts>
        </ScreenCard>
      </div>
    </div>
  </LargeScreenMain>
</template>

<script setup lang="ts">
import Header from "@/components/commons/Header.vue"
import Echarts from "@/components/echarts/index.vue"
import ScreenCard from "@/components/commons/ScreenCard.vue"
import LargeScreenMain from "@/components/largeScreenMain/index.vue"
import Total from "@/components/commons/Total.vue"
import _ from "lodash"
import { onMounted, onUnmounted, reactive, ref } from "vue"
import { useRouter } from 'vue-router'
import * as echarts from "echarts"
import chinaData from "@/assets/geo/china.json"
import { MAP_LEVEL, TotalItem } from '@/constants/project'
import { areaStatisticsOptions, deptProjectOptions, domainAnalysisOptions, pie1Config, pie2Config, pie3Config, PieItem, projectMapOptions, projectProgressOptions, projectStatusPie, pathSymbols } from "@/constants/ecOptions"
import { setPieData } from "@/libs/utils/ehcarts"
import { getMapData, getProjectOtherReport } from './service'
// 获取所有地图边界数据
const modules = import.meta.glob('@/assets/geo/**/*.json')

const routerIns = useRouter()

const mapRef = ref()
const mapState = reactive<{
  ins?: echarts.EChartsType
  level?: MAP_LEVEL
  mapData?: any,
  projectData?: any,
}>({})

const totalData = reactive<{
  totalItems: Array<TotalItem>
}>({
  totalItems: [
    { label: '区域项目总数', value: '0', unit: '单位'},
    { label: '区域在研项目数', value: '0', unit: '单位'},
    { label: '在研产品数', value: '0', unit: '单位'},
    { label: '区域客户数', value: '0', unit: '单位'},
    { label: '项目延期率', value: '0', unit: '%', color: '#FF0000'},
    { label: '一次开发成功率', value: '0', unit: '%', color: '#6DD400'},
  ]
})
mapState.level = MAP_LEVEL.COUNTRY

const initMap = () => {
  if (mapRef.value) {
    // 初始化实例
    mapState.ins = echarts.init(mapRef.value)
    // 注册地图
    echarts.registerMap("china", chinaData as any)
    mapState.mapData = chinaData
    // 绘制地图
    renderMap("china", mapState.projectData)
    areaPaths = []
    areaPaths[0] = {properties:{ name: 'china' }, mapData: chinaData}
    // 绑定点击事件
    mapState.ins && mapState.ins.on("click", selectArea)
    // 解决第一次渲染 宽高问题
    setTimeout(() => {
      resize()
    }, 200)
  }
}

const initData = () => {
    // 点图点击事件
    deptProjectRef.value.getEcIns().on('click', deptProjectClick)
    // 设置饼图数据
    setPieData(ecOptions.projectStatusPie1, pie1Config, `区域项目\n总数状态\n分布`)
    setPieData(ecOptions.projectStatusPie2, pie2Config, `在研项目\n紧急度\n分布`)
    setPieData(ecOptions.projectStatusPie3, pie3Config, `在研项目\n预警状态\n分布`)
}

const resize = () => {
  mapState.ins?.resize()
}

let areaPaths: any = []

const selectArea = (params: any) => {
  // 判断当前区域等级
  const isCountry = mapState.level === MAP_LEVEL.COUNTRY
  // const isProvince = mapState.level === MAP_LEVEL.PROVINCE
  const isCity = mapState.level === MAP_LEVEL.CITY
  // 当前区域是城市不往下查询区域
  if (isCity) return
  // 查找当前点击区域的数据
  const find = mapState.mapData.features.find(
    (item: any) => item.properties.name === params.name
  )

  if (find) {
    const folder = isCountry ? "province" : "city"
    modules[`/src/assets/geo/${folder}/${find.properties.id}.json`]().then((res: any) => {
      mapState.level = isCountry ? MAP_LEVEL.PROVINCE : MAP_LEVEL.CITY
      setArea(find.properties, res.default)
      areaPaths.push({properties: { ...find.properties }, mapData: res.default })
    })

  }
}

const setArea = (properties: any, mapData: any) => {
  mapState.mapData = mapData
  echarts.registerMap(properties.name, mapData as any)

  getProjectNumTotal(properties.name)
  setTimeout(() => {
    resize()
  }, 200)
}

const backMap = () => {
  areaPaths.pop()
  if (areaPaths.length > 1) {
    const data = areaPaths[areaPaths.length - 1]
    setArea(data.properties, data.mapData)
    if (mapState.level === MAP_LEVEL.CITY) {
      mapState.level = MAP_LEVEL.PROVINCE
    }
  } else {
    mapState.level = MAP_LEVEL.COUNTRY
    initMap()
    getProjectNumTotal()
  }

}

const renderMap = (map: string, data: any) => {
  const option: any = projectMapOptions();
  option.series.data = data
  option.series.map = map
  option.geo.map = map

  option.tooltip.formatter = (params: any) => {
    const { name } = params
    const { run_product, custom_num } = params.data || {}
    return `${name}<br>项目数： ${run_product || '0'}<br>产品数：${custom_num || '0'}`
  }

  if (mapState.ins) {
    mapState.ins.setOption(option)
  }
}

const ecOptions = reactive({
  deptProjectOptions: deptProjectOptions(),
  projectProgressOptions: projectProgressOptions(),
  areaStatisticsOptions: areaStatisticsOptions(),
  domainAnalysisOptions: domainAnalysisOptions(),
  projectStatusPie1: projectStatusPie(),
  projectStatusPie2: projectStatusPie(),
  projectStatusPie3: projectStatusPie()
})
const toDetail = () => {
  // cur_level 当前区域类型   0国 1省 2市
  const routeData = routerIns.resolve({ path: '/projectBoard', query: {cur_level: areaPaths.length, ...areaPaths[areaPaths.length - 1].properties} });
  window.open(routeData.href, '_blank');
}

const deptProjectRef = ref()

const deptProjectClick = (params: any) => {
  routerIns.push({path: '/deptBoard', params})
}
const pie1: Array<PieItem> = _.cloneDeep(pie1Config)
const pie2: Array<PieItem> = _.cloneDeep(pie2Config)
const pie3: Array<PieItem> = _.cloneDeep(pie3Config)

  
onMounted(() => {
  // 初始化地图
  initMap()
  // 初始化其他数据
  initData()
  // 获取地图数据
  getProjectNumTotal()
  // 获取其他报表数据
  getOtherReport()
  window.addEventListener("resize", resize)
})


const getProjectNumTotal = (areaName?: string) => {
  // 判断当前区域等级
  const isCountry = mapState.level === MAP_LEVEL.COUNTRY
  const isProvince = mapState.level === MAP_LEVEL.PROVINCE
  const isCity = mapState.level === MAP_LEVEL.CITY
  let type = null
  if (isCountry) type = null
  if (isProvince) type = 1
  if (isCity) type = 2
  // 直辖市 type传2
  if (['上海', '北京', '天津', '重庆'].includes(areaName ?? '')) {
    type = 2
  }
  getMapData({type, value: areaName})
    .then(res => {
      const { reportData, zoneData, zoneProjectData } = res.data || {}
      if (reportData) {
        totalData.totalItems[0].value = reportData.project_num || 0
        totalData.totalItems[1].value = reportData.run_project || 0
        totalData.totalItems[2].value = reportData.run_product || 0
        totalData.totalItems[3].value = reportData.custom_num || 0
        totalData.totalItems[4].value = reportData.project_delay_rate || 0
        totalData.totalItems[5].value = reportData.once_product_rate || 0
      }

      pie1.map(item => {
        item.value = reportData.project_state[item.key] || 0
      })
      pie2.map(item => {
        item.value = reportData.project_urgent_state[item.key] || 0
      })
      pie3.map(item => {
        item.value = reportData.project_warn_state[item.key] || 0
      })
      if (!areaName && !_.isEmpty(zoneData)) {
        const keys = Object.keys(zoneData)
        ecOptions.areaStatisticsOptions.xAxis[0].data = []
        ecOptions.areaStatisticsOptions.series[0].data = []
        ecOptions.areaStatisticsOptions.series[1].data = []
        ecOptions.areaStatisticsOptions.series[2].data = []
        ecOptions.areaStatisticsOptions.series[3].data = []
        keys.forEach((key: string) => {
          const item = zoneData[key]
          ecOptions.areaStatisticsOptions.xAxis[0].data.push(key)

          ecOptions.areaStatisticsOptions.series[0].data.push(item.completed)
          ecOptions.areaStatisticsOptions.series[1].data.push(item.running)
          ecOptions.areaStatisticsOptions.series[2].data.push(item.suspend)
          ecOptions.areaStatisticsOptions.series[3].data.push(item.sum)
        })
      }
      const projectMapData: any = []
      if (zoneProjectData) {
        const keys = Object.keys(zoneProjectData)
        keys.forEach((key: string) => {
          projectMapData.push({
            name: key,
            ...zoneProjectData[key]
          })
        })
      }
      
      renderMap(areaName || 'china', projectMapData)
      // 设置饼图数据
      setPieData(ecOptions.projectStatusPie1, pie1, `区域项目\n总数状态\n分布`)
      setPieData(ecOptions.projectStatusPie2, pie2, `在研项目\n紧急度\n分布`)
      setPieData(ecOptions.projectStatusPie3, pie3, `在研项目\n预警状态\n分布`)
    })
    .catch(() => {
      renderMap(areaName || 'china', [])
    })
}

const getOtherReport = () => {
  getProjectOtherReport().then(res => {
    console.log(res);
    const { departmentData, processData, sectorData } = res.data || {}
    // 处理科室数据
    if (departmentData && !_.isEmpty(departmentData)) {
      const keys = Object.keys(departmentData)
      ecOptions.deptProjectOptions.angleAxis.data = _.cloneDeep(keys)
      const series = []
      series[0] = keys.map(key => departmentData[key].delay)
      series[1] = keys.map(key => departmentData[key].completed)
      ecOptions.deptProjectOptions.series[0].data = series[0]
      ecOptions.deptProjectOptions.series[1].data = series[1]
    }
    // 处理节点进程数据
    if (processData && !_.isEmpty(processData)) {
      const xData = []
      const legend = ['评估', '方案', '设计', '流片', '测试', '送样', '标准']
      const data: any = [[], [], [], [], [], [], []]

      const series = []
      for (let i = 0; i < processData.length; i++) {
        const item = processData[i];
        xData.push(item.text)
        data[0].push(item.value?.assess)
        data[1].push(item.value?.plan)
        data[2].push(item.value?.design)
        data[3].push(item.value?.respin)
        data[4].push(item.value?.test)
        data[5].push(item.value?.sample)
        data[6].push(item.value?.standar)
      }
      for (let i = 0; i < legend.length; i++) {
        const leg = legend[i];
        series.push(
          {
            name: leg,
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 2,
            },
            showSymbol: false,
            data: data[i],
          }
        )
      }
      ecOptions.projectProgressOptions.legend.data = legend
      ecOptions.projectProgressOptions.xAxis[0].data = xData
      ecOptions.projectProgressOptions.series = series
    }

    // 处理领域数据
    if (sectorData && !_.isEmpty(sectorData)) {
      const data: { [key: string]: any } = {
        machine: { name: '飞机', icon: pathSymbols.plane },
        elastic: { name: '导弹', icon: pathSymbols.plane },
        ship: { name: '轮船', icon: pathSymbols.ship },
        star: { name: '卫星', icon: pathSymbols.plane },
        ground: { name: '地面', icon: pathSymbols.plane },
        vehicle: { name: '车载', icon: pathSymbols.plane },
        army: { name: '单兵', icon: pathSymbols.plane },
        meter: { name: '仪器', icon: pathSymbols.plane },
        replace: { name: '国产', icon: pathSymbols.plane }
      }
      const series: any[] = []
      Object.keys(data).forEach((key: string) => {
        const item = data[key];
        series.push({
          name: item.name,
          value: sectorData[key],
          symbol: 'image://' + pathSymbols[key],
          symbolSize: [24, 24]
        })
      })
      series.sort((a, b) => {
        return a.value - b.value
      })
      console.log(series);
      ecOptions.domainAnalysisOptions.xAxis.data = series.map(item => item.name)
      ecOptions.domainAnalysisOptions.series = series
    }
  })
}


onUnmounted(() => {
  window.removeEventListener("resize", resize)
})
</script>
<style scoped lang="scss">
.project-screen {
  color: #ffffff;
  font-family: YouSheBiaoTiHei;
  background: url('@/assets/images/project_bg.png') 100% 100% no-repeat;
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
      .top-title {
        padding: 0.6rem 0 0.2rem 0;
        text-align: center;
      }
      .center-header {
        position: relative;
        display: flex;
        margin: 0 auto;
        align-items: center;
        justify-content: center;
        height: 5rem;
        .to-detail {
          display: flex;
          align-items: flex-end;
          padding: 0.8rem 0;
          img {
            cursor: pointer;
          }
        }
      }
      .map-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        .map {
          height: 100%;
          width: 100%;
        }
        .back-map {
          position: absolute;
          right: 1rem;
          top: 0;
          width: 1.5rem;
          height: 1.5rem;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
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
