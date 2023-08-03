<template>
  <div class="person-tree-wrapper">
    <a-tree :show-icon="showIcon" :selectable="false" :default-expanded-keys="defExpand" :tree-data="treeData"
      @select="onSelect">
      <template #title="{ dataRef, expanded }">
        <Node :node="dataRef" :expanded="expanded" @select-node="selectNode"></Node>
      </template>
    </a-tree>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import type { TreeProps } from 'ant-design-vue';

import Node from './node.vue'
import { generateUUID } from '@/libs/utils';
import _ from 'lodash';

const props = defineProps(['data'])
const emit = defineEmits(['selectNode'])

const showIcon = ref<boolean>(false);
const treeData = ref<TreeProps['treeData']>([]);
const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
  console.log('selected', selectedKeys, info);
};

const defExpand = ref()

const setDefExpand = () => {
  const first = treeData.value && treeData.value[0]
  if (first) {
    defExpand.value = first.department_name
  }
}

const selectNode = (item: any) => {
  const path = getTreeNodePath(_.cloneDeep(treeData.value), item)
  emit('selectNode', path)
}

setTimeout(() => {
  treeData.value = hanlderTreeData([{
    key: '',
    department_name: "11",
    depat_leader_name: "管理员",
    groups: [
      {
        group_name: "ssss组",
        group_leader_name: "管理员",
        members: [
          {
            uid: 12344444,
            display_name: "管理员"
          }
        ]
      }
    ]
  }], 0)
}, 1000)

const getTreeNodePath = (nodes: any, node: any): any[] => {
  const path: any[] = []
  const findNode = (nodes: TreeProps['treeData'], node: any, parent?: any) => {
    if (!!parent) path.push(parent)
    if (nodes && nodes.length) {
      for (let i = 0; i < nodes.length; i++) {
        const item = nodes[i];
        const children = item.children
        
        if (item.key === node.key) {
          path.push(node)
          break;
        } else if (children && children.length) {
          findNode(children, node, item)
        }
      }
    }
  }
  findNode(nodes, node)
  return path
}

const hanlderTreeData = (node: any, level: number) => {
  level += 1
  if (node && node.length) {
    return node.map((item: any) => {
      item.key = generateUUID()
      item.level = level
      if (item.groups || item.members) {
        item.children = hanlderTreeData(item.groups || item.members, level)
      }
      return item
    })
  } else {
    return node
  }
}
watch(() => props.data, (val) => {
  treeData.value = val || []
  hanlderTreeData(treeData.value, 0)
  setDefExpand()
})
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