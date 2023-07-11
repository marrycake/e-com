<script setup>
// 请求购物车数据
import { onMounted, reactive, ref } from 'vue'
import axios from '../../../api/axios'
import router from '../../../router'
var allChecked = ref(false)
var totalPrice = ref(0)
const data = reactive({
  list: []
})

onMounted(() => {
  let token = localStorage.getItem('token')
  if (token == null) {
    router.push('/login')
    return
  }
  axios({
    url: '/cart/list',
    method: 'GET',
    headers: {
      'Authori-Zation': 'Bearer ' + token
    }
  }).then((res) => {
    console.log(res)
    if (res.data.status == 200) {
      // 处理数据 将得到的购物车数据列表对象添加checked属性
      res.data.data.valid.forEach((item) => {
        item.checked = false
      })
      data.list = res.data.data.valid
    }
  })
})

const singleCheck = () => {
  console.log('check!!', data.list)
  // 单选 计算价格
  // 判断是否全部选中  数组中checked属性是否全部为真
  data.list.forEach((item) => {
    //
    if (item.checked == false) {
      allChecked.value = false
    }
  })
}

const allCheck = () => {
  // 全选被勾选 则单选全部取消
  // 全选未勾选 单选全部选中
  data.list.forEach((item) => {
    item.checked = true
  })
}
</script>

<template>
  <div class="cart" v-if="data.list.length > 0">
    <div class="top-tips">
      <div class="tips-item">
        <span class="iconfont icon-gouxuan"></span>
        <div>100%正品保证</div>
      </div>
      <div class="tips-item">
        <span class="iconfont icon-gouxuan"></span>
        <div>所有商品精挑细选</div>
      </div>
      <div class="tips-item">
        <span class="iconfont icon-gouxuan"></span>
        <div>售后无忧</div>
      </div>
    </div>

    <div class="nav">
      <div class="list-num">
        购物数量
        <span>{{ data.list.length }}</span>
      </div>
      <div class="admistrate">管理</div>
    </div>

    <div class="cart-list">
      <div class="cart-item" v-for="item in data.list" :key="item.id">
        <van-checkbox
          v-model="item.checked"
          @change="singleCheck"
          checked-color="#ee0a24"
        ></van-checkbox>
        <div class="cart-img">
          <img :src="item.productInfo.image" alt="" />
        </div>
        <div class="cart-info">
          <div class="cart-name">{{ item.productInfo.store_name }}</div>
          <div class="sku">属性{{ item.productInfo.attrInfo.suk }}</div>
          <div class="price-num">
            <div class="cart-price">¥{{ item.truePrice }}</div>
            <van-stepper v-model="item.cart_num" />
          </div>
        </div>
      </div>
    </div>

    <van-submit-bar :price="totalPrice * 100" button-text="提交订单">
      <van-checkbox @change="allCheck" v-model="allChecked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<style scoped lang="less">
.cart {
  background-color: #f5f5f5;
  height: 1000px;
  .top-tips {
    color: #8c8c8c;
    font-size: 12px;
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
    height: 38px;
    align-items: center;

    .tips-item {
      display: flex;
      align-items: center;

      div {
        margin-left: 3px;
      }
    }
  }

  .nav {
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    background-color: white;
    color: #282828;

    .list-num {
      font-size: 14px;

      span {
        color: #fc4141;
      }
    }

    .admistrate {
      font-size: 13px;
      border: 1px solid #868686;
      padding: 4px 13px;
      border-radius: 3px;
    }
  }

  .cart-list {
    .cart-item {
      width: 100%;
      height: 105px;
      background-color: white;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      box-sizing: border-box;
      align-items: center;
      .cart-img {
        width: 80px;
      }

      .cart-info {
        width: 222px;

        .cart-name {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .sku {
          margin: 10px 0;
          font-size: 12px;
          color: #868686;
        }

        .price-num {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}

/deep/ .van-submit-bar {
  bottom: 50px;
}
</style>
