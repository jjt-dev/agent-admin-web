import React from 'react'
import { useParams } from 'react-router'
import PageForm from 'src/components/PageForm'

const SchoolAdmin = () => {
  const { schoolId, school } = useParams()
  return (
    <PageForm
      formItems={formItems}
      titlePrefix={school}
      backPath={`/school/${schoolId}/${school}/admin/list`}
      params={{ schoolId }}
    />
  )
}

export default SchoolAdmin

const formItems = [
  {
    label: '名称',
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
    label: '密码',
    comp: 'FormInput',
    name: 'password',
    hide: 'isEdit',
    rules: [{ required: true }, { min: 6 }],
  },
  {
    label: '头像',
    name: 'faceUrl',
    comp: 'FormImage',
    message: '请上传头像',
  },
  {
    label: '手机号',
    comp: 'FormInput',
    name: 'phone',
  },
  {
    comp: 'FormEnableRadio',
  },
  {
    label: '邮箱',
    comp: 'FormInput',
    name: 'email',
    required: false,
  },
]
