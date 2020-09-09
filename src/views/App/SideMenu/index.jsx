import './index.less'

import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'

const SideMenu = () => {
  const history = useHistory()
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState([menus[0].key])

  const handleClick = (e) => {
    const clickedMenu = menus.find((menu) => menu.key === e.key)
    history.push(clickedMenu.path)
  }

  useEffect(() => {
    const menu = menus.find((item) => location.pathname.startsWith(item.prefix))
    if (menu) {
      setSelectedKeys([menu.key])
    }
  }, [location.pathname, setSelectedKeys])

  return (
    <Menu
      className="side-menu"
      selectedKeys={selectedKeys}
      mode="inline"
      onClick={handleClick}
    >
      {menus.map((menu) => {
        return (
          <Menu.Item key={menu.key}>
            {menu.icon}
            <span>{menu.title}</span>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default SideMenu

const menus = [
  {
    key: '0',
    path: '/agent/list',
    prefix: '/agent',
    icon: <UserOutlined />,
    title: '我的代理',
  },
  {
    key: '1',
    path: '/school/list',
    prefix: '/school',
    icon: <HomeOutlined />,
    title: '我的学校',
  },
]
