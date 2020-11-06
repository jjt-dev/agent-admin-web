import React from 'react'
import PageList from 'src/components/PageList'
import {
  getActionRow,
  getCustomRow,
  getDateRow,
  getLinkRow,
  getRow,
  tableOrder,
} from 'src/utils/tableUtil'

const TKDUploadList = () => {
  return <PageList columns={getColumns} size="small" />
}

export default TKDUploadList

const getColumns = () => [
  tableOrder,
  getRow('考试名称', 'title'),
  // getCustomRow('状态', record=>),
  getDateRow('申请时间', 'createTime'),
  getDateRow('处理时间', 'dealTime'),
  getLinkRow('管理员', `/school/:id/:name/admin/list`),
  getActionRow((record) => `/school/edit/${record.id}`),
]
