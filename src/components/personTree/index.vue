<template>
  <div class="person-tree-wrapper">
    <a-tree
      :show-icon="showIcon"
      :selectable="false"
      :default-expanded-keys="['0-0-0']"
      :tree-data="treeData"
      @select="onSelect"
    >
      <template #title="{ dataRef, expanded }">
        <Node v-bind="dataRef" :expanded="expanded"></Node>
      </template>
    </a-tree>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import type { TreeProps } from 'ant-design-vue';

import Node from './node.vue'
const showIcon = ref<boolean>(false);
const treeData = ref<TreeProps['treeData']>([
  {
    title: '功能芯片室',
    key: '0-0',
    persons: [
      { name: '张三1'},
      { name: '李四1'},
      { name: '王五1'},
      { name: '赵六1'}
    ],
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        persons: [
          { name: '张三1-1'},
          { name: '李四1-1'},
          { name: '王五1-1'},
          { name: '赵六1-1'}
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
      },
      {
        title: 'parent 1-2',
        key: '0-0-2'
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    persons: [
      { name: '张三2'},
      { name: '李四2'},
      { name: '王五2'},
      { name: '赵六2'}
    ],
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0'
      },
    ],
  },
]);
const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
  console.log('selected', selectedKeys, info);
};
</script>
<style scoped lang='scss'>
.person-tree-wrapper {
  :deep(.ant-tree) {
    color: #C8D3D8;
    background-color: transparent;
    .ant-tree-treenode {
      .ant-tree-switcher {
        .anticon {
          vertical-align: -1.25em;
          svg {
            font-size: 1rem;
            color: #4DBBE4;
            path:last-child {
              color: #0D4A61;
            }
          }
        }
      }
    }
  }
}
</style>