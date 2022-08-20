<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const router = useRouter()
const route = useRoute()
console.log('🚀【route】', route.params)
console.log('🚀【i18n】', useI18n)
const { t } = useI18n()
</script>

<template>
  <div>
    {{ t('message.home') }}
    <div class="text">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt placeat
      iure iusto, itaque dolor perferendis veniam, eaque cumque quae
      exercitationem in quis natus aliquam eos, consequatur sunt quos neque
      dolore?
    </div>
    <button @click="() => router.push({ path: '/mine', query: { id: 1 } })">
      跳转到个人中心
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/home/index.scss';
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
