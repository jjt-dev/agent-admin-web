import React from 'react'
import { useParams } from 'react-router'
import PageList from 'src/components/PageList'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useTableFetch from 'src/hooks/useTableFetch'
import {
  getActionRow,
  getAvatarRow,
  getDateRow,
  getRow,
  getSwitchRow,
  tableOrder,
  changePsdAction,
} from 'src/utils/tableUtil'

const SchoolAdminList = () => {
  const { schoolId, school } = useParams()
  const { apiPath } = useActiveRoute()
  const adminList = useTableFetch(`${apiPath}/page`, { schoolId })
  const addAdminPath = `/school/${schoolId}/${school}/admin/edit`
  return (
    <PageList
      columns={getColumns(addAdminPath)}
      defaultTableList={adminList}
      title={`${school}管理员`}
      addCallback={addAdminPath}
    />
  )
}

export default SchoolAdminList

const getColumns = (addAdminPath) => (
  deleteSchool,
  updateSchoolStatus,
  selectAdmin
) => [
  tableOrder,
  getRow('名称', 'username'),
  getRow('昵称', 'nickname'),
  getAvatarRow(),
  getRow('电话', 'phone'),
  getSwitchRow(updateSchoolStatus),
  getDateRow('创建时间', 'createTime'),
  getRow('邮箱', 'email'),
  getActionRow(
    (record) => `${addAdminPath}/${record.id}`,
    deleteSchool,
    changePsdAction(selectAdmin)
  ),
]
