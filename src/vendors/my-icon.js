import { createFromIconfontCN } from '@ant-design/icons-vue'

const IconFont = createFromIconfontCN({
  // scriptUrl: 'https://fp-ei-daily.oss-cn-beijing.aliyuncs.com/daily/static/js/iconfont_v1.0_20220801.js',
  scriptUrl: '//at.alicdn.com/t/c/font_3437975_ye021vuy8i8.js',
  extraCommonProps: {
    class: 'icon'
  }
})

export function install (app) {
  app.component('IconFont', IconFont)
}
