<template>
  <div
    ref="eleRef"
    class="thumbnail"
    :style="{ left: left, right: left }"
  >
    <div
      class="pictures-container"
    >
      <div
        v-for="(item, index) in files"
        :key="index"
        :class="{'picture-item': true, 'selected': index === displayIndex }"
        @click="emit('update:displayIndex', index)"
      >
        <img
          :src="getImageUrl(item)"
          width="96"
          height="96"
          alt="picture"
          class="img"
        >
        <div
          v-if="item.type.indexOf('video') === 0"
          class="play-sign"
        >
          <caret-right-outlined />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { CaretRightOutlined } from '@ant-design/icons-vue'
import { toRefs } from 'vue'
import { getImageUrl } from '@/utils/fileUrl.js'
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

const emit = defineEmits(['update:displayIndex'])
const { files } = toRefs(props)
const eleRef = ref()
const windowInnerWidth = inject('windowInnerWidth')

const thumbnailWidth = computed(() => {
  return windowInnerWidth.value - 96
})

const left = computed(() => {
  const picturesWidth = files.value.length * 112 - 8
  if (picturesWidth > thumbnailWidth.value) {
    return '96px'
  } else {
    return `${(windowInnerWidth.value - picturesWidth) / 2}px`
  }
})

// const left = computed(() => {
//   const picturesWidth = files.value.length * 112 - 8
//   return picturesWidth > thumbnailWidth.value ? 0 : '50%'
// })

// const transform = computed(() => {
//   return left.value === 0 ? 'translate(0,0)' : 'translate(-50%,0)'
// })

</script>
<style lang="less" scoped>
.thumbnail {
  position: fixed;
  bottom: 18px;
  height: 104px;
  // left: 48px;
  // right: 48px;
  overflow-x: overlay;

  &::-webkit-scrollbar {
    display: none;
  }
}

.pictures-container {
  // position: relative;
  // position: absolute;
  padding: 0 4px;
  height: 104px;
  display: flex;
  // justify-content: center;
  align-items: center;
  overflow: overlay;
  user-select: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.picture-item {
  // position: absolute;
  position: relative;
  // top: 4px;
  width: 96px;
  height: 96px;
  border-radius: 8px;
  cursor: pointer;
  background: #fff;

  & + .picture-item {
    margin-left: 16px;
  }
}

.img {
  border-radius: 8px;
  object-fit: cover;
  user-select: none;
}

.selected {
  outline: 4px solid #0085ff;
}

.play-sign {
  color: #fff;
  width: 35px;
  height: 26px;
  border-radius: 4px;
  border: 1px solid #fff;
  text-align: center;
  position: absolute;
  top: 34px;
  left: 30px;
}
</style>
