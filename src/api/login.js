// 1.将 axios请求配置导入
// r如果这里没有 "./" 默认从全局的项目导入axios
import axios from './axios'

// 实现登录
const login = (tel, password) => {
  return axios({
    method: 'post',
    url: '/login',
    data: {
      account: tel,
      code: '',
      password: password
    }
  })
}

// 注册功能
// 进入注册页面, 获取验证码的key
const getKey = () => {
  return axios({
    method: 'get',
    url: '/verify_code'
  })
}

// 获取注册二维码
const getCodes = (key, tel) => {
  return axios({
    method: 'post',
    url: '/register/verify',
    data: {
      code: '',
      key: key, // 页面的key
      phone: tel, // 手机号
      type: 'register'
    }
  })
}

// 通过二维码注册账号
const registers = (tel, code, password) => {
  return axios({
    method: 'post',
    url: '/register',
    data: {
      account: tel, // 账号
      captcha: code, // 验证码
      password: password, // 密码
      spread: null
    }
  })
}

export { login, getKey, getCodes, registers }
