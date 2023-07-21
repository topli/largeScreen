<template>
  <div class="hello">{{ msg }}</div>
</template>

<script setup lang="ts">
defineProps(['msg'])
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  font-size: 1em;
  text-align: center;
  background-color: aquamarine;
  height: 100%;
  width: 100%;
}
</style>
