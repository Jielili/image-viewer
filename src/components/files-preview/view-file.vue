<template>
  <div class="view-file-contaienr">
    <image-file
      :file="file"
    />
    <!-- <image-file
      v-if="file.type.indexOf('image') === 0"
      :file="file"
    />
    <video-file
      v-else
      :file="file"
    /> -->
  </div>
</template>
<script setup>
import ImageFile from './image-file.vue'
import VideoFile from './video-file.vue'
const props = defineProps({
  file: {
    type: Object,
    default: () => {}
  }
})
</script>
<style lang="less" scoped>
.view-file-contaienr {
  height: 100%;
  width: 100%;
  overflow: hidden;
  // justify-content: center;
  // padding-bottom: 122px;
  // align-items: center;
}
</style>
