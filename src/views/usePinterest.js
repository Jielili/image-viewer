// import { DAILY_CARD_WIDTH, DAILY_CARD_SPACE_BETWEEN } from '@/constants/daily-card'
import { onMounted } from 'vue'
import { debounce } from 'lodash'
const DAILY_CARD_WIDTH = 230
const DAILY_CARD_SPACE_BETWEEN = 32

export default function usePinterest (list) {
  const width = ref(undefined)
  const columnCount = ref(0)
  const columnsHeight = ref([])
  const listRef = ref()
  const windowInnerWidth = inject('windowInnerWidth')

  const left = computed(() => {
    return Math.floor((width.value - columnCount.value * DAILY_CARD_WIDTH - (columnCount.value - 1) * DAILY_CARD_SPACE_BETWEEN) / 2)
  })

  const resizeHandler = debounce(() => {
    width.value = listRef.value.clientWidth
  }, 100)

  const footerTop = computed(() => {
    return Math.max(...columnsHeight.value)
  })

  onMounted(() => {
    width.value = listRef.value.clientWidth
  })

  watch(windowInnerWidth, () => {
    resizeHandler()
  })

  watch(width, (val) => {
    columnCount.value = Math.floor(val / (DAILY_CARD_WIDTH + DAILY_CARD_SPACE_BETWEEN))
  })

  watch([columnCount, () => [...list.value], left], async val => {
    const oneCardWidth = DAILY_CARD_WIDTH + DAILY_CARD_SPACE_BETWEEN
    columnsHeight.value = new Array(columnCount.value).fill(0)
    for (let i = 0; i < list.value.length; i++) {
      const j = columnsHeight.value.indexOf(Math.min(...columnsHeight.value))
      const translateX = left.value + j * oneCardWidth + 'px'
      const translateY = DAILY_CARD_SPACE_BETWEEN + columnsHeight.value[j] + 'px'
      list.value[i].transform = `translate(${translateX}, ${translateY})`
      const thumbHeight = DAILY_CARD_WIDTH * list.value[i].height / list.value[i].width
      list.value[i].thumbHeight = thumbHeight
      columnsHeight.value[j] += thumbHeight + DAILY_CARD_SPACE_BETWEEN
    }
  })

  return {
    footerTop,
    listRef
  }
}
