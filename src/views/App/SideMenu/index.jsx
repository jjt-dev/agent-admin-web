import './index.less'

import {
  HomeOutlined,
  UserOutlined,
  AccountBookOutlined,
  CloudUploadOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router'
import useUser from 'src/hooks/useUser'

const SideMenu = () => {
  const history = useHistory()
  const location = useLocation()
  const { isLastAgentLevel } = useUser()
  const menus = useMemo(() => getMenus(isLastAgentLevel), [isLastAgentLevel])
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
  }, [location.pathname, menus, setSelectedKeys])

  return (
    <Menu
      className="side-menu"
      selectedKeys={selectedKeys}
      mode="inline"
      onClick={handleClick}
    >
      {menus
        .filter((item) => item.show !== false)
        .map((menu) => {
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

const getMenus = (isLastAgentLevel) => [
  {
    key: '0',
    path: '/system/account',
    prefix: '/system',
    icon: <AccountBookOutlined />,
    title: '我的账号',
  },
  {
    key: '1',
    path: '/agent/list',
    prefix: '/agent',
    icon: <UserOutlined />,
    title: '我的代理',
    show: !isLastAgentLevel,
  },
  {
    key: '2',
    path: '/school/list',
    prefix: '/school',
    icon: <HomeOutlined />,
    title: '我的学校',
  },
  {
    key: '3',
    path: '/tkd-upload/list',
    prefix: '/tkd-upload',
    icon: <CloudUploadOutlined />,
    title: '上传中跆协',
  },
  {
    key: '4',
    path: '/setting/list',
    prefix: '/setting',
    icon: <SettingOutlined />,
    title: '参数设置',
  },
]
