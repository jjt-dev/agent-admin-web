import School from './School'
import SchoolList from './SchoolList'

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
]

export default schoolRoute
