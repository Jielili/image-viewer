<template>
  <div>
    <img
      v-for="(file, index) in files"
      :key="file.url"
      :src="file.url"
      :alt="file.name"
      width="150"
      class="image"
      @click="openPreview(index)"
    />
    <files-preview
      ref="previewRef"
      :files="files"
      :display-index="displayIndex"
    />
  </div>
</template>
  
  <script setup>
import FilesPreview from "@/components/files-preview/index.vue";
import { ref } from "vue";
const previewRef = ref();
const displayIndex = ref(0);
const files = [
  {
    url: "https://funplus-offer-test-oss-proxy.funplus.io/20230607/1686126579450392556.JPG",
    width: 6600,
    height: 3000,
    type: "image/jpeg",
    name: "IMG_2329.JPG",
    size: "2522844",
  },
  {
    url: "https://funplus-offer-test-oss-proxy.funplus.io/20230607/1686126629946716521.jpg",
    width: 2815,
    height: 2815,
    type: "image/jpeg",
    name: "008pTMKTly1gygipogjclj3267267hdu.jpg",
    size: "2575553",
  },
  {
    url: "https://funplus-offer-test-oss-proxy.funplus.io/20230607/1686126645189932820.gif",
    width: 427,
    height: 427,
    type: "image/gif",
    name: "008pTMKTly1h4gnwa3s0dg30bv0bvu0y.gif",
    size: "3027606",
  },
  {
    url: "https://funplus-offer-test-oss-proxy.funplus.io/20230607/1686126638948299388.jpg",
    width: 2500,
    height: 3500,
    type: "image/jpeg",
    name: "006brIc0gy1h2wqqhzrcfj31xg2p84qp.jpg",
    size: "1178528",
  },
  {
    url: "https://funplus-offer-test-oss-proxy.funplus.io/20230607/1686126684977656940.jpg",
    width: 2600,
    height: 2500,
    type: "image/jpeg",
    name: "006brIc0gy1h2a385a7iej32081xgao0.jpg",
    size: "524602",
  },
];

function openPreview(i) {
  displayIndex.value = i;
  previewRef.value.visible = true;
}
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
  