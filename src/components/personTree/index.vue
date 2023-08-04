<template>
  <div class="person-tree-wrapper">
    <div class="person-tree-scroll">
      <a-tree :show-icon="showIcon" :selectable="false" :default-expanded-keys="defExpand" :tree-data="treeData"
      @select="onSelect">
      <template #title="{ dataRef, expanded }">
        <Node :node="dataRef" :expanded="expanded" @select-node="selectNode"></Node>
      </template>
    </a-tree>
    </div>
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

// setTimeout(() => {
//   treeData.value = hanlderTreeData([{
//     key: '',
//     department_name: "444",
//     department_leader_name: "不合格审理人员",
//     groups: [
//       {
//         group_name: "放大类功能电器组",
//         group_leader_name: "管理员",
//         members: [
//           {
//             uid: 9876516546854,
//             display_name: "李子一"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子二"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           }
//         ]
//       },
      
//       {
//         group_name: "放大类功能电器组",
//         group_leader_name: "管理员",
//         members: [
//           {
//             uid: 9876516546854,
//             display_name: "李子一"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子二"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           }
//         ]
//       },
//       {
//         group_name: "放大类功能电器组",
//         group_leader_name: "管理员",
//         members: [
//           {
//             uid: 9876516546854,
//             display_name: "李子一"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子二"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           }
//         ]
//       },
//       {
//         group_name: "放大类功能电器组",
//         group_leader_name: "管理员",
//         members: [
//           {
//             uid: 9876516546854,
//             display_name: "李子一"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子二"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           }
//         ]
//       },
//       {
//         group_name: "放大类功能电器组",
//         group_leader_name: "管理员",
//         members: [
//           {
//             uid: 9876516546854,
//             display_name: "李子一"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子二"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     key: '',
//     department_name: "444",
//     department_leader_name: "不合格审理人员",
//     groups: [
//       {
//         group_name: "放大类功能电器组",
//         group_leader_name: "管理员",
//         members: [
//           {
//             uid: 987651651111146854,
//             display_name: "李子一"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子二"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           }
//         ]
//       },
      
//       {
//         group_name: "放大类功能电器组",
//         group_leader_name: "管理员",
//         members: [
//           {
//             uid: 9876516546854,
//             display_name: "李子一"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子二"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           }
//         ]
//       },
//       {
//         group_name: "放大类功能电器组",
//         group_leader_name: "管理员",
//         members: [
//           {
//             uid: 9876516546854,
//             display_name: "李子一"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子二"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           }
//         ]
//       },
//       {
//         group_name: "放大类功能电器组",
//         group_leader_name: "管理员",
//         members: [
//           {
//             uid: 9876516546854,
//             display_name: "李子一"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子二"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           }
//         ]
//       },
//       {
//         group_name: "放大类功能电器组",
//         group_leader_name: "管理员",
//         members: [
//           {
//             uid: 9876516546854,
//             display_name: "李子一"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子二"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           },
//           {
//             uid: 9876516546854,
//             display_name: "李子三"
//           }
//         ]
//       }
//     ]
//   }], 0)
//   console.log(treeData.value);
  
// }, 1000)

const getTreeNodePath = (nodes: any, node: any): any[] => {
  let path: any[] = []
  let findStatus = false
  const findNode = (nodes: TreeProps['treeData'], node: any, level: number) => {
    console.log(level);
    
    if (findStatus) return
    if (nodes && nodes.length) {
      for (let i = 0; i < nodes.length; i++) {
        if (findStatus) break;
        const item = nodes[i];
        const children = item.children || item.groups || item.members
        path[level] = item
        if (item.key === node.key) {
          findStatus = true
          break;
        } else if (children && children.length) {
          findNode(children, node, level + 1)
        }
      }
    }
  }
  findNode(nodes, node, 0)
  return path
}

const hanlderTreeData = (node: any, level: number) => {
  level += 1
  if (node && node.length) {
    return node.map((item: any) => {
      item.key = generateUUID()
      item.level = level
      if ((item.groups || item.members) && level < 2) {
        item.children = hanlderTreeData(item.groups || item.members, level)
      }
      if (level === 2) {
        item.members.map((item: any) => {
          item.key = generateUUID()
        })
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
  overflow: hidden;
  .person-tree-scroll {
    height: 100%;
    width: 100%;
    overflow: hidden;
    &:hover {
      overflow: auto;
    }
  }
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