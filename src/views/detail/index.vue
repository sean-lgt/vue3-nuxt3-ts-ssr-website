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
  // asyncData 属于自己定义的钩子函数，在里面只能 取store、route
  asyncData({ store, route }: any) {
    console.log('🚀【asyncData --- 详情页】', store)
    console.log('🚀【钩子路由---】', route)

    const { roomId } = store.state
    const { id } = route.value.params
    return store.dispatch('fetchRoomDetail', {
      id: roomId || id
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
