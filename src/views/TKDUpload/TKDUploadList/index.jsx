import Button from 'antd/es/button'
import React from 'react'
import { useSelector } from 'react-redux'
import PageList from 'src/components/PageList'
import { findById } from 'src/utils/common'
import {
  getActionRow,
  getCustomRow,
  getDateRow,
  getRow,
  tableOrder,
} from 'src/utils/tableUtil'

const TKDUploadList = () => {
  const { allCourses, allUploadSettings } = useSelector((state) => state.app)

  return <PageList columns={getColumns(allCourses)} size="small" />
}

export default TKDUploadList

const getColumns = (allCourses) => () => [
  tableOrder,
  getCustomRow('科目', (record) => findById(allCourses, record.courseId).name),
  getRow('考试名称', 'title'),
  getDateRow('申请时间', 'createTime'),
  getDateRow('处理时间', 'dealTime'),
  getActionRow((record) => `/school/edit/${record.id}`),
]

const customAction = (allUploadSettings) => (record) => {
  const { canUpload } = findById(allUploadSettings, record.courseId)
  if (!canUpload) {
    return record.isDealt ? (
      '已提交申请'
    ) : (
      <Button type="primary">提交申请</Button>
    )
  }
}
