<script setup>
import { Tabbar, TabbarItem, NavBar } from 'vant'
import { ref } from 'vue'
const active = ref(0)
const leftArrow = ref(false)
const title = ref('首页')

const tabBarTitles = ['首页', '分类', '购物车', '我的']

const onChange = (index) => {
  title.value = tabBarTitles[index]
}
</script>

<template>
  <div class="wrapper">
    <NavBar :title="title" :left-arrow="leftArrow"></NavBar>
    <RouterView />

    <Tabbar v-model="active" @change="onChange">
      <TabbarItem icon="wap-home-o" replace to="/home">{{ tabBarTitles[0] }}</TabbarItem>
      <TabbarItem icon="search" replace to="/category">{{ tabBarTitles[1] }}</TabbarItem>
      <TabbarItem icon="shopping-cart-o" replace to="/cart">{{ tabBarTitles[2] }}</TabbarItem>
      <TabbarItem icon="user-circle-o" replace to="/owner">{{ tabBarTitles[3] }}</TabbarItem>
    </Tabbar>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
