import { message, modal } from 'antd'
import React from 'react'
import useActiveRoute from 'src/hooks/useActiveRoute'
import api from 'src/utils/api'

import CustomTable from '../CustomTable'
import ListHeader from '../ListHeader'

const { confirm } = modal
const { useTableFetch } = CustomTable

const PageList = ({
  columns,
  showAdd = true,
  addCallback,
  deleteCallback,
  defaultTableList,
  placeholder = '请输入查询条件',
  rowKey = 'id',
  path,
  children,
  size = 'middle',
  title: defaultTitle,
  customClass = '',
}) => {
  const {
    editPath,
    title,
    titleProp = 'name',
    apiPath = editPath,
  } = useActiveRoute()

  let fetchPath = ''
  if (!defaultTableList) {
    fetchPath = path ? path : `${apiPath}/page`
  }
  let tableList = useTableFetch(fetchPath)
  if (defaultTableList) {
    tableList = defaultTableList
  }

  // addCallback如果没有值，则取list的编辑路径
  if (!addCallback) {
    addCallback = editPath
  }

  const confirmUpdate = ({
    status,
    title,
    titleValue,
    path,
    callback,
    contentTitle,
  }) => {
    confirm({
      title: `请问您确认要${status}该${title}吗?`,
      content: `${contentTitle ?? title}名: ${titleValue}`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await api.post(path)
        message.success(`${title}${status}成功`)
        callback && callback()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const updateEntityStatus = (entity) => {
    const { isEnable } = entity
    const payload = {
      status: isEnable ? '禁用' : '启用',
      title,
      titleValue: entity[titleProp],
      path: `${apiPath}/enable?id=${entity.id}&isEnable=${!isEnable}`,
      callback: tableList.fetchTable,
    }
    confirmUpdate(payload)
  }

  const deleteEntity = (entity) => {
    const payload = {
      status: '删除',
      title,
      titleValue: entity[titleProp],
      path: `${apiPath}/del?id=${entity.id}`,
      callback: () => {
        tableList.fetchTable()
        deleteCallback && deleteCallback()
      },
    }
    confirmUpdate(payload)
  }

  return (
    <div className={`page page-list ${customClass}`}>
      <div className="page-list-title">{defaultTitle ?? title}列表</div>
      {children}
      {!children && (
        <ListHeader
          {...tableList}
          showAdd={showAdd}
          addCallback={addCallback}
          placeholder={placeholder}
        />
      )}
      <CustomTable
        {...tableList}
        columns={columns(deleteEntity, updateEntityStatus)}
        rowKey={rowKey}
        size={size}
      />
    </div>
  )
}

export default PageList
