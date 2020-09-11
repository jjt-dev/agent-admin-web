import React from 'react'
import { useSelector } from 'react-redux'
import PageForm from 'src/components/PageForm'

const School = () => {
  const { allCourses } = useSelector((state) => state.app)
  return <PageForm formItems={getFormItems(allCourses)} />
}

export default School

const getFormItems = (allCourses) => [
  {
    label: '学校名称',
    comp: 'FormInput',
    name: 'name',
  },
  {
    label: '科目',
    comp: 'FormSelect',
    name: 'courseId',
    titleKey: 'name',
    options: allCourses,
  },
  {
    label: '头像',
    name: 'logoUrl',
    comp: 'FormImage',
    message: '请上传头像',
  },
  {
    label: '手机号',
    comp: 'FormInput',
    name: 'phone',
  },
  {
    label: '联系人',
    comp: 'FormInput',
    name: 'linkMan',
  },
  {
    comp: 'FormEnableRadio',
  },
  {
    label: '备注',
    comp: 'FormInput',
    type: 'textarea',
    name: 'note',
    required: false,
  },
]
