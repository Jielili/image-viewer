<template>
  <view-file
    :key="'file-'+displayIndex"
    :file="files[displayIndex]"
  />
  <operate-buttons
    :prev-visible="files.length > 1"
    :next-visible="files.length > 1"
    @prev="prev"
    @next="next"
    @close="emit('close')"
  />
  <footer-thumbnail
    v-model:displayIndex="displayIndex"
    :files="files"
  />
</template>
<script setup>
import { toRefs } from 'vue'
import footerThumbnail from './footer-thumbnail.vue'
import ViewFile from './view-file.vue'
import OperateButtons from './operate-buttons.vue'
const props = defineProps({
  files: {
    type: Array,
    default: () => []
  },
  displayIndex: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['close'])
const { displayIndex: _displayIndex, files } = toRefs(props)
const displayIndex = ref(_displayIndex.value)
watch(_displayIndex, val => {
  displayIndex.value = _displayIndex.value
})

const prev = () => {
  if (displayIndex.value === 0) {
    displayIndex.value = files.value.length - 1
  } else {
    displayIndex.value--
  }
}

const next = () => {
  // displayIndex.value++
  displayIndex.value = (displayIndex.value + 1) % files.value.length
}

</script>
<style lang="less" scoped>
.watermark {
  opacity: 0.4;
}
</style>
