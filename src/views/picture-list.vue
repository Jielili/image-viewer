<template>
    <div class="gallery" ref="gallery">
      <div v-for="(column, index) in columns" :key="index" class="column">
        <div v-for="image in column" :key="image.id" class="image-card">
          <img 
            v-lazy="{
              src: image.urls.small,
              error: 'https://via.placeholder.com/300x400?text=Image+Not+Found'
            }"
            :alt="image.alt_description"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { useLazyload } from 'vue3-lazyload';
  
  export default {
    data() {
      return {
        images: [],
        columns: [[], [], []],
        page: 1,
        isLoading: false,
      };
    },
    mounted() {
      this.loadImages();
      window.addEventListener('scroll', this.onScroll);
    },
    methods: {
      async loadImages() {
        if (this.isLoading) return;
        this.isLoading = true;
  
        const cachedData = localStorage.getItem('imageData');
        if (cachedData) {
          this.images = JSON.parse(cachedData);
          this.distributeImages();
          this.isLoading = false;
          return;
        }
  
        try {
          const response = await axios.get("https://api.unsplash.com/photos", {
            params: { page: this.page, per_page: 30 },
            headers: { Authorization: `Client-ID 你的_ACCESS_KEY` },
          });
  
          this.images.push(...response.data);
          localStorage.setItem('imageData', JSON.stringify(this.images));
          this.distributeImages();
          this.page++;
        } catch (error) {
          console.error("Error fetching images:", error);
        } finally {
          this.isLoading = false;
        }
      },
      distributeImages() {
        this.columns = [[], [], []];
        this.images.forEach((image, index) => {
          this.columns[index % 3].push(image);
        });
      },
      onScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
          this.loadImages();
        }
      }
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.onScroll);
    }
  };
  </script>
  
  <style scoped>
  .gallery {
    display: flex;
    gap: 10px;
    padding: 10px;
  }
  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .image-card img {
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  </style>
  