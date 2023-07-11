<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import axios from '../../api/axios'
const router = useRouter()
let route = useRoute()
const showShare = ref(false)
const showBottom = ref(false)

const data = reactive({
  detail: {},
  replyCount: 0,
  replyChance: 0,
  recomList: []
})

const getDetail = (id) => {
  axios({
    url: '/product/detail/' + id,
    method: 'GET'
  }).then((res) => {
    console.log('详情', res)

    data.detail = res.data.data.storeInfo
    data.replyCount = res.data.data.replyCount
    data.replyChance = res.data.data.replyChance

    var arr = res.data.data.good_list

    data.recomList[0] = arr.slice(0, 6)
    data.recomList[1] = arr.slice(6, 12)
    data.recomList[2] = arr.slice(12, 18)
  })
}

onMounted(() => {
  getDetail(route.query.id)
})

const share = () => {
  showShare.value = true
}

const options = [
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link' },
  { name: '分享海报', icon: 'poster' },
  { name: '二维码', icon: 'qrcode' }
]

const onSelect = (option) => {
  showToast(option.name)
  showShare.value = false
}

const toDetail = (id) => {
  // 路由传参
  router.push('/detail?id=' + id)

  getDetail(id)
}

const toCart = () => {
  // 不能够直接跳转到购物车页面，需要判断用户是否登录
  // 判断的内容是缓存
  let token = localStorage.getItem('token')
  if (token) {
    // 如果用户登录，则允许跳转
    router.push('/shopcart')
  } else {
    // 如果用户未登录，则跳转登录页面
    router.push('/login')
  }
}

const showSku = () => {
  console.log(123)
  showBottom.value = true
}
</script>

<template>
  <div class="detail">
    <!-- 详情轮播图 -->
    <van-swipe>
      <van-swipe-item v-for="(item, index) in data.detail.slider_image" :key="index">
        <div
          class="detail-poster"
          :style="{ background: 'url(' + item + ')center center / 100% 100% no-repeat' }"
        ></div>
      </van-swipe-item>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
      </template>
    </van-swipe>

    <!-- 价格与分享 -->
    <div class="price-share">
      <div class="detail-price">
        ¥<span>{{ data.detail.price }}</span>
        <span>¥{{ data.detail.vip_price }}</span>
        <img src="../assets/images/vip.png" alt="" />
      </div>
      <div class="iconfont icon-fenxiang" @click="share"></div>
    </div>

    <!-- 商品介绍 -->
    <div class="detail-info">
      {{ data.detail.store_info }}

      <div class="detail-num">
        <div>原价:¥{{ data.detail.ot_price }}</div>
        <div>库存:{{ data.detail.stock }}</div>
        <div>销量:{{ data.detail.sales }}</div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="detail-comment">
      <van-cell :title="'用户评价(' + data.replyCount + ')'" is-link>
        <template #value>
          <span class="custom-title">{{ data.replyChance }}%</span>
          <span>好评率</span>
        </template>
      </van-cell>
    </div>

    <!-- 优品推荐 -->
    <div class="detail-recommend">
      <div class="title-recommend">
        <img src="../assets/images/point.png" alt="" />
        <div>优品推荐</div>
        <img src="../assets/images/point.png" alt="" />
      </div>

      <van-swipe class="my-swipe" :autoplay="5000">
        <van-swipe-item v-for="(item, index) in data.recomList" :key="index">
          <div class="recom-list">
            <div class="recom-list-item" @click="toDetail(i.id)" v-for="i in item" :key="i.id">
              <img :src="i.image" alt="" />
              <div>{{ i.store_name }}</div>
              <p>¥{{ i.price }}</p>
            </div>
          </div>
        </van-swipe-item>
        <template #indicator="{ active }">
          <div class="custom-indicator-recom">
            <div
              v-for="(item, index) in data.recomList"
              :key="index"
              :class="['inactive', index == active ? 'active' : '']"
            ></div>
          </div>
        </template>
      </van-swipe>
    </div>

    <!-- 产品介绍 -->
    <div class="detail-intro">
      <div class="title-intro">产品介绍</div>

      <div class="detail-desc" v-html="data.detail.description"></div>
    </div>

    <van-action-bar>
      <van-action-bar-icon icon="service-o" text="客服" />
      <van-action-bar-icon icon="like-o" text="收藏" />
      <van-action-bar-icon icon="shopping-cart-o" text="购物车" @click="toCart" />
      <van-action-bar-button color="#fa8013" type="warning" @click="showSku" text="加入购物车" />
      <van-action-bar-button color="#fc4141" type="danger" text="立即购买" />
    </van-action-bar>

    <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '30%' }">
      123
    </van-popup>

    <div class="blank"></div>

    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<style scoped lang="less">
.detail {
  background-color: #f5f5f5;

  .detail-poster {
    width: 100%;
    height: 375px;
  }

  .price-share {
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
    padding-top: 20px;
    color: #fc4141;
    align-items: center;
    background-color: white;

    .detail-price {
      display: flex;
      font-size: 14px;
      align-items: flex-end;

      span:nth-of-type(1) {
        font-size: 24px;
        color: #fc4141;
        margin-right: 10px;
        margin-left: 4px;
      }

      span:nth-of-type(2) {
        margin-right: 5px;
        color: #282828;
      }

      img {
        width: 23px;
        height: 10.5px;
      }
    }

    .icon-fenxiang {
      font-size: 22px;
      color: #828282;
    }
  }

  .detail-info {
    padding: 0 15px;
    padding-top: 10px;
    line-height: 24px;
    color: #333;
    background-color: white;

    .detail-num {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #82848f;
      margin-top: 10px;
    }
  }

  .detail-comment {
    margin: 10px 0;
  }

  .detail-recommend {
    background-color: white;

    .title-recommend {
      display: flex;
      font-size: 15px;
      justify-content: center;
      align-items: center;
      height: 50px;

      img {
        width: 15px;
        height: 15px;
      }

      div {
        margin: 0 10px;
        color: #e56852;
      }
    }

    .recom-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0 15px;
      padding-bottom: 30px;

      .recom-list-item {
        flex: 1;
        margin-top: 10px;

        img {
          width: 107.5px;
          height: 107.5px;
        }

        div {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 107.5px;
          font-size: 13px;
          color: #282828;
          margin: 10px 0;
        }

        p {
          color: #fc4141;
          font-size: 13px;
        }
      }
    }
  }

  .detail-intro {
    background-color: white;
    margin-top: 15px;

    .title-intro {
      height: 43px;
      text-align: center;
      line-height: 43px;
      font-size: 15px;
      color: #282828;
      padding: 0 15px;
    }

    .detail-desc {
      width: 100%;
      overflow: hidden;
    }
  }
}

.vjs-poster {
  background-color: red;
}

.blank {
  width: 100%;
  height: 50px;
}

div {
  box-sizing: border-box;
}

.custom-title {
  color: #fc4141;
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: #fff;
}

.custom-indicator-recom {
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;

  div.inactive {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fc4141;
    margin-right: 10px;
    opacity: 0.6;
  }

  div.active {
    background-color: #fc4141;
    opacity: 1;
  }
}
</style>
