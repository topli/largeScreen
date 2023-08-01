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
          <Total v-model="testData">
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
import { onMounted, onUnmounted, reactive, ref } from "vue"
import { useRouter } from 'vue-router'
import * as echarts from "echarts"
import chinaData from "@/assets/geo/china.json"
import { MAP_LEVEL } from '@/constants/project'
import { areaStatisticsOptions, deptProjectOptions, domainAnalysisOptions, pie1Config, pie2Config, pie3Config, projectMapOptions, projectProgressOptions, projectStatusPie } from "@/constants/ecOptions"
import { setPieData } from "@/libs/utils/ehcarts"
import { getDataText } from './service'

const routerIns = useRouter()


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
    renderMap("china", [{name:'新疆', value: {test1: 3,test2:1}}])
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
    import(`@/assets/geo/${folder}/${find.properties.id}`).then((res) => {
      setArea(find.properties, res.default)
      mapState.level = isCountry ? MAP_LEVEL.PROVINCE : MAP_LEVEL.CITY
      areaPaths.push({properties: { ...find.properties }, mapData: res.default })
    })

  }
}

const setArea = (properties: any, mapData: any) => {
  mapState.mapData = mapData
  echarts.registerMap(properties.name, mapData as any)
  renderMap(properties.name, [])
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
  }

}

const renderMap = (map: string, data: any) => {
  const option: any = projectMapOptions();
  option.series.data = data
  option.series.map = map
  option.geo.map = map

  option.tooltip.formatter = (params: any) => {
    const {name, data} = params
    return `${name}<br>项目数: ${data?.test1 || ''}<br>产品数：${data?.test2 || ''}`
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
  console.log(mapState);
  routerIns.push('/projectBoard')
}

const deptProjectRef = ref()

const deptProjectClick = (params: any) => {
  console.log(params);

  routerIns.push('/deptBoard')
  
}

onMounted(() => {
  getDataText({})
    .then(res => {
      console.log(res);
    })
    .catch(() => {})
  initMap()
  setPieData(ecOptions.projectStatusPie1, pie1Config, `区域项目\n总数状态\n分布`)
  setPieData(ecOptions.projectStatusPie2, pie2Config, `在研项目\n紧急度\n分布`)
  setPieData(ecOptions.projectStatusPie3, pie3Config, `在研项目\n预警状态\n分布`)

  deptProjectRef.value.getEcIns().on('click', deptProjectClick)

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
