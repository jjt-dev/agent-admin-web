import Button from 'antd/es/button'
import React from 'react'
import { useSelector } from 'react-redux'
import PageList from 'src/components/PageList'
import { findById } from 'src/utils/common'
import {
  getCustomRow,
  getDateRow,
  getRow,
  tableOrder,
} from 'src/utils/tableUtil'
import api from 'src/utils/api'
import { message } from 'antd'
import { useState } from 'react'
import UploadModal from './UploadModal'

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
        <Button
          size="small"
          type="primary"
          onClick={() => {
            dispatchUploadToUpperAgent(record.id)
          }}
        >
          提交申请
        </Button>
      )
    }

    if (record.isDealt) {
      return <div></div>
    }

    return (
      <Button
        onClick={() => {
          setSelectedUpload(record)
        }}
        type="primary"
      >
        点击上传
      </Button>
    )
  }

  const getColumns = () => [
    tableOrder,
    getCustomRow(
      '科目',
      (record) => findById(allCourses, record.courseId).name
    ),
    getRow('考试名称', 'title'),
    getDateRow('申请时间', 'createTime'),
    getDateRow('处理时间', 'dealTime'),
    getCustomRow('处理结果', customAction),
  ]

  return (
    <>
      <PageList columns={getColumns} size="small" showAdd={false} />
      {selectedUpload && (
        <UploadModal
          uploadItem={selectedUpload}
          hideModal={() => setSelectedUpload(null)}
        />
      )}
    </>
  )
}

export default TKDUploadList
