import './index.less'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { formLayout } from 'src/utils/const'
import api from 'src/utils/api'

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 5 },
  },
}

const examFormLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
}

const UploadModal = ({ uploadItem, hideModal }) => {
  const [form] = Form.useForm()
  const [account, setAccount] = useState()
  const [placeLeft, setPlaceLeft] = useState({})

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      console.log('Success:', values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const getExamLeftPlace = async (index) => {
    const exams = form.getFieldValue('exams')
    const result = await api.get(
      `/uploadReq/getAmtByZtxExamId?ztxAccount=${account}&examId=${exams[index]}`
    )
    setPlaceLeft({ ...placeLeft, [index]: result })
  }

  return (
    <Modal
      title="上传中跆协 (请首先登录中跆协网站并保持登录状态)"
      wrapClassName="upload-tkd-modal"
      visible={true}
      onOk={handleOk}
      onCancel={hideModal}
      cancelText="取消"
      okText="上传"
    >
      <Form {...formLayout} form={form}>
        <Form.Item label="考试">
          <Input value={uploadItem.title} readOnly />
        </Form.Item>
        <Form.Item label="中跆协账号" name="account" rules={ruleRequired}>
          <Input onChange={(e) => setAccount(e.target.value)} />
        </Form.Item>
        {account && (
          <Form.List name="exams">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => {
                  return (
                    <div key={field.key} className="exam-id-item">
                      <Form.Item
                        {...field}
                        label={`考试序号${index + 1}`}
                        key={field.key}
                        rules={ruleRequired}
                        {...examFormLayout}
                      >
                        <Input onBlur={() => getExamLeftPlace(index)} />
                      </Form.Item>
                      <div className="exam-action">
                        <Input
                          value={`剩余${placeLeft[index] ?? 0}位`}
                          readOnly
                        />
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </div>
                    </div>
                  )
                })}
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    style={{ width: '78%' }}
                  >
                    添加考试序号
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        )}
      </Form>
    </Modal>
  )
}

export default UploadModal

const ruleRequired = [
  {
    required: true,
  },
]
