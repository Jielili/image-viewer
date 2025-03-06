import { onMounted, onBeforeUnmount } from 'vue'
import { addEvent } from '@/utils/addAndRemoveEvent'
export default function useZoom (image, imageRef) {
  const maxRatio = 10
  const minRatio = 0.1

  watch(() => image.value.ratio, val => {
    const newWidth = image.value.naturalWidth * val
    const newHeight = image.value.naturalHeight * val
    const offestWidth = newWidth - image.value.width
    const offestHeight = newHeight - image.value.height
    image.value.width = newWidth
    image.value.height = newHeight
    image.value.x -= offestWidth / 2
    image.value.y -= offestHeight / 2
  })

  // 放大缩小倍数
  const zoomOut = (r = 0.1) => {
    const ratio = (image.value.width * (1 + r)) / image.value.naturalWidth
    if (ratio > maxRatio) {
      return
    }
    image.value.ratio = ratio
  }
  const zoomIn = (r = 0.1) => {
    const ratio = (image.value.width * (1 / (1 + r))) / image.value.naturalWidth
    if (ratio < minRatio) {
      return
    }
    image.value.ratio = ratio
  }
  const restore = () => {
    image.value.ratio = image.value.oldRatio
  }

  const wheelHandler = (e) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      zoomOut(-e.deltaY * 0.01)
    } else if (e.deltaY > 0) {
      zoomIn(e.deltaY * 0.01)
    }
  }

  const addEventListener = () => {
    imageRef.value.addEventListener('wheel', wheelHandler)
  }

  onMounted(() => {
    addEvent(imageRef.value, 'onload', addEventListener)
  })

  onBeforeUnmount(() => {
    imageRef.value.removeEventListener('wheel', wheelHandler)
  })

  return { zoomOut, zoomIn, restore }
}
