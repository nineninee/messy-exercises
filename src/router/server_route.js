// 这里模拟服务器返回的路由数据
// 注意！这里最大只支持二级路由，子路由下不能再有子路由
export default [
  {
      path: '/user',
      // DEFAULT_LAYOUT 使用的布局组件
      component: 'DEFAULT_LAYOUT',
      // menuName这里是一级菜单名称，order菜单排序
      meta: {menuName: '用户', order: 1},
      children: [
          {
              path: 'info',
              // 子路由的name会用来导航，整个路由中必须要保证唯一
              name: 'userInfo',
              // 加载子路由的路径，这样就表示加载views/user/info.vue
              // 单个路由就直接写info就行了
              // views目录下必须要有这些vue文件才行
              component: 'user/info',
              // menuName二级菜单名称
              meta: {menuName: '个人中心'}
          },
          {
              path: 'manage',
              name: 'userManage',
              component: 'user/manage',
              meta: {menuName: '用户管理'}
          }
      ]
  },
  {
      path: '/welcome',
      name: 'welcome',
      component: 'DEFAULT_LAYOUT',
      // single表示这个菜单只有一级菜单，只有一级菜单这里不需要设置menuName，在子路由设置
      meta: {order: 0, single: true},
      children: [
          {
              // 即使只显示一级菜单也要设置子路由，因为还要显示布局组件
              path: '',
              name: 'welcomeMain',
              component: 'welcome',
              meta: {menuName: '欢迎页'}
          }
      ]
  },
  {
      path: '/sys',
      name: 'sys',
      component: 'DEFAULT_LAYOUT',
      meta: {menuName: '系统管理', order: 2},
      children: [
          {
              path: 'setup',
              name: 'sysSetup',
              // 虽然建议多个子路由都放在一个文件夹下，不过分开放也是可以的
              component: 'setup',
              meta: {menuName: '设置'}
          },
          {
              path: 'board',
              name: 'sysBoard',
              component: 'board',
              meta: {menuName: '看板'}
          },
      ]
  }
]