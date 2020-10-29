import { Form, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import FormBottom from 'src/components/FormBottom'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useFetch from 'src/hooks/useFetch'
import usePageForm from 'src/hooks/usePageForm'
import api from 'src/utils/api'
import { buildFormPath, isNotEmpty, deepClone } from 'src/utils/common'
import { formLayout } from 'src/utils/const'

import FormDate from '../FormDate'
import FormEnableRadio from '../FormEnableRadio'
import FormImage from '../FormImage'
import FormInput from '../FormInput'
import FormInputNum from '../FormInputNum'
import FormSelect from '../FormSelect'
import { useCallback } from 'react'

const PageForm = ({
  callback,
  formItems: defaultFormItems,
  titlePrefix = '',
  params: defaultParams = {},
  defaultValues,
  backPath: customBackPath,
  apiPath: customApiPath,
  listens,
  handleFinish,
  fieldsChangeCallback,
}) => {
  const history = useHistory()
  const [formItems, setFormItems] = useState(defaultFormItems)
  const { path, title, back, apiPath = path } = useActiveRoute()
  const [form] = Form.useForm()
  const [entityId, isEdit, status] = usePageForm()
  const [entity] = useFetch(
    getEntityPath(isEdit, apiPath, customApiPath, entityId)
  )
  const backPath = customBackPath ?? back?.path

  useEffect(() => {
    if (entity) {
      form.setFieldsValue(entity)
      formItems.forEach((item) => {
        if (item.editFn) {
          form.setFieldsValue({ [item.name]: item.editFn(entity) })
        }
      })
    } else {
      form.setFieldsValue(null)
    }
  }, [entity, form, formItems])

  useEffect(() => {
    setFormItems(defaultFormItems)
  }, [defaultFormItems])

  const listenActions = useCallback(
    (values) => {
      if (listens) {
        let itemsPristine = true
        const formItemCloned = deepClone(formItems)
        listens.forEach((listen) => {
          if (isNotEmpty(values[listen.target])) {
            formItemCloned.forEach((item) => {
              if (item.name === listen.origin) {
                const newValue = listen.getValue(values[listen.target], form)
                if (newValue !== item[listen.prop]) {
                  itemsPristine = false
                  item[listen.prop] = newValue
                }
              }
            })
          }
        })
        if (!itemsPristine) {
          setFormItems(formItemCloned)
        }
      }
    },
    [form, formItems, listens]
  )

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue(defaultValues)
      listenActions(defaultValues)
    }
  }, [defaultValues, form, listenActions])

  const onFinish = async (values) => {
    if (handleFinish) {
      values = handleFinish(values)
    }
    if (!!entityId) {
      values.id = entityId
    }
    await api.post(
      buildFormPath(getFormPath(apiPath, customApiPath), {
        ...values,
        ...defaultParams,
      })
    )
    message.success(`${status}${title}成功`)
    if (back) {
      history.push(backPath)
    }
    callback && callback()
  }

  const onFieldsChange = (fields) => {
    const firstField = fields[0]
    if (firstField) {
      const result = {
        [firstField.name[0]]: firstField.value,
      }
      listenActions(result)
      fieldsChangeCallback && fieldsChangeCallback(firstField)
    }
  }

  return (
    <div className="page jjt-form">
      <div className="jjt-form-title">
        {status}
        {titlePrefix}
        {title}
      </div>
      <Form
        {...formLayout}
        form={form}
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
      >
        {formItems.map((item, index) => {
          const { comp, disabled, hide, ...rest } = item
          rest.key = index
          rest.form = form
          rest.disabled = disabled === 'isEdit' ? isEdit : disabled
          if (comp === 'FormImage') {
            rest.imageUrl = entity ? entity[item.name] : ''
          }
          if (hide === true || (hide === 'isEdit' && isEdit)) {
            rest.hide = true
          }
          return React.createElement(compMap[comp], rest)
        })}
        <FormBottom path={backPath} />
      </Form>
    </div>
  )
}

export default PageForm

const compMap = {
  FormInput,
  FormInputNum,
  FormEnableRadio,
  FormImage,
  FormSelect,
  FormDate,
}

const getEntityPath = (isEdit, apiPath, customApiPath, entityId) => {
  const path = customApiPath ?? `${apiPath}/item`
  return isEdit ? `${path}?id=${entityId}` : ''
}

const getFormPath = (apiPath, customApiPath) => {
  return customApiPath ?? `${apiPath}/edit`
}
