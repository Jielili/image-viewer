<template>
  <picture-list />
  <!-- <mine /> -->
</template>

<script setup>
import Mine from "@/views/mine.vue";
import PictureList from "@/views/picture-list.vue";
import { ref } from "vue";

import { provide, onMounted, onBeforeUnmount } from 'vue'

const windowInnerHeight = ref(window.innerHeight)
const windowInnerWidth = ref(window.innerWidth)
const getWindowHeightAndWidth = () => {
  windowInnerHeight.value = window.innerHeight
  windowInnerWidth.value = window.innerWidth
}

onMounted(() => {
  window.onresize = getWindowHeightAndWidth
})

onBeforeUnmount(() => {
  window.onresize = undefined
})

provide('windowInnerHeight', windowInnerHeight)
provide('windowInnerWidth', windowInnerWidth)

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.image {
  cursor: pointer;
}
</style>
