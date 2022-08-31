<script lang="ts">
import { defineComponent } from 'vue'
import Detail from './components/detail.vue'
import { useStore } from '@/store'
import { IRoomDetailParams } from '@/api/interface'

export default defineComponent({
  components: {
    Detail
  },
  setup() {
    const store = useStore()
  },
  asyncData({ store, route }: any) {
    console.log('🚀【asyncData --- 详情页】', store)
    // const { pageNo } = store.state
    return store.dispatch('fetchRoomDetail', {
      id: 1
    } as IRoomDetailParams)
  }
})
</script>
<template>
  <Detail></Detail>
</template>

<style lang="scss">
@import '@/assets/scss/detail/index.scss';
</style>
