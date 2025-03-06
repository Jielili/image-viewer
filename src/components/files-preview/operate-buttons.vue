<template>
  <a-button
    v-if="prevVisible"
    shape="circle"
    size="large"
    class="button-prev"
    @click="emit('prev')"
  >
    <IconFont
      type="icon-xiangzuo1"
      class="icon"
    />
  </a-button>
  <a-button
    v-if="nextVisible"
    shape="circle"
    size="large"
    class="button-next"
    @click="emit('next')"
  >
    <IconFont
      type="icon-xiangyou1"
      class="icon"
    />
  </a-button>
  <a-button
    shape="circle"
    size="large"
    class="button-close"
    @click="emit('close')"
  >
    <IconFont
      type="icon-guanbi"
      class="icon"
    />
    <!-- <CloseOutlined /> -->
  </a-button>
</template>
<script setup>
defineProps({
  prevVisible: {
    type: Boolean,
    default: false
  },
  nextVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['prev', 'next', 'close', 'download'])
</script>
<style lang="less" scoped>
.button-prev,
.button-next,
.button-close {
  position: fixed;
  background: rgb(0 0 0 / 50%);
  color: #fff;
  border: none;
}

.button-prev {
  top: calc(50% - 20px);
  left: 60px;
}

.button-next {
  top: calc(50% - 20px);
  right: 60px;
}

.button-close {
  top: 48px;
  right: 60px;
}
</style>
