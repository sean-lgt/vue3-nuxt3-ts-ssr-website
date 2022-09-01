<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const fetchApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      count.value = 6
      resolve(true)
    }, 1500)
  })
}
await fetchApi()
</script>

<template>
  <div class="order-popover-wrapper">
    <ul>
      <li v-for="i in count" :key="i">
        <img src="../../../assets/images/home/banner.jpg" alt="" />
        <div class="mess">
          <p class="title">北京四合院</p>
          <p class="info">234/晚 * 1个人</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.order-popover-wrapper ul::-webkit-scrollbar {
  width: 8px; /* 纵向滚动条*/
  height: 8px; /* 横向滚动条 */
  background-color: #fff;
}

/*定义滚动条轨道 内阴影*/
.order-popover-wrapper ul::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: #f2f2f2;
  /* background-color: #ffffff; */
  cursor: pointer;
}

/*定义滑块 内阴影*/
.order-popover-wrapper ul::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgba(144, 147, 153, 0.3);
  transition: background-color 0.3s;
}
.order-popover-wrapper ul::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, 0.5);
}

ul {
  @include placeholder-order;
}
li {
  @include flex-layout(row, space-between, center);
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  &:last-child {
    border-bottom: none;
  }
  img {
    width: 65px;
    height: 45px;
    border-radius: 4px;
    margin-right: 5px;
    object-fit: cover;
  }
  .mess {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 5px;
    width: 100px;
    overflow: hidden;
    p {
      line-height: 16px;
      font-weight: normal;
      margin: 5px 0;
      max-width: 100px;
    }
    .title {
      font-weight: bold;
      color: #333;
      font-size: 14px;
      display: inline-block;
      @include line-text-overflow;
    }
    .info {
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
