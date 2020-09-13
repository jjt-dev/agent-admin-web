import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PageForm from 'src/components/PageForm'
import { findById } from 'src/utils/common'
import { useAccountPath } from 'src/utils/httpUtil'
import useFetch from 'src/hooks/useFetch'

const SchoolOrder = () => {
  const { allCourses } = useSelector((state) => state.app)
  const { schoolId, school } = useParams()
  const [accounts = []] = useFetch(useAccountPath)

  if (allCourses)
    return (
      <PageForm
        formItems={getFormItems(allCourses)}
        titlePrefix={school}
        backPath={`/school/${schoolId}/${school}/order/list`}
        defaultValues={{ schoolId }}
        apiPath="/client/account/school/createOrder"
        listens={getFormListens(accounts)}
      />
    )
}

export default SchoolOrder

const getFormItems = (allCourses) => [
  {
    comp: 'FormInput',
    name: 'schoolId',
    hide: true,
  },
  {
    label: '科目',
    comp: 'FormSelect',
    name: 'courseId',
    titleKey: 'name',
    options: allCourses,
  },
  {
    label: '账户余额',
    name: 'balance',
    comp: 'FormInput',
    disabled: true,
  },
  {
    label: '订单名额',
    comp: 'FormInputNum',
    name: 'amount',
    type: 'integer',
    min: 0,
  },
  {
    label: '名额单价',
    comp: 'FormInputNum',
    name: 'price',
    type: 'integer',
    min: 0,
    suffix: '元',
  },
  {
    label: '是否已支付',
    comp: 'FormEnableRadio',
    name: 'isPayed',
    initialValue: false,
    wrapperCol: { offset: 3 },
  },
  {
    label: '是否转移名额给代理',
    comp: 'FormEnableRadio',
    name: 'isTransfered',
    initialValue: false,
    labelCol: { span: 8 },
  },
]

const getFormListens = (accounts) => [
  {
    origin: 'amount',
    target: 'courseId',
    prop: 'max',
    getValue: (courseId, form) => {
      const account = findById(accounts, courseId, 'courseId')
      form.setFieldsValue({ balance: account.balance })
      return account.balance
    },
  },
]
