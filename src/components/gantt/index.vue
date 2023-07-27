<template>
  <div ref="elRef" class="gantt-wrapper">
    <a-table :dataSource="data" :columns="columns" :pagination="false" :scroll="{y: `${state.tableHeight}`}">
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
const columns = [
  {
    title: '设计师',
    dataIndex: 'name',
    key: 'name',
    width: 120
  },
  {
    title: '项目背景',
    dataIndex: 'age',
    key: 'age',
    width: 120
  },
  {
    title: '产品名称',
    dataIndex: 'address',
    key: 'address',
    width: 120
  },
  {
    title: '单位简称',
    key: 'tags',
    dataIndex: 'tags',
    width: 120
  },
  {
    title: '紧急度',
    key: 'action',
    width: 120
  },
  {
    title: '难度',
    key: 'action',
    width: 120
  },
  {
    title: '评估',
    key: 'node_status',
    type: 'node_status'
  },
  {
    title: '方案',
    key: 'node_status1',
    type: 'node_status'
  },
  {
    title: '设计',
    key: 'action',
  },
  {
    title: '测试',
    key: 'action',
  },
  {
    title: '标准',
    key: 'action',
  },
];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
    node_status: 1,
    node_status1: 3
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    node_status: 1,
    node_status1: 4,
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    node_status: 1,
    node_status1: 2,
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    node_status: 1,
    node_status1: 2,
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    node_status: 1,
    node_status1: 2,
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    node_status: 1,
    node_status1: 2,
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    node_status: 1,
    node_status1: 2,
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    node_status: 1,
    node_status1: 2,
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    node_status: 1,
    node_status1: 2,
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    node_status: 1,
    node_status1: 2,
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    node_status: 1,
    node_status1: 2,
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    node_status: 1,
    node_status1: 2,
    tags: ['cool', 'teacher'],
  },
];

const legends = [
  { value: 1, text: '完成/未延期', color: '#6DD400'},
  { value: 2, text: '进行中/将延期', color: '#8000F3'},
  { value: 3, text: '完成/延期', color: '#05E2EF'},
  { value: 4, text: '进行中/延期', color: '#FFAE12'},
  { value: 5, text: '进行中/未延期', color: '#0065F3'},
  { value: 6, text: '未开始/延期', color: '#FF0000'},
]

const state = reactive({
  tableHeight: ''
})

const elRef = ref()
const resize = () => {
  setTimeout(() => {
    const height = elRef.value.clientHeight
    state.tableHeight = height - (Number(document.documentElement.style.fontSize.replace('px', '')) * 4) - 55 + 'px'
  });
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
    }
  }
  .gantt-legends {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }
}
</style>