import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLoginStore = defineStore('login', () => {
  let token = ref('')

  const changeToken = (message) => {
    token.value = message
    console.log('pinia.token ==> ', token.value)

    localStorage.setItem('token', message)
  }

  const tokens = () => {
    if (token.value) return token.value

    let myToken = localStorage.getItem('token')

    token.value = myToken ? myToken : token.value

    return token.value
  }

  return {
    token,
    changeToken,
    tokens
  }
})

export { useLoginStore }
