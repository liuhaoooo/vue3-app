import axios from 'axios'
import router from '../router'
import { message } from 'ant-design-vue';
import { rsaEnc_tool, rsaDec_tool,loading_tool } from "../utils/tools";
message.config({
  top: `150px`,
  duration: 3,
  maxCount: 3,
});
const request = axios.create({
  baseURL: '/cgi',
  timeout: 5000,
});
// 请求拦截器
request.interceptors.request.use((config) => {
  config.method = 'post'
  return config;
}, (error) => {
  message.error('请求出错，请检查网络')
  loading_tool(false)
  return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use((response) => {
  if (!response.data.success&&response.data.message=="NO_AUTH") {
    router.push("/login");
  }
  return response.data;
}, (error) => {
  message.error('请求出错，请检查网络')
  loading_tool(false)
  return Promise.reject(error);
});

export const axiosRequest_get = async (data) => {
  data.method = 'GET'
  data.sessionId = rsaDec_tool(sessionStorage['sessionId']) || ''
  let res = await request({ data })
  return res
}
export const axiosRequest_post = async (data) => {
  data.method = 'POST'
  data.sessionId = rsaDec_tool(sessionStorage['sessionId']) || ''
  let res = await request({ data })
  return res
}