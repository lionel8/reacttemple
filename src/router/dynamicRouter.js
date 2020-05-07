import React from 'react'

import Loadable from 'react-loadable'
import { Spin } from 'antd'
const loading = () => <Spin />

// 登录
export const Login = Loadable({
  loader: () => import('../components/login'),
  loading
})
// 404
export const NotFound = Loadable({
  loader: () => import('../components/notfound'),
  loading
})

// 创建路由菜单
export const routerList = [
  {
    path: '/dashboard',
    component: Loadable({
      loader: () => import('../views/dashboard'),
      loading
    })
  }
]
