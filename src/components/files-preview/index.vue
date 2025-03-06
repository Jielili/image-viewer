<template>
  <a-modal
    v-model:visible="visible"
    width="100%"
    wrap-class-name="full-modal"
    :destroy-on-close="true"
    :title="null"
    :footer="null"
    :closable="false"
  >
    <files-preview
      v-bind="$attrs"
      @close="visible = false"
    />
  </a-modal>
</template>
<script setup>
import { defineComponent } from 'vue'
import FilesPreview from './files-preview.vue'
const visible = ref(false)
defineExpose({
  visible
})
</script>
<script>
export default defineComponent({
  name: 'FilesPreview'
})
</script>
<style lang="less">
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
    background: rgb(0 0 0 / 80%);
  }

  .ant-modal-body {
    flex: 1;
    background: transparent;
    padding: 0;
    overflow: overlay;
    // opacity: 0.8;
  }
}
</style>
