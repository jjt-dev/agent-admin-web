import React from 'react'
import PageList from 'src/components/PageList'
import useAvailableLevels from 'src/hooks/useAvailableLevels'
import { findById } from 'src/utils/common'
import {
  getActionRow,
  getCustomRow,
  getDateRow,
  getLinkRow,
  getRow,
  getSwitchRow,
  tableOrder,
} from 'src/utils/tableUtil'

const AgentList = () => {
  const agentLevels = useAvailableLevels()
  return (
    <PageList
      columns={getColumns(agentLevels)}
      showAdd={agentLevels.length > 0}
    />
  )
}

export default AgentList

const getColumns = (agentLevels) => (deleteAgent, updateAgentStatus) => [
  tableOrder,
  getRow('代理商名称', 'name'),
  getLinkRow('管理员', `/agent/:id/:name/admin/list`),
  getLinkRow('订单', `/agent/:id/:name/order/list`),
  getCustomRow(
    '代理级别',
    (record) => findById(agentLevels, record.currLevelId).name
  ),
  getRow('电话', 'phone'),
  getSwitchRow(updateAgentStatus),
  getDateRow('创建时间', 'createTime'),
  getRow('联系人', 'linkMan'),
  getActionRow((record) => `/agent/edit/${record.id}`, deleteAgent),
]
