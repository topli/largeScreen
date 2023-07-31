<template>
  <div class="person-tree-wrapper">
    <a-tree
      :show-line="showLine"
      :show-icon="showIcon"
      :default-expanded-keys="['0-0-0']"
      :tree-data="treeData"
      @select="onSelect"
    >
      <template #icon><carry-out-outlined /></template>
      <template #title="{ dataRef }">
        <Node v-bind="dataRef"></Node>
      </template>
    </a-tree>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { CarryOutOutlined } from '@ant-design/icons-vue';
import type { TreeProps } from 'ant-design-vue';

import Node from './node.vue'
const showLine = ref<boolean>(true);
const showIcon = ref<boolean>(false);
const treeData = ref<TreeProps['treeData']>([
  {
    title: 'parent 1',
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
        children: [
          { title: 'leaf', key: '0-0-0-0' },
          {
            key: '0-0-0-1',
          },
          { title: 'leaf', key: '0-0-0-2' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: 'leaf', key: '0-0-1-0' }],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          { title: 'leaf 1', key: '0-0-2-0' },
          {
            title: 'leaf 2',
            key: '0-0-2-1',
          },
        ],
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
        key: '0-1-0',
        children: [
          { title: 'leaf', key: '0-1-0-0' },
          { title: 'leaf', key: '0-1-0-1' },
        ],
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
    color: #fff;
    background-color: transparent;
  }
}
</style>