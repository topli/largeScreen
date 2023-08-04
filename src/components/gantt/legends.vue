<template>
  <div class="gantt-legends-wrapper">
    <template v-if="type === 'easy'">
      <div :key="leg.text" v-for="leg in items" class="legend-easy" :style="{background: leg.color}">{{ leg.text }}</div>
    </template>
    <div class="legend-cell" v-else-if="props.modelValue && !isEmpty">
      <div class="legend-cell-bg" :style="{background: findItem.color}"></div>
      <div class="legend-cell-value" :style="{background: findItem.color}">
        {{  props.modelValue.cnt }}  
      </div>
      <div class="legend-cell-text">
        <a-tooltip>
          <template #title>{{ dateRange }}</template>
          {{ statusText }}
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import _ from 'lodash';
import { computed, ref } from 'vue';
import { unixDate } from '@/libs/filters'

const props = defineProps(['items', 'modelValue', 'type'])
const findItem = ref<any>({})

const isEmpty = _.isEmpty(props.modelValue)

if (props.items && props.items.length && props.modelValue) {
  findItem.value = props.items.find((item: any) => {
    return item.text === props.modelValue.delay
  })
}

const dateRange = computed(() => {
  return (props.modelValue.start_time ? unixDate(props.modelValue.start_time) : '')
    + ' 至 '
    + (props.modelValue.end_time ? unixDate(props.modelValue.end_time) : '')
})

const statusText = computed(() => {
  return (props.modelValue.state || '') + '/' + (props.modelValue.delay || '')
})
</script>
<style scoped lang='scss'>
@import '@/styles/mixins/common.scss';
.gantt-legends-wrapper {
  color: #fff;
  .legend-easy {
    display: inline-block;
    padding: 3px 10px;
    margin-right: 10px;
    border-radius: 20px;
  }
  .legend-cell {
    display: flex;
    position: relative;
    width: 100%;
    line-height: 20px;
    &-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.3;
      border-radius: 40px;
    }
    &-value {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      min-width: 36px;
    }
    &-text {
      @include ellipsis();
      padding: 8px 10px;
      text-align: center;
    }
  }
}
</style>