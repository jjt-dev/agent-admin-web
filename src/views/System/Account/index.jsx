import { Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import PageCustom from 'src/components/PageCustom'
import { getRow, tableOrder, getCustomRow } from 'src/utils/tableUtil'
import { findById } from 'src/utils/common'

const UserAccount = () => {
  const { user, allCourses } = useSelector((state) => state.app)
  const { agentInfo, accounts } = user || {}

  return (
    <PageCustom title={`${agentInfo?.name}账户信息`}>
      <Table
        rowKey="id"
        columns={getColumns(allCourses)}
        dataSource={accounts}
        style={{ width: '600px', margin: '0 auto' }}
        pagination={false}
        bordered
      />
    </PageCustom>
  )
}

export default UserAccount

const getColumns = (allCourses) => [
  tableOrder,
  getCustomRow('科目', (record) => findById(allCourses, record.courseId).name),
  getRow('余额', 'balance'),
]
