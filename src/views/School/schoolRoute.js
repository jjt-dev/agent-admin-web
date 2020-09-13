import School from './School'
import SchoolList from './SchoolList'
import SchoolAdminList from './SchoolAdminList'
import SchoolAdmin from './SchoolAdmin'

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
]

export default schoolRoute
