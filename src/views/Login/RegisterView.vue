<script setup>
import { getKey, getCodes, registers } from '../../api/login'
import { ref } from 'vue'
import { Image as VanImage } from 'vant'
import router from '../../router'

// 页面的key: 为了确保验证码一分钟只能发送一次
let key = ref('')
const tel = ref('') // 手机号
const password = ref('') // 密码
const code = ref('') // 验证码

// 页面进入,触发获取key值
getKey().then((res) => {
  console.log('res==>', res)
  key.value = res.data.data.key
})

// 获取验证码
const getCode = () => {
  getCodes(key.value, tel.value).then((res) => {
    console.log(res)
  })
}

// 注册方法
const onSubmit = (values) => {
  console.log('submit', values)
  registers(tel.value, code.value, password.value).then((re) => {
    console.log('注册', re)
    const result = true
    if (result) {
      router.replace('/login')
    }
  })
}
</script>

<template>
  <div class="wrapper">
    <div class="picture-back">
      <van-image width="70" height="70" src="http://47.115.51.185/h5/img/logo2.47964cc3.png" />
    </div>
    <div class="register">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <div class="title">注册账号</div>
          <van-field
            v-model="tel"
            name="电话号码"
            left-icon="phone-o"
            label=" "
            label-width="5px"
            placeholder="电话号码"
            :rules="[{ required: true, message: '请填写电话号码' }]"
          />

          <van-field
            v-model="code"
            name="验证码"
            label=" "
            label-width="5px"
            placeholder="验证码"
            left-icon="shield-o"
            color="#f35446"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #button>
              <van-button size="small" type="primary" color="#f35446" @click="getCode"
                >获取验证码</van-button
              >
            </template>
          </van-field>
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label=" "
            label-width="5px"
            placeholder="密码"
            left-icon="award-o"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px">
            <van-button
              round
              block
              type="primary"
              native-type="submit"
              color="linear-gradient(90deg,#f35447 0,#ff8e3c)"
            >
              注册
            </van-button>
          </div>
          <div style="text-align: center; margin-bottom: 10px">
            <span style="opacity: 70%; color: darkgrey">已有账号?</span>
            <a href="/login">立即登陆</a>
          </div>
        </van-cell-group>
      </van-form>
      <div class="footer"></div>
    </div>
  </div>
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
  .register {
    .title {
      font-size: 20px;
      text-align: center;
      margin: 20px;
    }

    a {
      color: #fc4141 !important;
    }

    .footer {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApQAAAAkCAYAAAA3mqpgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozZDUwNjlmMy05NjI1LTRhZTItYjMwNC0yZDQ0ZTM3ZDFjNjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REE5RjQyRjk3NzgzMTFFOTg0Q0Q5ODE4RDgwOTI2MTQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REE5RjQyRjg3NzgzMTFFOTg0Q0Q5ODE4RDgwOTI2MTQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowYjA0NzcxMC1kNmFhLTQzOTMtYWFhMC1jNjkxMWYyZDVmZWIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxMTViODdmNi0yNWY5LTE2NGQtYjUzOC02YzViOTc2NzVjOTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7UM78mAAADQ0lEQVR42uzdvYtUVxgH4DPDEGxsLAKmtFAECwvL/AFqYWmpgrWdWATsLEUwXVJtRLQNKeJnJXZuYSGoWRRR/EBhtwisG1n2eg5zLW2y98752OeB16l27p6PhZ8z95530nVdGFL3+K+l+HIoLNrml4Mhh67bFQCAuk0mG1muO/vhaYarPpkcPnFmyDecDhwm08uKXQkAUKyVPrOVGSh7j6wTAECxBs9qYwTKh7E+WysAgOJs9Fmt+EC5Huuu9QIAKM6dPqsVHyiTpVib1gwAoBgpm/0xxhuPFSjfxLph3QAAipGy2euaAmXyW/DENwBACVIm+32sNx8zUP4X60KsNWsIAJDNWp/JRjtrczryANJX3+dirVpLAICFW+2z2JsxLzJdwECexTobfP0NALBIK30Gezb2haYLGlBKxadjXQue/gYAGNNmn7lOh5E/mfxmtsDBfYn1a6w/Y52KdTSWPtgAAMNIz6/cDvOjgV4v8sKzDINNA7wU60qsn2MdiXUg1k+xdm/jd+piTewlAKAS3TZ+Nn0K+W+sd7Gex1oO8w446zkGMss4id866gzTVefTq7/jvz9mGMdBfw8AUL2nGa75Mezdf7yFyRs0UE4On8gT729dTi8vMwVKAID/40V4/0+YHDtf/UCmDS3KI/sSAKjIcisDaSlQ3ou1ZW8CABXY6rOLQFmYdFPqffsTAKjA/T67CJQFSscSrdujAEDB1vvM0ozWAuWHMD+SqLNXAYACdX1W+SBQli0dQ5TOuHQ/JQBQWpi8GoY6MlGgHN3NWOkZfF9/AwAlSJnkYqzrLQ5u2vDCPYh1sv9fgE8rAYActvoskjLJ7VYHOWt8EdP9Cb+E+Y2vqXd4avO4L9aeAceu5SMA1G3IZy9SS8TVMG+4ks6ZTEcDvW19Amc7ZKOkYLnU19BytXwEAIbxMdZx07DDA2WulkVaPgJAE17kzBMtmJqCbdPyEQDqtmwKBMrctHwEgHo11QJRoKyXlo8AUK+mWiAKlHXT8hEA6tNcC0SBsm5aPgJAXZpsgShQ1k/LRwCoJ0w22QJRoGyDlo8AULamWyAKlO3Q8hEAyrMjWiDmMjMFo1hEy0cA4Pt2ZAvEXL4KMADOrbHLPVnkIAAAAABJRU5ErkJggg==);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 80%;
      height: 1rem;
      margin: 0 auto;
    }
  }
}
</style>
