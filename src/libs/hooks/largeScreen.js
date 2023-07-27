import { reactive } from "vue"
import LSA from '@/libs/largeScreenAdaptation';
import { Modal } from 'ant-design-vue'
import { onMounted, onUnmounted } from 'vue';
import { setStore, getStore } from '@/libs/utils'

const SCREENTIPS = 'screenTips'

export const screenResize = () => {
  const screenStyle = reactive({
    height: '0px',
    width: '0px'
  })
  
  const getLargeSize = () => {
    const { height, width } = LSA.screenSize
    screenStyle.height = LSA.screenSize.height + 'px'
    screenStyle.width = LSA.screenSize.width + 'px'

    const tips = getStore(SCREENTIPS, true)
    if (!tips && height / width < 0.5) {
      Modal.confirm({
        title: '显示效果不佳',
        content: '请使用16:9分辨率效果更佳',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消'
      });
      setStore(SCREENTIPS, true, true)
    }
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