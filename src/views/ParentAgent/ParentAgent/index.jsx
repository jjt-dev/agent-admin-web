import { Descriptions } from 'antd'
import React from 'react'
import PageCustom from 'src/components/PageCustom'
import useFetch from 'src/hooks/useFetch'

const ParentAgent = () => {
  const [parentAgent = {}] = useFetch(`/user/parentAgent`)

  return (
    <PageCustom title="上级代理信息">
      <Descriptions bordered layout="vertical">
        <Descriptions.Item label="上级代理">
          {parentAgent.name}
        </Descriptions.Item>
        <Descriptions.Item label="联系人">
          {parentAgent.linkMan}
        </Descriptions.Item>
        <Descriptions.Item label="联系电话">
          {parentAgent.phone}
        </Descriptions.Item>
      </Descriptions>
    </PageCustom>
  )
}

export default ParentAgent
