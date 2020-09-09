import React from 'react'
import PageForm from 'src/components/PageForm'

const Agent = () => {
  return <PageForm formItems={formItems} />
}

export default Agent

const formItems = [
  {
    label: '手机号',
    comp: 'FormInput',
    name: 'phone',
  },
  {
    label: '姓名',
    comp: 'FormInput',
    name: 'username',
    disabled: 'isEdit',
  },
  {
    label: '昵称',
    comp: 'FormInput',
    name: 'nickname',
  },
  {
    comp: 'FormEnableRadio',
  },
  {
    label: '描述',
    comp: 'FormInput',
    type: 'textarea',
    name: 'note',
    required: false,
  },
]
