<template>
  <div class="screen-header">
    <img class="screen-header-bg" src="@/assets/images/header_bg.png"/>
    <span class="screen-header-title">{{ title }}</span>
    <Timer></Timer>
  </div>
</template>

<script setup lang='ts'>
import Timer from './Timer.vue'
defineProps(['title'])
</script>
<style scoped lang='scss'>
.screen-header {
  position: relative;
  &-bg {
    height: 3.73rem;
    width: 100%;
  }
  &-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.68rem;
    font-family: YouSheBiaoTiHei;
    color: #FFFFFF;
    line-height: 52px;
    letter-spacing: 10px;
    background: linear-gradient(180deg, #FFFFFF 0%, #AAABAB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .screen-timer {
    position: absolute;
    right: 1rem;
    top: 0px;
    height: 100%;
  }
}
</style>