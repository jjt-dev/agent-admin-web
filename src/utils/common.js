import { message } from 'antd'

import { EntityStatus, useTypes } from './const'

export const findIndexById = (arrs, id) => {
  const result = arrs.findIndex((item) => item.id === id)
  return result ?? {}
}

export const findById = (obj, id, prop = 'id') => {
  const arrs = Array.isArray(obj) ? obj : Object.values(obj)
  return arrs.find((item) => item[prop] === id) ?? {}
}

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const isNotEmpty = (value) => {
  if (value === null || value === undefined) return false
  if (Array.isArray(value)) {
    return value.length > 0
  }
  if (value === 0) return true
  if (typeof value === 'boolean' || typeof value === 'number') return true
  if (value instanceof Object) return value

  return value.trim() !== ''
}

export const buildParameters = (path, parameters) => {
  path += '?'
  Object.keys(parameters).forEach((key) => {
    if (isNotEmpty(parameters[key])) {
      path += `&${key}=${encodeURIComponent(parameters[key])}`
    }
  })
  return path
}

export const buildFormPath = (path, parameters) => {
  path += '?'
  Object.keys(parameters).forEach((key) => {
    path += `&${key}=${encodeURIComponent(parameters[key] ?? '')}`
  })
  return path
}

// 复制指定内容
export const copyToClipboard = (clipboardContent) => {
  var textArea = document.createElement('textarea')
  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = 0
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  textArea.value = clipboardContent
  document.body.appendChild(textArea)
  textArea.select()
  try {
    var msg = document.execCommand('copy') ? '成功' : '失败'
    message.success('复制内容 ' + msg, 0.4)
  } catch (err) {
    message.error('不能使用这种方法复制内容')
  }
  document.body.removeChild(textArea)
}

export const getStatus = (isEdit) => {
  return isEdit ? EntityStatus.EDIT : EntityStatus.CREATE
}

export const findUseType = (useTypeId) => {
  return Object.values(useTypes).find((item) => item.id === String(useTypeId))
}
