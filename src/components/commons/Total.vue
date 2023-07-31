<template>
  <div class="total-container">
    <div class="style-box"></div>
    <div class="total-item" v-for="item in props.modelValue" :key="item.type">
      <div class="total-item-header">
        {{ item.label }}
      </div>
      <div class="total-item-body">
        <span class="item-value" :style="{color: item.color}">{{ item.value }}</span>
        <span class="item-unit" v-if="item.unit">{{ item.unit }}</span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps(['modelValue'])
</script>
<style scoped lang='scss'>
.total-container {
  position: relative;
  padding: 0 2rem;
  display: inline-flex;
  .total-item {
    display: inline-block;
    padding: 0 0.6rem;
    &-header {
      font-size: 0.8rem;
      padding: 0.3rem 0;
    }
    &-body {
      font-size: 1.5rem;
      padding: 0.8rem 0;
      .item-value {
        color: #4BDFFF;
      }
      .item-unit {
        font-size: 0.5rem;
        margin-left: 0.1rem;
        color: rgba(241, 243, 246, 1);
      }
    }
  }
  .style-box {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 3rem;
      width: 100%;
      left: 0;
      bottom: 0;
      background-color: rgba(22, 50, 89, 0.3);
      border-radius: 3rem;
      border-top: 2px solid rgba(38, 152, 209, 1);
      border-bottom: 2px solid rgba(204, 204, 204, 0.4);
      border-left: 0px solid transparent;
      border-right: 0px solid transparent;
      z-index: -1;
      &::before{
        content: '';
        height: 3rem;
        width: 5rem;
        border-width: 2px;
        border-style: solid;
        border-color:rgba(38, 152, 209, 1);
        border-right-color: transparent;
        border-top-left-radius: 3rem;
        border-bottom-left-radius: 3rem;
      }
      &::after{
        content: '';
        height: 3rem;
        width: 5rem;
        border-width: 2px;
        border-style: solid;
        border-color:rgba(38, 152, 209, 1);
        border-left-color: transparent;
        border-top-right-radius: 3rem;
        border-bottom-right-radius: 3rem;
      }
  }
}
</style>