<template>
  <div class="gallery">
    <div ref="listRef" class="list-container">
      <div
        v-for="image in images"
        :key="image.id"
        class="image-card"
        :style="{
          height: image.thumbHeight + 'px',
          transform: image.transform,
        }"
        ref="imageCardRef"
      >
        <img
          :class="{ 'fade-in': image.isLoaded }"
          :src="image.urls.thumb"
          :alt="image.alt_description"
        />
      </div>
      <div class="footer" :style="realFooterPosition">
        <div v-if="allowFetchMore" class="loading">
          <loading-dot />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { fetchImages } from "@/api/index";
import usePinterest from "./usePinterest";
import useScrollEvent from '@/views/useScrollEvent'

const images = ref([]);
const loading = ref(false);
const imageCardRef = ref([]);

// ✅ 懒加载的核心
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = entry.target.dataset.index;
        loadImage(index);
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "200px" }
); // 提前 200px 加载

const loadImage = (index) => {
  const img = new Image();
  img.src = images.value[index].urls.thumb;
  img.onload = () => {
    images.value[index].isLoaded = true;
  };
  img.onerror = () => {
    console.error(`Image ${index} failed to load`);
  };
};

onMounted(async () => {
  await getImages();
});

const getImages = async () => {
  try {
    loading.value = true;
    const response = await fetchImages();
    images.value.push(...response.data);
    nextTick(() => {
      // 在这里监听新添加的图片
      imageCardRef.value.forEach((el, index) => {
        if (el && !el.dataset.observed) {
          el.dataset.index = index;
          observer.observe(el);
          el.dataset.observed = true; // 避免重复 observe
        }
      });
    });
    loading.value = false;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};

const { listRef, footerTop } = usePinterest(images);

const windowInnerHeight = inject("windowInnerHeight");
const listContainerHeight = computed(() => windowInnerHeight.value - 48);
const realFooterPosition = computed(() => {
  if (loading.value || footerTop.value + 80 >= listContainerHeight.value) {
    return {
      top: `${footerTop.value}px`,
    };
  } else {
    return {
      bottom: "0",
    };
  }
});

function more () {
  if (loading.value) {
    return
  }
  getImages()
}

const { addScrollEventListener, removeScrollEventListener, allowFetchMore } = useScrollEvent(more)

</script>
  
<style scoped>
.gallery {
  position: relative;
  width: 100%;
  height: 100%;
}
.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
  transition: background 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  padding: 0 100px;
  box-sizing: border-box;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.image-card {
  width: 230px;
  position: absolute;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.5s ease;
  overflow: hidden;
}
.image-card img {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
}
.footer {
  position: absolute;
  left: 0;
  right: 0;
  padding: 32px 0 16px;
}

/* 图片加载成功的过渡效果 */
.fade-enter-active {
  transition: opacity 0.6s ease-in-out;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.image-card img.fade-in {
  opacity: 1;
}

</style>
