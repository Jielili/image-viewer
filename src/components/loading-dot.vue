<template>
  <div class="dots">
    <div class="dot1" />
    <div class="dot2" />
    <div class="dot3" />
  </div>
</template>
<style lang="less" scoped>
.dots {
  display: flex;
  justify-content: center;
}

.dot1,
.dot2,
.dot3 {
  width: 14px;
  height: 14px;
  background: rgba(0 0 0 /25%);
  margin: 6px;
  border-radius: 50%;
  animation: bounce 1s infinite;
}

.dot2 {
  animation-delay: -0.15s;
}

.dot3 {
  animation-delay: -0.3s;
}

@keyframes bounce {
  0% {
    transform: scale(0, 0);
  }

  50% {
    transform: scale(1, 1);
  }

  100% {
    transform: scale(0, 0);
  }
}
</style>
