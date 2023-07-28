<template>
  <LargeScreenMain class="project-screen">
    <Header title="项目统计大屏"></Header>
    <div class="project-body">
      <div class="project-body-left">
        <ScreenCard title="科室项目分布">
          <Echarts style="height: 23rem" :options="ecOptions.deptProjectOptions"></Echarts>
        </ScreenCard>
        <ScreenCard title="项目进展分析">
          <Echarts style="height: 23rem" :options="ecOptions.projectProgressOptions"></Echarts>
        </ScreenCard>
      </div>
      <div class="project-body-center">
        <div class="center-header">
          <div class="title">项目区域分布</div>
          <Total v-model="testData"></Total>
        </div>
        <div style="height: 35rem" class="map" ref="mapRef" id="map"></div>
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
import { onMounted, onUnmounted, reactive, ref } from "vue"
import * as echarts from "echarts"
import chinaData from "@/assets/geo/china.json"
import { MAP_LEVEL } from '@/constants/project'
import { areaStatisticsOptions, deptProjectOptions, domainAnalysisOptions, projectMapOptions, projectProgressOptions, projectStatusPie } from "@/constants/ecOptions"
import { setPieData } from "@/libs/utils/ehcarts"

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
  const option: any = projectMapOptions();
  option.series.data = data
  option.series.map = map
  option.geo.map = map
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

const pie1Config = [
  { name: '在研', color: '#4E66FA', innerColor: '#3D55E8' },
  { name: '挂起', color: '#DF4949', innerColor: '#C94040' },
  { name: '终止', color: '#46F9FF', innerColor: '#1DD2D8' },
  { name: '已完成', color: '#6DD400', innerColor: '#4A9400' }
]

const pie2Config = [
  { name: '特紧急', color: '#FFD264', innerColor: '#BC9A48' },
  { name: '三级', color: '#6DD400', innerColor: '#4A9400' },
  { name: '二级', color: '#46F9FF', innerColor: '#1DD2D8' },
  { name: '一级', color: '#4E66FA', innerColor: '#3D55E8' }
]
const pie3Config = [
  { name: '正常', color: '#4E66FA', innerColor: '#3D55E8' },
  { name: '预警', color: '#FFD264', innerColor: '#BC9A48' },
  { name: '延期', color: '#DF4949', innerColor: '#C94040' },
]


onMounted(() => {
  initMap()
  setPieData(ecOptions.projectStatusPie1, pie1Config, `区域项目\n总数状态\n分布`)
  setPieData(ecOptions.projectStatusPie2, pie2Config, `在研项目\n紧急度\n分布`)
  setPieData(ecOptions.projectStatusPie3, pie3Config, `在研项目\n预警状态\n分布`)
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
        height: 7rem;
        padding-top: 1rem;
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
