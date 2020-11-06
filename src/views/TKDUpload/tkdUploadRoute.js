import School from './School'
import TKDUploadList from './TKDUploadList'
import SchoolAdminList from './SchoolAdminList'
import SchoolAdmin from './SchoolAdmin'
import SchoolOrderList from './SchoolOrderList'
import SchoolOrder from './SchoolOrder'
import SchoolAccount from './SchoolAccount'

const tkdUploadRoute = [
  {
    path: '/tkd-upload/list',
    editPath: '/tkd-upload/edit',
    apiPath: '/uploadReq',
    title: '学校',
    comp: TKDUploadList,
  },
  {
    path: '/tkd-upload/edit',
    apiPath: 'uploadReq',
    title: '学校',
    comp: School,
    back: {
      path: '/tkd-upload/list',
      breadcrumbs: ['学校列表', '新增学校'],
    },
  },
  {
    path: '/tkd-upload/edit/:id',
    apiPath: 'uploadReq',
    title: '学校',
    comp: School,
    back: {
      path: '/tkd-upload/list',
      breadcrumbs: ['学校列表', '编辑学校'],
    },
  },
  {
    path: '/school/:schoolId/:school/admin/list',
    apiPath: 'uploadReq/admin',
    titleProp: 'username',
    title: '管理员',
    comp: SchoolAdminList,
    back: {
      path: '/tkd-upload/list',
      breadcrumbs: ['学校列表', '管理员列表'],
    },
  },
  {
    path: '/school/:schoolId/:school/admin/edit',
    apiPath: 'uploadReq/admin',
    title: '管理员',
    comp: SchoolAdmin,
    back: {
      path: '/school/:schoolId/:school/admin/list',
      params: ['schoolId', 'school'],
      breadcrumbs: ['学校列表', '管理员列表', '新增管理员'],
    },
  },
  {
    path: '/school/:schoolId/:school/admin/edit/:id',
    apiPath: 'uploadReq/admin',
    title: '管理员',
    comp: SchoolAdmin,
    back: {
      path: '/school/:schoolId/:school/admin/list',
      params: ['schoolId', 'school'],
      breadcrumbs: ['学校列表', '管理员列表', '编辑管理员'],
    },
  },
  {
    path: '/school/:schoolId/:school/order/list',
    apiPath: '/client/account/school/orders',
    title: '订单',
    comp: SchoolOrderList,
    back: {
      path: '/tkd-upload/list',
      breadcrumbs: ['学校列表', '订单列表'],
    },
  },
  {
    path: '/school/:schoolId/:school/order/edit',
    title: '订单',
    comp: SchoolOrder,
    back: {
      path: '/school/:schoolId/:school/order/list',
      params: ['schoolId', 'school'],
      breadcrumbs: ['学校列表', '订单列表', '新增订单'],
    },
  },
  {
    path: '/school/:schoolId/:school/order/edit/:id',
    title: '订单',
    comp: SchoolOrder,
    back: {
      path: '/school/:schoolId/:school/order/list',
      params: ['schoolId', 'school'],
      breadcrumbs: ['学校列表', '订单列表', '编辑订单'],
    },
  },
  {
    path: '/school/:schoolId/:school/account',
    menuPath: '/tkd-upload/list',
    comp: SchoolAccount,
    back: {
      path: '/tkd-upload/list',
      params: ['schoolId', 'school'],
      breadcrumbs: ['学校列表', '学校账户信息'],
    },
  },
]

export default tkdUploadRoute
