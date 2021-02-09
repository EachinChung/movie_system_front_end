import axios from 'axios'
import store from "@/store"
import router from "@/router"
import { handleToken } from "@/services/token"
import { ElMessage } from 'element-plus';

const requests = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
})

requests.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers.Authorization = `Bearer ${store.state.accessToken}`
    return config
  },
  error => {
    // do something with request error
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

requests.interceptors.response.use(
  response => {
    if (response.data.code === "0401") return axios({
      url: "/api/auth",
      method: "put",
      data: {
        refresh_token: localStorage.getItem("refreshToken")
      },
      withCredentials: true,
      timeout: 30000,
    }).then(res => {
      if (res.data.code === "0000") {
        const tokens = res.data.data
        handleToken(tokens)
        response.config.headers.Authorization = `Bearer ${tokens.accessToken}`
        return axios(response.config)
      } else {
        localStorage.clear()
        const next = `${document.location.pathname}${document.location.hash}`
        router.push({ path: "/login", query: { next } })
        return response
      }
    }); else return response
  },
)

/**
 * 接口返回数据处理，此处只针对有返回情况
 * @param response // 接口返回消息
*/
const handlerData = (response) => {
  if (response.code === "0000") {
    return response.data
  } else {
    ElMessage.error(response.message)
    throw response
  }
}

requests.get = async (url, params = {}, config = {}) => {
  const requestsConfig = {
    url,
    method: 'get',
    params,
    ...config
  }
  const res = await requests(requestsConfig)
  return handlerData(res.data)
}

requests.post = async (url, data = {}, config = {}) => {
  const requestsConfig = {
    url,
    method: 'post',
    data,
    ...config
  }
  const res = await requests(requestsConfig)
  return handlerData(res.data)
}

requests.put = async (url, data = {}, config = {}) => {
  const requestsConfig = {
    url,
    method: 'put',
    data,
    ...config
  }
  const res = await requests(requestsConfig)
  return handlerData(res.data)
}

export default requests
