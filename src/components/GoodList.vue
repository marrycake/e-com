<script setup>
import { useRoute } from 'vue-router'
import router from '../router'
const route = useRoute()
console.log(route)
// 定义变量去接收父组件的传值
defineProps({
  list: Array
})
</script>
<template>
  <div class="good-list">
    <div
      class="good-list-item"
      v-for="item in list"
      :key="item.id"
      @click="
        () => {
          router.push('/detail?id=' + item.id)
        }
      "
    >
      <div class="good-img">
        <img :src="item.image" alt="" />
      </div>
      <div class="good-info">
        <div class="good-name">{{ item.store_name }}</div>
        <div class="good-price">
          ¥ <span>{{ item.price }}</span>
        </div>

        <div class="price-cart">
          <div class="vip-price">
            <span>¥{{ item.vip_price }}</span>
            <img src="../assets/images/vip.png" alt="" />
            <span class="solded">已售{{ item.sales }}{{ item.unit_name }}</span>
          </div>
          <div class="cart">
            <van-icon color="red" size="16" name="shopping-cart-o" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.good-list-item {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  .good-img {
    width: 90px;
    height: 90px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .good-info {
    width: 245px;
    .good-name {
      font-size: 15px;
      color: #222;
      // 单行文本溢出省略号
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .good-price {
      font-size: 13px;
      color: #fc4141;
      margin-top: 25px;

      span {
        font-size: 17px;
      }
    }

    .price-cart {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      font-size: 12px;
      align-items: center;

      img {
        width: 23px;
        height: 10.5px;
      }

      .solded {
        color: #aaa;
        margin-left: 10px;
      }

      .cart {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 1px solid #ff3700;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
