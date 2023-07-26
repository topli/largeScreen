/**
 * 大屏适配类
 */
const defDesignSize = {
  width: 1920,
  height: 1080,
}

export default {
  designScale: 0,
  defDesignSize: {...defDesignSize},
  screenSize: {...defDesignSize},
  _setRemUnit() {
    const docEl = document.documentElement
    const rem = this.screenSize.width / 100
    docEl.style.fontSize = rem + "px"
  },
  _setScreenSize() {
    const { defDesignSize } = this
    const docEl = document.documentElement
    // 获取父节点的宽高
    const { clientWidth, clientHeight } = docEl
    const { width: designWidth, height: designHeight } = defDesignSize
    const scale = this.designScale = designHeight / designWidth
    const layoutSize = { ...defDesignSize }

    if (clientWidth * scale > clientHeight) {
      // 计算高度超出  保持高度 计算宽度
      layoutSize.height = Math.floor(clientHeight)
      layoutSize.width = Math.floor(clientHeight / scale)
    } else {
      // 计算高度未超出  保持宽度 计算高度
      layoutSize.height = Math.floor(clientWidth * scale)
      layoutSize.width = Math.floor(clientWidth)
    }
    this.screenSize = layoutSize
  },
  _windowResize() {
    this._setScreenSize()
    this._setRemUnit()
    this._resizeCb && this._resizeCb()
  },
  unregisterCB() {
    this._resizeCb = null
  },
  registerCB(cb) {
    this._resizeCb = () => {
      cb && cb()
    }
  },
  _resizeCb() {},
  init(designSize) {
    if (designSize) {
      if (!designSize.height || !designSize.width) {
        console.error('designSize width、height is require');
      } else {
        this.defDesignSize = designSize
      }
    }
    window.addEventListener("resize", this._windowResize.bind(this))
    this._windowResize()
  },
}
