<template>
  <div class="screen-timer">
    <div class="time">{{ dateObj.time }}</div>
    <div class="split-line"></div>
    <div class="date">{{ dateObj.date }}</div>
    <div class="day">{{ dateObj.day }}</div>
  </div>
</template>

<script setup lang='ts'>
import dayjs from 'dayjs'
import { onUnmounted, reactive, ref } from 'vue';

const weekDay = ['日', '一', '二', '三', '四', '五', '六']

const now = ref(Date.now())

const dateObj = reactive({
  time: '',
  date: '',
  day: ''
})

const formatDate = () => {
  dateObj.time = dayjs(now.value).format('HH:mm:ss')
  dateObj.date = dayjs(now.value).format('YYYY.MM.DD')
  dateObj.day = '星期' + weekDay[Number(dayjs(now.value).format('d'))]
}
formatDate()

const interval = setInterval(() => {
  now.value = Date.now()
  formatDate()
}, 1000)


onUnmounted(() => {
  clearInterval(interval)
})
</script>
<style scoped lang='scss'>
.screen-timer {
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;

  .split-line {
    margin: 0 0.8rem;
    width: 1px;
    height: 1.2rem;
    background: rgba(63, 179, 216, 1);
  }
  .day {
    margin-left: 1rem;
  }
}
</style>