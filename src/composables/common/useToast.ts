import { ref } from 'vue'

/**
 * @description: Toast Hook 函数
 * @return {*}
 */
export default function useToast() {
  const visibleToast = ref(false)
  let timer: any
  function showToast(duration: number) {
    visibleToast.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      visibleToast.value = false
    }, duration)
  }
  return {
    visibleToast,
    showToast
  }
}
