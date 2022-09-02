<script lang="ts">
import { defineComponent, onBeforeUpdate, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import Detail from './components/detail.vue'
import { useStore } from '@/store'
import { IRoomDetailParams } from '@/api/interface'

export default defineComponent({
  components: {
    Detail
  },
  setup() {
    const store = useStore()
    // const route = useRoute()
    // onBeforeUpdate(() => {
    //   // DOM更新前调用接口，asyncData并不起作用，这里也可以使用onUpdated钩子
    //   watchEffect(() => store.dispatch('getRoomDetail', route.params))
    // })
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
