<template>
  <div class="person-tree-node">
    <div v-if="props.title" class="group-title">
      {{ props.title }}
    </div>
    <div class="person-info-wrapper">
      <div class="person-info-item" v-for="item in props.persons" :key="item.id">
        <i class="avatar"></i>
        <span class="name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps(['title', 'persons'])
</script>
<style scoped lang='scss'>
.person-tree-node {
  .group-title {
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
      padding: 1rem;
      font-size: 1rem;
      border: 1px solid #28577a;
      background-color: #2e8aa136;
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
    }
  }
}
</style>