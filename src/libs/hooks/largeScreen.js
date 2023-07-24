import { reactive } from "vue"
import LSA from '@/libs/largeScreenAdaptation';
import { onMounted, onUnmounted } from 'vue';

export const screenResize = () => {
  const screenStyle = reactive({
    height: '0px',
    width: '0px'
  })
  
  const getLargeSize = () => {
    screenStyle.height = LSA.screenSize.height + 'px'
    screenStyle.width = LSA.screenSize.width + 'px'
  }
  onMounted(() => {
    getLargeSize()
    LSA.registerCB(getLargeSize)
  })
  
  onUnmounted(() => {
    LSA.unregisterCB()
  })

  return screenStyle
}