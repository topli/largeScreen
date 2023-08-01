export interface DesignSize { height: number, width: number }

/**
 * 大屏适配类
 */
const defDesignSize: DesignSize = {
  width: 1920,
  height: 1080,
}

export default {
  keepScale: false, // 保持设计图大小比例
  designScale: 0, // 设计图比例
  defDesignSize: {...defDesignSize }, // 默认大小
  screenSize: { ...defDesignSize }, // 当前场景大小
  rem: 19.2,
  _setRemUnit() {
    const docEl = document.documentElement
    if (this.keepScale) {
      this.rem = this.screenSize.width / 100
    } else {
      this.rem = (this.defDesignSize.width / 100) * this.screenSize.height / defDesignSize.height
    }
    docEl.style.fontSize = this.rem + "px"
  },
  _setScreenSize() {
    if (this.keepScale) {
      this._setKeepScaleScreen()
    } else {
      this._setAutoScreen()
    }
  },
  _setKeepScaleScreen() {
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
  _setAutoScreen() {
    this.screenSize = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  },
  _windowResize() {
    this._setScreenSize()
    this._setRemUnit()
    this._resizeCb && this._resizeCb()
  },
  unregisterCB() {
    this._resizeCb = () => {}
  },
  registerCB(cb:Function) {
    this._resizeCb = () => {
      cb && cb()
    }
  },
  _resizeCb() {},
  init(designSize: DesignSize = defDesignSize, keepScale: boolean = false) {
    if (designSize) {
      if (!designSize.height || !designSize.width) {
        console.error('designSize width、height is require');
      } else {
        this.defDesignSize = designSize
      }
    }
    this.keepScale = keepScale
    window.addEventListener("resize", this._windowResize.bind(this))
    this._windowResize()
  },
}
