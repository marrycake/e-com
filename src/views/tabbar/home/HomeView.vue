<script setup>
import goodList from '../../../components/GoodList.vue'
// 导入封装的axios
import axios from '../../../api/axios'
import { onMounted, reactive, ref } from 'vue'

// 搜索框的值
const value = ref('')
// logo图片路径
const logoUrl = ref('')

const data = reactive({
  banner: [],
  menus: [],
  roll: [],
  goodList: {}
})

// 请求首页数据
onMounted(() => {
  axios({
    url: '/index',
    method: 'GET'
  }).then((res) => {
    console.log(res)
    data.banner = res.data.data.banner
    data.menus = res.data.data.menus
    data.roll = res.data.data.roll
    data.goodList = res.data.data.info
    logoUrl.value = res.data.data.logoUrl
  })
})
</script>

<template>
  <div class="home">
    <!-- 顶部logo和搜索框 -->
    <div class="top-nav">
      <!-- logo -->
      <img :src="logoUrl" alt="" />
      <van-search v-model="value" shape="round" background="#fff" placeholder="搜索商品" />
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe autoplay="5000">
        <van-swipe-item v-for="item in data.banner" :key="item.id">
          <img class="banner-img" :src="item.pic" alt="" />
        </van-swipe-item>
        <template #indicator="{ active }">
          <div
            v-for="(item, index) in data.banner"
            :key="index"
            :style="{ left: 170 + index * 15 + 'px' }"
            :class="['custom-indicator', active == index ? 'custom-indicator-active' : '']"
          ></div>
        </template>
      </van-swipe>
    </div>
    <!-- 首页菜单 -->
    <div class="menu">
      <!-- 路由跳转组件 -->
      <router-link v-for="item in data.menus" :key="item.id" :to="item.wap_url">
        <img :src="item.pic" alt="" />
        <p>{{ item.name }}</p>
      </router-link>
    </div>
    <!-- 新闻简报 -->
    <div class="roll">
      <div class="roll-img">
        <img src="../../../assets/images/roll-news.png" alt="" />
      </div>
      <van-swipe style="height: 38.5px" autoplay="3000" vertical :show-indicators="false">
        <van-swipe-item v-for="item in data.roll" :key="item.id">
          <van-cell
            title-class="info-cell"
            title-style="{font-size: 12px;color: #333;}"
            :title="item.info"
            is-link
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 快速选择 -->
    <div class="fast">
      <van-cell
        class="fast-cell"
        title-style="color:#282828;font-size:15px;font-weight:700;"
        title="快速选择"
        is-link
        value-class="more"
        value="更多"
      />
      <van-swipe class="fast-swipe" :loop="false" :width="90" :show-indicators="false">
        <van-swipe-item
          class="fast-item"
          v-for="(item, index) in data.goodList.fastList"
          :key="index"
        >
          <div class="fast-img">
            <img :src="item.pic" alt="" />
          </div>
          <p>{{ item.cate_name }}</p>
        </van-swipe-item>
        <van-swipe-item class="last-item"> </van-swipe-item>
        <van-swipe-item class="last-item"> </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 精品推荐 -->
    <div class="bast">
      <van-cell
        class="bast-cell"
        title-style="color:#282828;font-size:15px;font-weight:700;"
        title="精品推荐"
        is-link
        value-class="more"
        value="更多"
      />

      <van-swipe class="bast-swipe">
        <van-swipe-item v-for="item in data.goodList.bastBanner" :key="item.id">
          <img class="bast-img" :src="item.img" alt="" />
        </van-swipe-item>
        <template #indicator="{ active }">
          <div class="custom-indicator-bast-box">
            <span
              v-for="(item, index) in data.goodList.bastBanner"
              :key="item.id"
              :class="[
                'custom-indicator-bast',
                active == index ? 'custom-indicator-bast-active' : ''
              ]"
            ></span>
          </div>
        </template>
      </van-swipe>
    </div>
    <!-- 商品列表 -->
    <div class="good-list-box">
      <good-list :list="data.goodList.bastList"></good-list>
    </div>
    <!-- 占位 -->
    <div class="blank"></div>
  </div>
</template>

<style scoped lang="less">
.top-nav {
  display: flex;
  padding: 0px 20px;
  align-items: center;
  justify-content: space-between;

  img {
    width: 63.5px;
    height: 22.5px;
  }

  .van-search {
    width: 260px;
  }
}

.banner {
  width: 100%;
  height: 187.5px;

  .banner-img {
    width: 100%;
    height: 187.5px;
  }
}

.menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  a {
    width: 25%;
    text-align: center;
    padding: 5px 0;
    margin-bottom: 10px;

    img {
      width: 45px;
      height: 45px;
    }

    p {
      font-size: 13px;
      color: #333;
      margin: 10px 0;
    }
  }
}

.roll {
  display: flex;
  padding: 0 15px;
  height: 38.5px;
  border: 1px solid #f4f4f4;
  align-items: center;
  box-shadow: 0 0.1rem 0.3rem #f5f5f5;

  .roll-img {
    width: 74.5px;
    height: 14px;
  }

  .van-cell {
    width: 280px;
  }
}

.fast {
  margin-top: 10px;
  padding: 0px 15px;
  .fast-cell {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .fast-swipe {
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f4f4f4;

    .fast-item {
      border-bottom: 3px solid #47b479;
      margin-left: 15px;

      .fast-img {
        width: 90px;
        height: 90px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      p {
        font-size: 12px;
        color: #282828;
        width: 90px;
        height: 30px;
        text-align: center;
        padding: 5px;
        box-sizing: border-box;
        border-left: 1px solid #f4f4f4;
        border-right: 1px solid #f4f4f4;
      }
    }

    .fast-item:nth-of-type(3n-1) {
      border-bottom: 3px solid #579afe;
    }

    .fast-item:nth-of-type(3n) {
      border-bottom: 3px solid #ff6960;
    }

    .last-item {
      width: 500px !important;
      height: 100px;
    }
  }
}

.bast {
  padding: 0 15px;
  margin-top: 10px;

  .bast-cell {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }

  .bast-swipe {
    height: 150px;
  }

  .bast-img {
    height: 130px;
  }

  .custom-indicator-bast-box {
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    .custom-indicator-bast {
      background-color: #fc4141;
      box-sizing: border-box;
      border-radius: 50%;
      margin-left: 3px;
      width: 3.5px;
      height: 3.5px;
      display: block;
      opacity: 0.6;
    }

    .custom-indicator-bast-active {
      width: 10px;
      background-color: #fc4141;
      box-sizing: border-box;
      border-radius: 12px;
      opacity: 1;
    }
  }
}
.good-list-box {
  padding: 0 15px;
}

.custom-indicator {
  position: absolute;
  left: calc((375px / 2) - 5px);
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background-color: #fff;
  opacity: 0.6;
}

.custom-indicator-active {
  opacity: 1;
}

.blank {
  width: 100%;
  height: 200px;
}

// 深度样式
:deep(.info-cell) {
  span {
    color: #666;
    font-size: 12px;
  }
}

:deep(.more) {
  font-size: 12px;
  color: #666;
}
</style>
