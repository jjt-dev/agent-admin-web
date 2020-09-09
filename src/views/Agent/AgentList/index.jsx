import React from 'react'
import PageList from 'src/components/PageList'
import {
  getActionRow,
  getCustomRow,
  getDateRow,
  getRow,
  getSwitchRow,
  tableOrder,
} from 'src/utils/tableUtil'

const AgentList = () => {
  return <PageList columns={getColumns} />
}

export default AgentList

const getColumns = (deleteAgent, updateAgentStatus) => [
  tableOrder,
  getRow('代理商名称', 'name'),
  // getCustomRow(
  //   '代理级别',
  //   (record) => findById(agentLevels, record.currLevelId).name
  // ),
  getRow('电话', 'phone'),
  getSwitchRow(updateAgentStatus),
  getDateRow('创建时间', 'createTime'),
  getRow('联系人', 'linkMan'),
  getActionRow((record) => `/agent/edit/${record.id}`, deleteAgent),
]
