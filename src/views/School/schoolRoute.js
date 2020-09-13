import School from './School'
import SchoolList from './SchoolList'
import SchoolAdminList from './SchoolAdminList'
import SchoolAdmin from './SchoolAdmin'
import SchoolOrderList from './SchoolOrderList'
import SchoolOrder from './SchoolOrder'

const schoolRoute = [
  {
    path: '/school/list',
    editPath: '/school/edit',
    apiPath: '/client/school',
    title: '学校',
    comp: SchoolList,
  },
  {
    path: '/school/edit',
    apiPath: '/client/school',
    title: '学校',
    comp: School,
    back: {
      path: '/school/list',
      breadcrumbs: ['学校列表', '新增学校'],
    },
  },
  {
    path: '/school/edit/:id',
    apiPath: '/client/school',
    title: '学校',
    comp: School,
    back: {
      path: '/school/list',
      breadcrumbs: ['学校列表', '编辑学校'],
    },
  },
  {
    path: '/school/:schoolId/:school/admin/list',
    apiPath: '/client/school/admin',
    titleProp: 'username',
    title: '管理员',
    comp: SchoolAdminList,
    back: {
      path: '/school/list',
      breadcrumbs: ['学校列表', '管理员列表'],
    },
  },
  {
    path: '/school/:schoolId/:school/admin/edit',
    apiPath: '/client/school/admin',
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
    apiPath: '/client/school/admin',
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
      path: '/school/list',
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
]

export default schoolRoute
