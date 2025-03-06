<template>
  <div class="video-container">
    <video
      controls
      :src="file.url"
      :type="file.type"
      :width="width"
      :height="height"
    />
  </div>
</template>
<script setup>
import { toRefs } from 'vue'
const props = defineProps({
  file: {
    type: Object,
    default: () => {}
  }
})
const { file } = toRefs(props)

const width = ref(undefined)
const height = ref(undefined)
const getSize = () => {
  const vw = window.innerWidth - 320
  const vh = window.innerHeight - 170
  if (file.value.width / vw > file.value.height / vh) {
    width.value = vw
    height.value = undefined
  } else if (file.value.height / vh > 1) {
    height.value = vh
    width.value = undefined
  } else {
    width.value = file.value.width
    height.value = file.value.height
  }
}

getSize()

const windowInnerHeight = inject('windowInnerHeight')
const windowInnerWidth = inject('windowInnerWidth')

watch([windowInnerHeight, windowInnerWidth], getSize)

</script>
<style lang="less" scoped>
.video-container {
  text-align: center;
  margin-bottom: 144px;
  margin-top: 20px;
}
</style>
