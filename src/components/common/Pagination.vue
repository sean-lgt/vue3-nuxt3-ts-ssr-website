<script setup lang="ts">
import { computed, defineEmits } from 'vue'
import { useStore } from '@/store'

const store = useStore()
// 使用计算属性映射 store 中的值
const pageNo = computed(() => store.state.pageNo)
const pageSize = computed(() => store.state.pageSize)
const total = computed(() => store.state.total)

const emit = defineEmits<{
  (e: 'changePage', pageNo: number): void
}>()

// 页面改变时通知父组件
const changePage = (pageNo: number) => {
  console.log('🚀【子组件中-pageNo】', pageNo)
  emit('changePage', pageNo)
}
</script>

<template>
  <el-pagination
    v-model:currentPage="pageNo"
    :page-size="pageSize"
    :total="total"
    background
    layout="prev,pager,next"
    prev-text="<<"
    next-text=">>"
    @current-change="changePage"
  ></el-pagination>
</template>

<style lang="scss" scoped></style>
