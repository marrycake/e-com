<script setup>
import { Search, Swipe, SwipeItem } from 'vant'
import { ref } from 'vue'
import { defineComponent } from 'vue'
const vanSearch = defineComponent(Search)
const vanSwipe = defineComponent(Swipe)
const vanSwipeItem = defineComponent(SwipeItem)

const value = ref('')
// logo图片路径
const logoUrl = ref(
  'http://47.115.51.185//uploads/attach/2021/04/20210407/ef7e2b395c2530647be1a8c2996df91b.png'
)
</script>
<template>
  <div class="top-nav">
    <!-- logo -->
    <img :src="logoUrl" alt="" />
    <van-search v-model="value" shape="round" background="#fff" placeholder="搜索商品" />
  </div>

  <div class="swiper-container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped lang="less">
.top-nav {
  display: flex;
  padding-top: 0px;
  padding-bottom: 0px;
  align-items: center;
  justify-content: space-between;
  img {
    width: 63.5px;
    height: 22.5px;
  }
}

.swiper-container {
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}
</style>
