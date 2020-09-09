import AgentList from './AgentList'
import Agent from './Agent'

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
]

export default agentRoute
