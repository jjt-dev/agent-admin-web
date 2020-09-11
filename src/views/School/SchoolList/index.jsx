import React from 'react'
import PageList from 'src/components/PageList'
import { schoolUrl } from 'src/utils/const'
import {
  getAvatarRow,
  getDateRow,
  getExternalLinkRow,
  getRow,
  getSwitchRow,
  tableOrder,
  getLinkRow,
  getActionRow,
} from 'src/utils/tableUtil'

const SchoolList = () => {
  return <PageList columns={getColumns} size="small" />
}

export default SchoolList

const getColumns = (deleteSchool, updateSchoolStatus) => [
  tableOrder,
  getRow('学校名称', 'name'),
  getAvatarRow({ name: 'logoUrl', size: 30 }),
  getSwitchRow(),
  getExternalLinkRow(schoolUrl),
  getLinkRow('管理员', `/school/:id/:name/admin/list`),
  getRow('联系人', 'linkMan'),
  getRow('联系人电话', 'linkPhone'),
  getDateRow('创建时间', 'createTime'),
  getActionRow((record) => `/school/edit/${record.id}`, deleteSchool),
]
