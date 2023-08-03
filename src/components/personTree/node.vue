<template>
  <div class="person-tree-node">
    <div v-if="title" class="group-title" @click="selectNode()">
      {{ title }}
    </div>
    <div class="person-info-wrapper" v-if="expanded">
      <div class="person-info-item" v-for="item in members" :key="item.id" @click="selectNode(item)">
        <i class="avatar" :style="randomColor()">{{ sortName(item.name) }}</i>
        <span class="name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { generateUUID } from '@/libs/utils';
import { computed } from 'vue';

const props = defineProps(['node', 'expanded'])
const emit = defineEmits(['selectNode'])

const colors = ['#009DFF', '#8080FF', '#00807F', '#F09822', '#80BD20', '#00D1FF']

const title = computed(() => {
  if (props.node.level === 1) {
    return props.node.department_name
  } else {
    return props.node.group_name
  }
})

const members = computed(() => {
  if (props.node.level === 1) {
    return [
      { name: props.node.depat_leader_name, type: 'master' }
    ]
  } else {
    const members = props.node.members.map((item: any) => {
      item.name = item.display_name
      return item
    })
    return [{ name: props.node.group_leader_name, id: generateUUID(), type: 'master' }, ...members]
  }
})

const selectNode = (item?: any) => {
  if (item && item.type === 'master') return
  emit('selectNode', item || props.node)
}

const randomColor = (): any => { return { 'background': colors[Math.floor(Math.random() * 7)] } }

const sortName = (fullName: string) => fullName.substring(0, 2)
</script>
<style scoped lang='scss'>
@import '@/styles/mixins/common.scss';
.person-tree-node {
  .group-title {
    color: #fff;
    width: 15rem;
    padding: 0.3rem 0.8rem;
    border-left: 3px solid #4CDFFF;
    margin: 0.5rem 0;
    background-image: linear-gradient(90deg,#2e8aa1b3, #2e8aa10d);
  }
  .person-info-wrapper {
    display: flex;
    .person-info-item {
      position: relative;
      padding: 0.8rem 1rem;
      font-size: 0.8rem;
      border: 1px solid #28577a;
      background-color: #2e8aa136;
      display: flex;
      align-items: center;
      &:not(:last-child) {
        margin-right: 1rem;
      }
      &:hover {
        border: 1px solid #4EB3FF;
        background-color: #2e8aa19c;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 5px;
          height: 5px;
          border-style: solid;
          border-width: 5px;
          border-top-color: #4EB3FF;
          border-left-color: #4EB3FF;
          border-right-color: transparent;
          border-bottom-color: transparent;
        }
      }
      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-style: normal;
        border-radius: 50%;
        background-color: #009DFF;
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }
      .name {
        width: 3rem;
        @include ellipsis();
      }
    }
  }
}
</style>