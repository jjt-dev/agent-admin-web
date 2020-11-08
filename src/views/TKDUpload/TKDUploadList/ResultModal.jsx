import './index.less'

import { Modal } from 'antd'
import React from 'react'
import CustomTable from 'src/components/CustomTable'
import useTableFetch from 'src/hooks/useTableFetch'
import { getRow, tableOrder } from 'src/utils/tableUtil'
import { local, TOKEN } from 'src/utils/storage'

const ResultModal = ({ uploadItem, hideModal }) => {
  const tableList = useTableFetch(`/uploadReq/fail/page`, {
    uploadId: uploadItem.id,
  })

  const downloadResult = () => {
    window.open(
      `${process.env.REACT_APP_API_ROOT}/uploadReq/fail/exportExcel?uploadId=${
        uploadItem.id
      }&token=${encodeURIComponent(local.getItem(TOKEN))}`,
      '_blank'
    )
  }

  return (
    <Modal
      title="上传失败列表"
      wrapClassName="upload-tkd-result-modal"
      visible={true}
      onOk={downloadResult}
      onCancel={hideModal}
      cancelText="取消"
      okText="下载"
      width="1200px"
    >
      <CustomTable {...tableList} columns={getColumns()} />
    </Modal>
  )
}

export default ResultModal

const getColumns = () => [
  tableOrder,
  getRow('学校名称', 'schoolName'),
  getRow('考试名称', 'examName'),
  getRow('考生名称', 'studentName'),
  getRow('身份证号', 'idCardNum'),
  getRow('等级', 'levelName'),
  getRow('上传失败原因', 'reason'),
]
