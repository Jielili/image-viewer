<template>
  <span class="loader" />
</template>
<style lang="less" scoped>
.loader {
  width: 32px;
  height: 32px;
  border: 4px solid rgba(199 195 195 / 80%);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
