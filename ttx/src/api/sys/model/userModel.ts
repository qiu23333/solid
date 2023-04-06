/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  grantType: string;
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  code: string;
  verification?: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
  pswModified: string;
  followPasswdPolicy: boolean;
}

export interface DeptInfoModel {
  id?: number;
  logo?: string;
  deptFullname?: string;
  address?: string;
  leader?: string;
  phoneLocationCode?: string;
  leaderPhone?: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
  // 部门Id
  deptId: number;
  pswModified: string;
}
