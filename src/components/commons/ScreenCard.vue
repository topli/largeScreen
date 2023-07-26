<template>
  <div class="screen-card">
    <div class="screen-card-header">
      <i class="screen-card-icon"></i>
      <span class="screen-card-title">{{ title }}</span>
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
    display: flex;
    align-items: center;
    position: relative;
    padding: 0.3rem 0.5rem;
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
    .screen-card-icon {
      margin-right: 10px;
      width: 28px;
      height: 36px;
      display: inline-block;
      background: url('~@/assets/images/title_icon.png') 100% 100% no-repeat;
    }
    .screen-card-title {
      margin-top: 2px;
    }
  }
}
</style>