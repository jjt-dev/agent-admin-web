import { message, Modal, Table } from 'antd'
import React from 'react'
import PageCustom from 'src/components/PageCustom'
import useFetch from 'src/hooks/useFetch'
import api from 'src/utils/api'
import { getRow, tableOrder, getSwitchRow } from 'src/utils/tableUtil'

const { confirm } = Modal

const SettingList = () => {
  const [settings = [], fetchSettings] = useFetch('/user/uploadRight/page')

  const updatePermission = (record) => {
    const status = record.canUpload ? '禁用' : '启用'
    confirm({
      title: `请问您确认要${status}该科目的上传权限吗?`,
      content: `科目名: ${record.name}`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await api.post(`/user/updateUploadRight?courseId=${record.id}`)
        message.success(`科目${status}上传权限成功`)
        fetchSettings()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <PageCustom title="权限设置列表">
      <Table
        rowKey="id"
        columns={getColumns(updatePermission)}
        dataSource={settings}
        style={{ width: '600px', margin: '0 auto' }}
        pagination={false}
        bordered
      />
    </PageCustom>
  )
}

export default SettingList

const getColumns = (updatePermission) => [
  tableOrder,
  getRow('科目名称', 'name'),
  getSwitchRow(updatePermission, '上传权限', 'canUplaod'),
]
