<template>
  <div ref="elRef" class="gantt-wrapper">
    <a-table :dataSource="props.list" :columns="props.columns" :pagination="false" :scroll="{y: `${state.tableHeight}`}">
      <template #bodyCell="{ column, record }">
        <template v-if="column.type === 'node_status'">
          <Legends :items="legends" v-model="record[column.key]"></Legends>
        </template>
      </template>
    </a-table>
    <div class="gantt-legends">
      <span>图例：</span>
      <Legends :items="legends" type="easy"></Legends>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import Legends from './legends.vue';

const props = defineProps(['list', 'columns'])

// const legends = [
//   { text: '完成/未延期', color: '#6DD400'},
//   { text: '进行中/将延期', color: '#8000F3'},
//   { text: '完成/延期', color: '#05E2EF'},
//   { text: '进行中/延期', color: '#FFAE12'},
//   { text: '进行中/未延期', color: '#0065F3'},
//   { text: '未开始/延期', color: '#FF0000'},
// ]
const legends = [
  { text: '未延期', color: '#6DD400'},
  { text: '将延期', color: '#FFAE12'},
  { text: '延期', color: '#a80407FF'},
]

const state = reactive({
  tableHeight: ''
})

const elRef = ref()
const resize = () => {
  setTimeout(() => {
    const height = elRef.value.clientHeight
    
    state.tableHeight = height - (Number(document.documentElement.style.fontSize.replace('px', '')) * 4) - 35 + 'px'
  }, 100);
}
onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>
<style scoped lang='scss'>
.gantt-wrapper {
  :deep(.ant-table-wrapper) {
    .ant-table {
      color: #fff;
      background: transparent;
      border: 1px solid #2276AD;
      th {
        padding: 8px 16px;
        background: transparent;
        background-image: linear-gradient(0deg, #132D52, #051220);
        color: #fff;
        border-bottom: 1px solid rgba(51, 95, 157, 0.5)!important;
        border-right: 1px solid rgba(51, 95, 157, 0.5)!important;
        &::before{
          background-color: transparent!important;
        }
      }
      .ant-table-row {
        &:hover {
          td {
            color: #4BDFFF;
          }
        }
        td {
          padding: 6px 16px;
          background-color: transparent!important;
          // border: 1px solid #142D46;
          border-top: 1px solid rgba(51, 95, 157, 0.5)!important;
          border-right: 1px solid rgba(51, 95, 157, 0.5)!important;
          border-radius: 0!important;
        }
        &:first-child {
          td {
            border-top: none!important;
          }
        }
        
        &:last-child {
          td{
            border-bottom: 1px solid #142D46!important;
          }
        }
        .ant-table-cell-row-hover {
          background-color: transparent!important;
        }
      }
      .ant-table-placeholder {
        &:hover{
          .ant-table-cell {
            background-color: transparent;
          }
        }
      }
    }
  }
  .gantt-legends {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }
}
</style>