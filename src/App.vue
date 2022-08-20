<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
console.log('🚀【import.meta.env】', import.meta.env)
</script>

<template>
  <div class="wrapper">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <button @click="() => router.push({ path: '/home' })">首页</button>
    <button @click="() => router.push({ path: '/mine' })">个人中心页</button>
    <router-link to="/home">link-首页</router-link>
    <router-link to="/mine">link-个人中心</router-link>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  button {
    font-size: 40px;
  }
}
</style>

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
