<template>
  <div class="echarts" ref="ecRef"></div>
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts'

const props = defineProps(['options'])

const ecRef = ref()

let ecIns: echarts.EChartsType;

const resize = () => {
  setTimeout(() => {
    ecIns?.resize()
  }, 100);
}

const init = () => {
  ecIns = echarts.init(ecRef.value)
}

const clear = () => {
  ecIns?.clear()
}

const setOption = (val: any) => {
  val && ecIns?.setOption(val, true)
}

onMounted(() => {
  init()
  setOption(props.options)
  resize()
  window.addEventListener('resize', resize)
})

watch(() => props.options, (val) => {
  clear()
  setOption(val)
}, { deep: true })

onUnmounted(() => {
  clear()
  window.removeEventListener('resize', resize)
})

</script>
<style lang='scss'>
.echarts {
  width: 100%;
  height: 100%;
}
</style>