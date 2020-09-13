import React from 'react'
import PageForm from 'src/components/PageForm'
import useAvailableLevels from 'src/hooks/useAvailableLevels'

const Agent = () => {
  const agentLevels = useAvailableLevels()
  return <PageForm formItems={getFormItems(agentLevels)} />
}

export default Agent

const getFormItems = (agentLevels) => [
  {
    label: '代理商名称',
    comp: 'FormInput',
    name: 'name',
  },
  {
    label: '代理级别',
    comp: 'FormSelect',
    name: 'currLevelId',
    titleKey: 'name',
    options: agentLevels,
  },
  {
    label: '联系人',
    comp: 'FormInput',
    name: 'linkMan',
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
    label: '备注',
    comp: 'FormInput',
    type: 'textarea',
    name: 'note',
    required: false,
  },
]
