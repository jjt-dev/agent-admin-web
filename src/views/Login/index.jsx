import './index.less'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import * as FA from 'react-fontawesome'
import { useDispatch } from 'react-redux'
import * as appAction from 'src/actions/app'
import loginLogo from 'src/images/login_logo.png'
import api from 'src/utils/api'
import { loginPath } from 'src/utils/httpUtil'
import { local, PAGE_RELOADED, TOKEN } from 'src/utils/storage'

const Login = ({ history }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    if (!local.getItem(PAGE_RELOADED)) {
      local.setItem(PAGE_RELOADED, 'true')
      window.location.reload()
    }
  }, [])

  const onFinish = async (values) => {
    const { username, password } = values
    try {
      const result = await api.post(loginPath(username, password))
      local.setItem(TOKEN, result)
      dispatch(appAction.getUserInfo())
      history.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <img src={loginLogo} alt="图片" />
        <div className="login-container__content">
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item>
              <Divider type="vertical" />
              <span className="login-title">代理商管理</span>
            </Form.Item>
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form>
        </div>
        <FA name="check-circle" />
      </div>
    </div>
  )
}

export default Login
