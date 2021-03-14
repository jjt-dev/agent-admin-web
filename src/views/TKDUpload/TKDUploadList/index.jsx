import { message } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import PageList from 'src/components/PageList'
import api from 'src/utils/api'
import { findById } from 'src/utils/common'
import {
  getCustomRow,
  getDateRow,
  getRow,
  tableOrder,
} from 'src/utils/tableUtil'

import UploadModal from './UploadModal'
import ResultModal from './ResultModal'

const TKDUploadList = () => {
  const { allCourses, allUploadSettings } = useSelector((state) => state.app)
  const [selectedUpload, setSelectedUpload] = useState()

  const dispatchUploadToUpperAgent = async (uploadId) => {
    await api.post(`/uploadReq/deal?id=${uploadId}`)
    message.success('上传中跆协申请成功')
  }

  const customAction = (record) => {
    const { canUpload } = findById(allUploadSettings, record.courseId)
    if (!canUpload) {
      return record.isDealt ? (
        '已提交申请'
      ) : (
        <span
          className="table-action"
          onClick={() => {
            dispatchUploadToUpperAgent(record.id)
          }}
        >
          提交申请
        </span>
      )
    }

    return (
      <span
        className="table-action"
        onClick={() => {
          setSelectedUpload(record)
        }}
      >
        {record.isDealt ? '查看结果' : '点击上传'}
      </span>
    )
  }

  const getColumns = () => [
    tableOrder,
    getCustomRow(
      '科目',
      (record) => findById(allCourses, record.courseId).name
    ),
    getRow('考试名称', 'title'),
    getRow('考生数', 'studentCount'),
    getDateRow('申请时间', 'createTime'),
    getDateRow('处理时间', 'dealTime'),
    getCustomRow('处理结果', customAction),
  ]

  return (
    <>
      <PageList columns={getColumns} size="small" showAdd={false} />
      {selectedUpload && !selectedUpload.isDealt && (
        <UploadModal
          uploadItem={selectedUpload}
          hideModal={() => setSelectedUpload(null)}
        />
      )}
      {selectedUpload && selectedUpload.isDealt && (
        <ResultModal
          uploadItem={selectedUpload}
          hideModal={() => setSelectedUpload(null)}
        />
      )}
    </>
  )
}

export default TKDUploadList
