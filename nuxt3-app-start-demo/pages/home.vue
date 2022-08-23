<script setup>
// key
const { data } = await useAsyncData("ssr", () =>
  $fetch("http://127.0.0.1:3008/nuxt3/api/getList?pageSize=30&pageNo=1")
);
console.log("🚀【result】", data.value);
const dataList = data.value.data;
</script>

<template>
  <div>Page Visils:</div>
  <div v-for="(item, index) in dataList" class="list-item">
    <span>{{ item.chat_cnt }}</span>
    <span>{{ item.message_cnt }}</span>
    <span>{{ item.new_apply_cnt }}</span>
    <span>{{ item.stat_time }}</span>
  </div>
</template>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
}
.list-item span {
  margin-right: 20px;
}
</style>