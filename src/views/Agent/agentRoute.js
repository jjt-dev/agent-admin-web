import AgentList from './AgentList'
import Agent from './Agent'
import AgentAdminList from './AgentAdminList'
import AgentAdmin from './AgentAdmin'
import AgentOrderList from './AgentOrderList'
import AgentOrder from './AgentOrder'
import AgentAccount from './AgentAccount'

const agentRoute = [
  {
    path: '/agent/list',
    editPath: '/agent/edit',
    apiPath: '/client/agent',
    title: '代理商',
    comp: AgentList,
  },
  {
    path: '/agent/edit',
    apiPath: '/client/agent',
    title: '代理商',
    comp: Agent,
    back: {
      path: '/agent/list',
      breadcrumbs: ['代理商列表', '新增代理商'],
    },
  },
  {
    path: '/agent/edit/:id',
    apiPath: '/client/agent',
    title: '代理商',
    comp: Agent,
    back: {
      path: '/agent/list',
      breadcrumbs: ['代理商列表', '编辑代理商'],
    },
  },
  {
    path: '/agent/:agentId/:agent/admin/list',
    apiPath: '/client/agent/admin',
    titleProp: 'username',
    title: '管理员',
    comp: AgentAdminList,
    back: {
      path: '/agent/list',
      breadcrumbs: ['代理商列表', '管理员列表'],
    },
  },
  {
    path: '/agent/:agentId/:agentName/admin/edit',
    apiPath: '/client/agent/admin',
    title: '管理员',
    comp: AgentAdmin,
    back: {
      path: '/agent/:agentId/:agentName/admin/list',
      params: ['agentId', 'agentName'],
      breadcrumbs: ['代理商列表', '管理员列表', '新增管理员'],
    },
  },
  {
    path: '/agent/:agentId/:agentName/admin/edit/:id',
    apiPath: '/client/agent/admin',
    title: '管理员',
    comp: AgentAdmin,
    back: {
      path: '/agent/:agentId/:agentName/admin/list',
      params: ['agentId', 'agentName'],
      breadcrumbs: ['代理商列表', '管理员列表', '编辑管理员'],
    },
  },
  {
    path: '/agent/:agentId/:agent/order/list',
    apiPath: '/client/account/branchAgent/orders',
    title: '订单',
    comp: AgentOrderList,
    back: {
      path: '/agent/list',
      breadcrumbs: ['代理商列表', '订单列表'],
    },
  },
  {
    path: '/agent/:agentId/:agentName/order/edit',
    title: '订单',
    comp: AgentOrder,
    back: {
      path: '/agent/:agentId/:agentName/order/list',
      params: ['agentId', 'agentName'],
      breadcrumbs: ['代理商列表', '订单列表', '新增订单'],
    },
  },
  {
    path: '/agent/:agentId/:agentName/order/edit/:id',
    title: '订单',
    comp: AgentOrder,
    back: {
      path: '/agent/:agentId/:agentName/order/list',
      params: ['agentId', 'agentName'],
      breadcrumbs: ['代理商列表', '订单列表', '编辑订单'],
    },
  },
  {
    path: '/agent/:agentId/:agentName/account',
    menuPath: '/agent/list',
    comp: AgentAccount,
    back: {
      path: '/agent/list',
      params: ['agentId', 'agentName'],
      breadcrumbs: ['代理商列表', '代理商账户信息'],
    },
  },
]

export default agentRoute
