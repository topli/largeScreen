<template>
  <LargeScreenMain class="project-screen">
    <Header title="项目统计大屏"></Header>
    <div class="project-body">
      <div class="project-body-left">
        <ScreenCard title="科室项目分布">
          <div style="height: 160px"></div>
        </ScreenCard>
        <ScreenCard title="项目进展分析">
          <div style="height: 160px"></div>
        </ScreenCard>
      </div>
      <div class="project-body-center">
        <div class="map" ref="mapRef" id="map"></div>
      </div>
      <div class="project-body-right">
        <ScreenCard title="大区统计">
          <div style="height: 160px"></div>
        </ScreenCard>
        <ScreenCard title="领域分布">
          <div style="height: 160px"></div>
        </ScreenCard>
      </div>
    </div>
  </LargeScreenMain>
</template>

<script setup lang="ts">
import Header from "@/components/commons/Header.vue"
import ScreenCard from "@/components/commons/ScreenCard.vue"
import LargeScreenMain from "@/views/largeScreenMain/index.vue"
import { onMounted, onUnmounted, reactive, ref } from "vue"
import * as echarts from "echarts"
import chinaData from "@/assets/geo/china.json"

const mapRef = ref()
const mapState = reactive<{
  ins?: echarts.EChartsType
}>({})

enum LEVEL {
  "COUNTRY" = "COUNTRY",
  "PROVINCE" = "PROVINCE",
  "CITY" = "CITY",
}

let curLevel = LEVEL.COUNTRY

const initMap = () => {
  if (mapRef.value) {
    //绘制地图
    mapState.ins = echarts.init(mapRef.value)
    // 注册地图
    echarts.registerMap("china", chinaData as any)
    // this.visualMapMax = maxa.length && Math.max(...maxa); // 获取最大值
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
  console.log(params);
  
  const find = chinaData.features.find(
    (item: any) => item.properties.name === params.name
  )
  if (find) {
    if (curLevel === LEVEL.COUNTRY) {
      import(`@/assets/geo/province/${find.properties.id}`).then((res) => {
        console.log(res)
        echarts.registerMap("china", res.default as any)
        renderMap(find.properties.id, [])
        curLevel = LEVEL.PROVINCE
        setTimeout(() => {
          resize()
        }, 200)
      })
    } else if (curLevel === LEVEL.PROVINCE) {
      import(`@/assets/geo/city/${find.properties.id}`).then((res) => {
        console.log(res)
        echarts.registerMap("china", res.default as any)
        renderMap(find.properties.id, [])
        curLevel = LEVEL.CITY
        resize()
      })
    }
  }
}

const renderMap = (map: string, data: any) => {
  let option = {}
  if (map === "china") {
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
      tooltip: {
        show: true,
        trigger: "item",
        formatter: function (params: any) {
          let value = params.value || 0
          return params.name + ":" + value
        },
        backgroundColor: "rgba(0, 26, 33, 0.68)",
        borderColor: "#01525b",
      },
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
              color: "#fff",
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
                  offset: 0.5,
                  color: "#3E4A62", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#131929", // 100% 处的颜色
                },
              ],
              global: true, // 缺省为 false
            },
          },
          // 鼠标经过
          emphasis: {
            itemStyle: {
              areaColor: "#465676",
              color: "#fff",
              borderWidth: 1,
              borderColor: "#97A5C2",
            },
          },
          label: {
            show: true,
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: 13,
          },
        },
      ],
    }
  }
  if (mapState.ins) {
    mapState.ins.setOption(option)
  }
}

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
