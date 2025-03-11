import { throttle } from 'lodash'
import { onMounted } from 'vue'
export default function useScrollEvent (more) {
  const allowFetchMore = ref(true)
  const scrollHandler = (e) => {
    if (e.target.className !== 'list-container') {
      return
    }
    const el = e.target
    if (el.scrollHeight - el.scrollTop - el.clientHeight * 1.5 <= 0) {
      more()
    }
  }
  const throttleScrollHandler = throttle(scrollHandler, 300)
  const addScrollEventListener = () => {
    allowFetchMore.value = true
    window.addEventListener('scroll', throttleScrollHandler, true)
  }
  const removeScrollEventListener = () => {
    allowFetchMore.value = false
    window.removeEventListener('scroll', throttleScrollHandler, true)
  }
  onMounted(() => {
    addScrollEventListener()
  })
  onBeforeUnmount(() => {
    removeScrollEventListener()
  })

  return {
    allowFetchMore,
    addScrollEventListener,
    removeScrollEventListener
  }
}
