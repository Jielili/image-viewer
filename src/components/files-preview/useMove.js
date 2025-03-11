import { onMounted, onBeforeUnmount } from 'vue'
import { throttle } from 'lodash'
import { addEvent } from '@/utils/addAndRemoveEvent'
export default function useMove (image, imageRef) {
  const moving = ref(false)
  let x, y
  const moveHandler = (e) => {
    const clientX = e.clientX
    const clientY = e.clientY
    const offestX = clientX - x
    const offestY = clientY - y
    image.value.x += offestX
    image.value.y += offestY
    x = clientX
    y = clientY
  }
  const mouseDownHandler = throttle((e) => {
    [x, y] = [e.clientX, e.clientY]
    moving.value = true
    document.addEventListener('mousemove', moveHandler)
  }, 300)

  const mouseUpHandler = (e) => {
    moving.value = false
    document.removeEventListener('mousemove', moveHandler)
  }

  const addEventListener = () => {
    imageRef.value.addEventListener('mousedown', mouseDownHandler)
    imageRef.value.addEventListener('mouseup', mouseUpHandler)
    // imageRef.value.addEventListener('mouseout', mouseUpHandler)
  }

  onMounted(() => {
    addEvent(imageRef.value, 'onload', addEventListener)
  })

  onBeforeUnmount(() => {
    imageRef.value.removeEventListener('mousedown', mouseDownHandler)
    imageRef.value.removeEventListener('mouseup', mouseUpHandler)
  })
  return {
    moving
  }
}
