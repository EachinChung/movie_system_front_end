import store from '@/store'

// 储存获得的token
export function handleToken(tokens) {
  localStorage.setItem("refreshToken", tokens.refresh_token)
  store.commit("upAccessToken", tokens.access_token)
}
