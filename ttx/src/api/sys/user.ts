import { requests } from '../request';
import { LoginParams, LoginResultModel, GetUserInfoModel, DeptInfoModel } from './model/userModel';
import { defHttp } from '/@/utils/http/axios';
export enum Api {
  TestRetry = '/testRetry',
  Login = '/system/login',
  Logout = '/system/logout',
  GetUserInfo = '/system/sysUser/getUserInfo',
  GetPermCode = '/system/sysUser/selectPermCodeWithList',
  getAccountInfo = '/system/sysUser/getAccountInfo',
  saveAccountInfo = '/system/sysUser/saveAccountInfo',
  captchImage = '/system/getCaptchaImage',
  checkPwd = '/system/checkPwd',
  changePasswd = '/system/sysUser/changePasswd',
  deptInfo = '/system/sysConfig/querySystemSetting/',
}

type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

/**
* @description: user login api
*/
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getCaptchImage() {
  return requests.post({ url: Api.captchImage });
}
