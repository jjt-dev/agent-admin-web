import { Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import PageCustom from 'src/components/PageCustom'
import { findById, findUseType } from 'src/utils/common'
import { getCustomRow, getRow, tableOrder } from 'src/utils/tableUtil'
import { useAccountPath } from 'src/utils/httpUtil'
import useFetch from 'src/hooks/useFetch'

const UserAccount = () => {
  const { user, allCourses } = useSelector((state) => state.app)
  const { agentInfo } = user || {}
  const [accounts = []] = useFetch(useAccountPath)

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
  getCustomRow('余额类型', (record) => findUseType(record.useType).name),
]
