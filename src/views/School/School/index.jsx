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
    name: 'courseIds',
    titleKey: 'name',
    options: allCourses,
    mode: 'multiple',
    editFn: (school) => school.courseIds.split(',').map((id) => Number(id)),
  },
  {
    label: '头像',
    name: 'logoUrl',
    comp: 'FormImage',
    message: '请上传头像',
    noImageCrop: true,
  },
  {
    label: '联系人',
    comp: 'FormInput',
    name: 'linkMan',
  },
  {
    label: '联系电话',
    comp: 'FormInput',
    name: 'linkPhone',
  },
  {
    comp: 'FormEnableRadio',
  },
  {
    label: '地址',
    comp: 'FormInput',
    name: 'address',
  },
  {
    label: '营业执照',
    comp: 'FormInput',
    name: 'businessLicenseUrl',
    required: false,
  },
  {
    label: '网站',
    comp: 'FormInput',
    name: 'website',
    required: false,
  },
  {
    label: '描述',
    comp: 'FormInput',
    type: 'textarea',
    name: 'note',
    required: false,
  },
]
