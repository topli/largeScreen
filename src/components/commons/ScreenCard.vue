<template>
  <div class="screen-card">
    <div class="screen-card-header">
      <i></i>
      <span>{{ title }}</span>
    </div>
    <div class="screen-card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang='ts'>
defineProps(['title'])
</script>
<style scoped lang='scss'>
.screen-card {
  &-header {
    position: relative;
    padding: 0.6rem 1rem;
    background-color: rgba(0, 101, 243, 0.2);
    border: 1px solid;
    border-image: linear-gradient(90deg, rgba(63, 179, 216, 1), rgba(63, 179, 216, 0)) 1 1;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: -2px;
      height: 2px;
      width: 2rem;
      background-color: #0065F3;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: -2px;
      height: 2px;
      width: 2rem;
      background-color: #0065F3;
    }
  }
}
</style>