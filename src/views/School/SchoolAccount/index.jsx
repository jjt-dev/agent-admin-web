import { Table } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
import PageCustom from 'src/components/PageCustom'
import useFetch from 'src/hooks/useFetch'
import { getRow, tableOrder } from 'src/utils/tableUtil'
import { agentAccountPath } from 'src/utils/httpUtil'

const SchoolAccount = () => {
  const { schoolId, school } = useParams()
  const [agentAccount = []] = useFetch(agentAccountPath(schoolId))

  return (
    <PageCustom title={`${school}账户信息`}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={agentAccount}
        style={{ width: '600px', margin: '0 auto' }}
        pagination={false}
        bordered
      />
    </PageCustom>
  )
}

export default SchoolAccount

const columns = [
  tableOrder,
  getRow('科目', 'courseName'),
  getRow('余额', 'balance'),
]
