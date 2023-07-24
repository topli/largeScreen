<template>
  <LargePageMain></LargePageMain>
</template>

<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue';
import LargePageMain from '@/views/largeScreen/index.vue'

</script>

<style lang="scss">
@import './styles/common/index.scss';
@import './styles/layout/app.scss';

#app {
  @include wh(100%, 100%);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #2c3e50;
  position: relative;
}
</style>
