import TKDUploadList from './TKDUploadList'

const tkdUploadRoute = [
  {
    path: '/tkd-upload/list',
    editPath: '/tkd-upload/edit',
    apiPath: '/uploadReq',
    title: '上传中跆协申请',
    comp: TKDUploadList,
  },
]

export default tkdUploadRoute
