<template>
  <div
    v-show="!loading"
    class="image-container"
  >
    <img
      ref="imageRef"
      draggable="false"
      :src="getFormatImageUrl(file)"
      alt="picture"
      :width="image.width"
      :height="image.height"
      :style="{ transform: `rotate(${image.rotate}deg)`, left: `${image.x}px`, top: `${image.y}px`}"
      :class="{img: true, 'img-transition': !moving}"
    >
  </div>
  <loading-rotation
    v-if="loading"
    class="loader"
  />
  <a-button
    shape="circle"
    size="large"
    class="button-restore"
    @click="restore()"
  >
    <span>1:1</span>
  </a-button>
  <a-button
    shape="circle"
    size="large"
    class="button-zoom-out"
    @click="zoomOut()"
  >
    <IconFont
      type="icon-fangda"
      class="icon"
    />
  </a-button>
  <a-button
    shape="circle"
    size="large"
    class="button-zoom-in"
    @click="zoomIn()"
  >
    <IconFont
      type="icon-suoxiao"
      class="icon"
    />
    <!-- <minus-outlined /> -->
  </a-button>
  <a-button
    shape="circle"
    size="large"
    class="button-rotate"
    @click="rotateLeft"
  >
    <IconFont
      type="icon-zuoxuanzhuan"
      class="icon"
    />
  </a-button>
  <a-button
    shape="circle"
    size="large"
    class="button-reset"
    @click="reset"
  >
    <IconFont
      type="icon-huanyuan"
      class="icon"
    />
  </a-button>
</template>
<script setup>
import { toRefs, onMounted } from 'vue'
import useMove from './useMove'
import useZoom from './useZoom'
import LoadingRotation from '@/components/loading-rotation.vue'
import { addEvent } from '@/utils/addAndRemoveEvent'
import { getFormatImageUrl } from '@/utils/fileUrl.js'
const props = defineProps({
  file: {
    type: Object,
    default: () => {}
  }
})
const { file } = toRefs(props)
const image = ref({})

function getImageDate () {
  const naturalWidth = file.value.width
  const naturalHeight = file.value.height
  const aspectRatio = naturalWidth / naturalHeight
  const viewerWidth = window.innerWidth
  const viewerHeight = window.innerHeight - 122
  let width = viewerWidth
  let height = viewerHeight

  if (aspectRatio * viewerHeight > viewerWidth) {
    height = width / aspectRatio
  } else {
    width = height * aspectRatio
  }

  width = Math.min(width * 0.9, naturalWidth)
  height = Math.min(height * 0.9, naturalHeight)

  const left = (viewerWidth - width) / 2
  const top = (viewerHeight - height) / 2

  image.value = {
    left,
    top,
    x: left,
    y: top,
    width,
    height,
    naturalWidth,
    naturalHeight,
    aspectRatio,
    oldRatio: width / naturalWidth,
    ratio: width / naturalWidth,
    rotate: 0
  }
}

getImageDate()

const imageRef = ref()
const { moving } = useMove(image, imageRef)
const { zoomOut, zoomIn, restore } = useZoom(image, imageRef)

const loading = ref(true)
const loadedFn = () => {
  loading.value = false
}
onMounted(() => {
  addEvent(imageRef.value, 'onload', loadedFn)
})

// 旋转角度
const rotateLeft = () => {
  image.value.rotate -= 90
}

const reset = () => {
  image.value.width = image.value.naturalWidth * image.value.oldRatio
  image.value.height = image.value.naturalHeight * image.value.oldRatio
  image.value.x = image.value.left
  image.value.y = image.value.top
  image.value.rotate = 0
  image.value.ratio = image.value.oldRatio
}

watch(image, val => {
  const { width, height, rotate } = image.value
  const change = (rotate / 90 % 2) !== 0
  const diff = change ? ((width - height) / 2) : 0
  const x = image.value.x + diff
  const y = image.value.y - diff
  if ((change ? height : width) + x < 100) {
    image.value.x = 100 - (change ? height : width) - diff
  }
  if (window.innerWidth - x < 100) {
    image.value.x = window.innerWidth - 100 - diff
  }
  if ((!change ? height : width) + y < 100) {
    image.value.y = 100 - (!change ? height : width) + diff
  }
  if (window.innerHeight - y < 100) {
    image.value.y = window.innerHeight - 100 + diff
  }
}, { deep: true })

const windowInnerHeight = inject('windowInnerHeight')
const windowInnerWidth = inject('windowInnerWidth')

watch([windowInnerHeight, windowInnerWidth], getImageDate)
</script>
<style lang="less" scoped>
.image-container {
  position: relative;
  height: 100%;
  overflow: hidden;
  animation: zoom-in 0.25s ease;
}

.loader {
  position: absolute;
  top: calc(50% - 50px);
  left: 50%;
  transform: translate(-50%, -50%);
}

.img {
  cursor: grab;
  position: absolute;
  user-select: none;
}

.img-transition {
  transition: all 0.25s;
}

button[class~="ant-btn"] {
  position: fixed;
  top: 48px;
  background: rgb(0 0 0 / 50%);
  color: #fff;
  border: none;
}

.button-reset {
  right: 120px;
  transform: rotateY(180deg);
}

.button-rotate {
  right: 180px;
}

.button-restore {
  right: 240px;
}

.button-zoom-in {
  right: 300px;
}

.button-zoom-out {
  right: 360px;
}

@keyframes zoom-in {
  from {
    transform: scale(0.1, 0.1);
  }

  to {
    transform: unset;
  }
}
</style>
