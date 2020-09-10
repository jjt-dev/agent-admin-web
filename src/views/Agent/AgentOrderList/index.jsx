import { message, modal } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
import PageList from 'src/components/PageList'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useTableFetch from 'src/hooks/useTableFetch'
import api from 'src/utils/api'
import { updateOrderPath } from 'src/utils/httpUtil'
import {
  getCustomRow,
  getDateRow,
  getOperationRow,
  getRow,
  tableOrder,
} from 'src/utils/tableUtil'

const { confirm } = modal

const AgentOrderList = () => {
  const { agentId, agent } = useParams()
  const { apiPath } = useActiveRoute()
  const adminList = useTableFetch(`${apiPath}/page`, { agentId })
  const addOrderPath = `/agent/${agentId}/${agent}/order/edit`
  return (
    <PageList
      columns={getColumns}
      defaultTableList={adminList}
      title={`${agent}订单`}
      addCallback={addOrderPath}
    />
  )
}

const updateOrder = (order, type) => {
  const msg = updateOrderMessage[type]

  confirm({
    title: `请问您确认要${msg}吗?`,
    content: `订单名额数量: ${order.amount}`,
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      await api.post(updateOrderPath(order.id, type))
      message.success(`成功${msg}`)
    },
    onCancel() {
      console.log('Cancel')
    },
  })
}

export default AgentOrderList

const getColumns = () => [
  tableOrder,
  getRow('科目', 'courseName'),
  getRow('订单数量', 'amount'),
  getCustomRow('订单单价', (record) => `${record.price}元`),
  getOperationRow('是否已支付', 'isPayed', '支付', (record) =>
    updateOrder(record, 'confirmPay')
  ),
  getOperationRow('是否已转移给代理', 'isTransfered', '转移', (record) =>
    updateOrder(record, 'comfirmTransfer')
  ),
  getDateRow('创建时间', 'createTime'),
]

const updateOrderMessage = {
  confirmPay: '完成支付',
  comfirmTransfer: '转移订单给代理商',
}
