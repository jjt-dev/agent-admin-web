import { Modal, Alert, Form, Input, message } from 'antd'
import React from 'react'
import { useState } from 'react'
import api from 'src/utils/api'

const UploadModal = ({ uploadItem, hideModal }) => {
  const [userName, setUserName] = useState('')

  const uploadTkd = async () => {
    if (!userName) {
      message.error('请首先输入中跆协用户名')
      return
    }
    await api.post(
      `/uploadReq/deal?id=${uploadItem.id}&ztxUserName=${userName}`
    )
    message.success('上传进行中，请稍后刷新查看状态')
  }

  return (
    <Modal
      title="上传中跆协"
      wrapClassName=""
      visible={true}
      onOk={uploadTkd}
      onCancel={hideModal}
      cancelText="取消"
      okText="上传"
    >
      <Alert message="请首先登录中跆协网站并保持登录状态。" type="warning" />
      <Form.Item name="中跆协用户名">
        <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
      </Form.Item>
    </Modal>
  )
}

export default UploadModal
