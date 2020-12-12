import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PageForm from 'src/components/PageForm'
import useFetch from 'src/hooks/useFetch'
import { useTypes } from 'src/utils/const'
import { agentInfoPath } from 'src/utils/httpUtil'

const AgentOrder = () => {
  const { allCourses, user } = useSelector((state) => state.app)
  const [account, setAccount] = useState()
  const { agentId, agentName } = useParams()
  const [courseId, setCourseId] = useState()
  const [useType, setUseType] = useState(useTypes.exam.id)
  const [{ price } = {}, fetchAgent] = useFetch()

  const fieldsChangeCallback = (field) => {
    const [fieldName] = field.name
    if (fieldName === 'useType') {
      setUseType(field.value)
    }
    if (fieldName === 'courseId') {
      setCourseId(field.value)
    }
  }

  useEffect(() => {
    if (user) {
      const account = user.accounts.find(
        (item) => item.courseId === courseId && String(item.useType) === useType
      )
      setAccount(account)
    }
  }, [courseId, useType, user])

  useEffect(() => {
    if (courseId) {
      fetchAgent(agentInfoPath(courseId, agentId, useType))
    }
  }, [agentId, courseId, fetchAgent, useType])

  return (
    <PageForm
      formItems={getFormItems(allCourses)}
      titlePrefix={agentName}
      backPath={`/agent/${agentId}/${agentName}/order/list`}
      defaultValues={{
        price,
        balance: account?.balance ?? 0,
        useType,
        targetAgentId: agentId,
      }}
      apiPath="/client/account/branchAgent/createOrder"
      fieldsChangeCallback={fieldsChangeCallback}
    />
  )
}

export default AgentOrder

const getFormItems = (allCourses) => [
  {
    comp: 'FormInput',
    name: 'targetAgentId',
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
    label: '订单类型',
    comp: 'FormSelect',
    name: 'useType',
    titleKey: 'name',
    options: Object.values(useTypes),
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
