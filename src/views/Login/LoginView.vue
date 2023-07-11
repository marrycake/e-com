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
  <div class="wrapper">
    <div class="picture-back">
      <van-image width="70" height="70" src="http://47.115.51.185/h5/img/logo2.47964cc3.png" />
    </div>
    <div class="login">
      <van-cell-group inset>
        <van-tabs v-model:active="active" style="margin-top: 3vh">
          <template #nav-left>
            <div style="width: 10vw"></div>
          </template>
          <template #nav-right>
            <div style="width: 10vw"></div>
          </template>
          <van-tab>
            <template #title>
              <div class="custom-title">
                <span style="font-weight: bold; font-size: 18px">账号登录</span>
              </div>
            </template>
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
                <div style="margin: 16px">
                  <van-button round block type="primary" @click="login" native-type="submit">
                    登录
                  </van-button>
                </div>
              </van-cell-group>
            </van-form>
          </van-tab>
          <van-tab>
            <template #title>
              <div class="custom-title">
                <span style="font-weight: bold; font-size: 18px">快速登录</span>
              </div>
            </template>
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
                    <van-button size="small" type="primary" @click="sendCode"
                      >发送验证码</van-button
                    >
                  </template>
                </van-field>
                <div style="margin: 16px">
                  <van-button round block @click="quickLogin" type="primary" native-type="submit">
                    登录
                  </van-button>
                </div>
              </van-cell-group>
            </van-form>
          </van-tab>
        </van-tabs>
      </van-cell-group>
      <div class="footer"></div>
    </div>
  </div>

  <van-toast></van-toast>
</template>

<style scoped lang="less">
.wrapper {
  padding-top: 10%;
  background: linear-gradient(180deg, #eb5447 0, #ff8e3b);
  height: 100vh;
  width: 100vw;
  .van-field {
    font-size: medium;
  }
  .picture-back {
    width: calc(sqrt(pow(70px, 2) * 2));
    height: calc(sqrt(pow(70px, 2) * 2));
    border-radius: 50%;
    margin: 0px auto;
    margin-bottom: 30px;
    background-color: hsla(0, 0%, 100%, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login {
    margin: 0px auto;
    width: 90vw;

    .custom-title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
    }
    a {
      color: #fc4141 !important;
    }

    .footer {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApQAAAAkCAYAAAA3mqpgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozZDUwNjlmMy05NjI1LTRhZTItYjMwNC0yZDQ0ZTM3ZDFjNjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REE5RjQyRjk3NzgzMTFFOTg0Q0Q5ODE4RDgwOTI2MTQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REE5RjQyRjg3NzgzMTFFOTg0Q0Q5ODE4RDgwOTI2MTQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowYjA0NzcxMC1kNmFhLTQzOTMtYWFhMC1jNjkxMWYyZDVmZWIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxMTViODdmNi0yNWY5LTE2NGQtYjUzOC02YzViOTc2NzVjOTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7UM78mAAADQ0lEQVR42uzdvYtUVxgH4DPDEGxsLAKmtFAECwvL/AFqYWmpgrWdWATsLEUwXVJtRLQNKeJnJXZuYSGoWRRR/EBhtwisG1n2eg5zLW2y98752OeB16l27p6PhZ8z95530nVdGFL3+K+l+HIoLNrml4Mhh67bFQCAuk0mG1muO/vhaYarPpkcPnFmyDecDhwm08uKXQkAUKyVPrOVGSh7j6wTAECxBs9qYwTKh7E+WysAgOJs9Fmt+EC5Huuu9QIAKM6dPqsVHyiTpVib1gwAoBgpm/0xxhuPFSjfxLph3QAAipGy2euaAmXyW/DENwBACVIm+32sNx8zUP4X60KsNWsIAJDNWp/JRjtrczryANJX3+dirVpLAICFW+2z2JsxLzJdwECexTobfP0NALBIK30Gezb2haYLGlBKxadjXQue/gYAGNNmn7lOh5E/mfxmtsDBfYn1a6w/Y52KdTSWPtgAAMNIz6/cDvOjgV4v8sKzDINNA7wU60qsn2MdiXUg1k+xdm/jd+piTewlAKAS3TZ+Nn0K+W+sd7Gex1oO8w446zkGMss4id866gzTVefTq7/jvz9mGMdBfw8AUL2nGa75Mezdf7yFyRs0UE4On8gT729dTi8vMwVKAID/40V4/0+YHDtf/UCmDS3KI/sSAKjIcisDaSlQ3ou1ZW8CABXY6rOLQFmYdFPqffsTAKjA/T67CJQFSscSrdujAEDB1vvM0ozWAuWHMD+SqLNXAYACdX1W+SBQli0dQ5TOuHQ/JQBQWpi8GoY6MlGgHN3NWOkZfF9/AwAlSJnkYqzrLQ5u2vDCPYh1sv9fgE8rAYActvoskjLJ7VYHOWt8EdP9Cb+E+Y2vqXd4avO4L9aeAceu5SMA1G3IZy9SS8TVMG+4ks6ZTEcDvW19Amc7ZKOkYLnU19BytXwEAIbxMdZx07DDA2WulkVaPgJAE17kzBMtmJqCbdPyEQDqtmwKBMrctHwEgHo11QJRoKyXlo8AUK+mWiAKlHXT8hEA6tNcC0SBsm5aPgJAXZpsgShQ1k/LRwCoJ0w22QJRoGyDlo8AULamWyAKlO3Q8hEAyrMjWiDmMjMFo1hEy0cA4Pt2ZAvEXL4KMADOrbHLPVnkIAAAAABJRU5ErkJggg==);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 80vw;
      height: 1rem;
      margin: 0 auto;
    }
  }
}
</style>
