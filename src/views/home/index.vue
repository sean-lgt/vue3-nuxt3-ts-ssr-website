<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
console.log("🚀【route】", route.params);
</script>

<template>
  <div>
    首页
    <button @click="() => router.push({ path: '/mine', query: { id: 1 } })">
      跳转到个人中心
    </button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
