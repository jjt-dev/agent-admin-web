import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PageForm from 'src/components/PageForm'
import useFetch from 'src/hooks/useFetch'
import { findById } from 'src/utils/common'
import { useTypes } from 'src/utils/const'
import { agentInfoPath, useAccountPath } from 'src/utils/httpUtil'

const AgentOrder = () => {
  const { allCourses } = useSelector((state) => state.app)
  const { agentId, agentName } = useParams()
  const [useType, setUseType] = useState(useTypes.exam.id)
  const [{ price } = {}, fetchAgent] = useFetch(agentInfoPath(agentId, useType))
  const [accounts = []] = useFetch(useAccountPath)

  const fieldsChangeCallback = (field) => {
    const [fieldName] = field.name
    if (fieldName === 'useType') {
      setUseType(field.value)
    }
  }

  useEffect(() => {
    fetchAgent(agentInfoPath(agentId, useType))
  }, [agentId, fetchAgent, useType])

  return (
    <PageForm
      formItems={getFormItems(allCourses)}
      titlePrefix={agentName}
      backPath={`/agent/${agentId}/${agentName}/order/list`}
      defaultValues={{
        price,
        targetAgentId: agentId,
        useType,
      }}
      apiPath="/client/account/branchAgent/createOrder"
      listens={getFormListens(accounts)}
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
