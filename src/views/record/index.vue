<script setup lang="ts">
import { getCurrentInstance, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRecordApi } from '@/api/record'
import { useStore } from '@/store'

const { proxy }: any = getCurrentInstance()
const store = useStore()
const router = useRouter()

const recordData = ref()
const loading = ref(true)

// 查询历史足迹
const fetchRecordList = () => {
  getRecordApi().then((res: any) => {
    const { success, message, result } = res
    loading.value = false
    if (success) {
      console.log('历史足迹数据', res)
      recordData.value = result
    } else {
      proxy.$message.error(message)
    }
  })
}

onMounted(() => {
  if (store.state.userStatus) {
    fetchRecordList()
  } else {
    const { pathname } = window.location
    router.replace({
      path: '/login',
      query: {
        redirect: pathname
      }
    })
  }
})
</script>
<template>
  <div>{{ recordData }}</div>
</template>

<style scoped></style>
