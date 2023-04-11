import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import http from 'http';                                        
import https from 'https';  
export const requests = axios.create({
  // 基础路径
  baseURL: "/api",
  // 超时时间
  timeout: 1*60*1000,
  //keepAlive pools and reuses TCP connections, so it's faster 
  // httpAgent: new http.Agent({ keepAlive: true }), 
  // httpsAgent: new https.Agent({ keepAlive: true }), 


});
// 请求拦截器，
requests.interceptors.request.use((config) => {
  // 逻辑业务处理
  // alert("马上出发嗷!");
  // console.log(config);
  // config是一个配置对象，对象里面的headers请求头属性很重要嗷
  return config;
});
// 响应拦截器，
requests.interceptors.response.use(
  // 成功的回调，返回数据data
  (res) => {
    // 成功的逻辑处理
    // alert("成辣！！！");
    return res.data;
  },
  //   失败的回调
  (error) => {
    // 失败的逻辑业务处理
    alert("寄辣！！！");
    console.log(error);
    return Promise.reject(new Error("faile"));
    // return console.log(error)
  }
);

export default class Api {
  instance: AxiosInstance;
  config: AxiosRequestConfig;
  interceptor?: Interceptor;
  loading: boolean;

  constructor(option: apiType) {
    this.config = option;
    this.interceptor = option.interceptor;
    this.loading = option.isloading ?? true;
    // 配置全局参数
    this.instance = axios.create(this.config);
    // 拦截器
    // 配置请求拦截器
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorErr
    );
    // 配置响应拦截器
    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responseInterceptorErr
    );

    // 请求拦截器嗷
    this.instance.interceptors.request.use((config) => {
      // 逻辑业务处理
      // console.log("马上出发嗷!");
      console.log(config);
      if (this.loading) {
        // Toast.show({
        //     icon: 'loading',
        //     content: '加载中…',
        //     duration: 0
        // });
        alert("在路上辣！！！别催辣！！！")
    }
      // config是一个配置对象，对象里面的headers请求头属性很重要嗷
      return config;
    });
    // 响应拦截器嗷
    this.instance.interceptors.response.use(
      // 成功的回调
      (res) => {
        // 成功的逻辑处理
        // console.log("肥来力！！！");
        // Toast.clear();
        return res
      },
      //   失败的回调
      (error) => {
        // 失败的逻辑业务处理
        // console.log("寄辣！！！");
        console.log(error);
        return Promise.reject(new Error("faile"));
        // return console.log(error)
      }
    );
  }
}

export interface apiType extends AxiosRequestConfig {
  isloading?: boolean;
  interceptor?: Interceptor;
}

export interface Interceptor {
  requestInterceptor: (res: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorErr?: (error: any) => any;
  responseInterceptor: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorErr?: (error: any) => any;
}
