import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PageForm from 'src/components/PageForm'
import { useTypes } from 'src/utils/const'

const SchoolOrder = () => {
  const { allCourses, user } = useSelector((state) => state.app)
  const { schoolId, school } = useParams()
  const [courseId, setCourseId] = useState()
  const [account, setAccount] = useState()

  const fieldsChangeCallback = (field) => {
    const [fieldName] = field.name
    if (fieldName === 'courseId') {
      setCourseId(field.value)
    }
  }

  useEffect(() => {
    if (user) {
      const account = user.accounts.find(
        (item) =>
          item.courseId === courseId &&
          String(item.useType) === useTypes.exam.id
      )
      setAccount(account)
    }
  }, [courseId, user])

  return (
    <PageForm
      formItems={getFormItems(allCourses)}
      titlePrefix={school}
      backPath={`/school/${schoolId}/${school}/order/list`}
      defaultValues={{
        schoolId,
        price: account?.price,
        balance: account?.balance,
      }}
      apiPath="/client/account/school/createOrder"
      fieldsChangeCallback={fieldsChangeCallback}
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
    label: '是否转移名额给学校',
    comp: 'FormEnableRadio',
    name: 'isTransfered',
    initialValue: false,
    labelCol: { span: 8 },
  },
]
