<script setup>
import { ref, onMounted } from 'vue'
import axios from '../../api/axios'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
// 手机号和密码
const phone = ref('')
const password = ref('')
const qucikPhone = ref('')
const code = ref('')
const key = ref('')
// 正则验证 手机密码
const regPhone = /^1[3-9]\d{9}$/
const regPass = /^[A-Za-z]\w{5,15}$/
const regCode = /^[1-9]\w{5}$/

const active = ref(1)
const router = useRouter()

// 发起登录请求
const login = () => {
  axios({
    url: '/login',
    method: 'POST',
    // 向服务器发送的参数
    data: {
      account: phone.value,
      code: '',
      password: password.value
    }
  }).then((res) => {
    console.log('login', res)

    if (res.data.status == 200) {
      showToast(res.data.msg)
      // 登录成功 保存token到本地或者cookie

      localStorage.setItem('token', res.data.data.token)

      // 返回首页
      router.push('/')
    } else {
      showToast(res.data.msg)
    }
  })
}

const quickLogin = () => {
  axios({
    url: '/login/mobile',
    method: 'POST',
    data: {
      captcha: code.value,
      phone: qucikPhone.value,
      spread: null
    }
  }).then((res) => {
    console.log('手机登录', res)
    showToast(res.data.msg)
    if (res.data.status == 200) {
      localStorage.setItem('token', res.data.data.token)
      router.go(-1)
    }
  })
}

const sendCode = () => {
  // 判断手机号是否输入和输入内容是否满足正则
  if (qucikPhone.value !== 0 && regPhone.test(qucikPhone.value) == true) {
    axios({
      url: '/register/verify',
      method: 'POST',
      data: {
        code: '',
        key: key.value,
        phone: qucikPhone.value,
        type: 'login'
      }
    }).then((res) => {
      console.log('快速', res)
      showToast(res.data.msg)
    })
  } else {
    showToast('请输入正确手机号')
  }
}

onMounted(() => {
  axios({
    url: '/verify_code',
    method: 'get'
  }).then((res) => {
    console.log(res)
    key.value = res.data.data.key
  })
})
</script>

<template>
  <!-- 用户在登录后执行的操作怎么去判断用户是否登录
        当用户登录成功后服务器会返回一个验证令牌 token 
        当后续在执行操作时，向服务器发送请求时，服务器就会接收token
     -->
  <div class="login">
    <van-tabs v-model:active="active">
      <van-tab title="账号登录">
        <van-form>
          <van-cell-group inset>
            <!-- 通过 pattern 进行正则校验 -->
            <van-field
              v-model="phone"
              name="pattern"
              placeholder="请输入手机号"
              :rules="[{ pattern: regPhone, message: '请输入正确的手机号' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="pattern"
              placeholder="请输入密码"
              :rules="[{ pattern: regPass, message: '请输入正确的密码' }]"
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" @click="login" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="快速登录">
        <van-form>
          <van-cell-group inset>
            <van-field
              v-model="qucikPhone"
              name="手机号"
              label="手机号"
              placeholder="请输入手机号"
              :rules="[{ pattern: regPhone, message: '请输入正确的手机号' }]"
            />
            <van-field
              v-model="code"
              name="验证码"
              label="验证码"
              placeholder="请输入验证码"
              :rules="[{ pattern: regCode, required: true, message: '请填写正确验证码' }]"
            >
              <template #button>
                <van-button size="small" type="primary" @click="sendCode">发送验证码</van-button>
              </template>
            </van-field>
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block @click="quickLogin" type="primary" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>

  <van-toast></van-toast>
</template>

<style scoped></style>
