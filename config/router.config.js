export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/business/no' },
      // business
      {
        path: '/business',
        name: 'business',
        icon: 'dashboard',
        routes: [
          {
            path: '/business/no',
            name: 'no',
            component: './Business/No',
          },
          {
            path: '/business/user',
            name: 'user',
            component: './Business/User',
          },
        ],
      },
      // list
      {
        path: '/hospitalUser',
        icon: 'table',
        name: 'hospitalUser',
        routes: [
          {
            path: '/hospitalUser/userlist',
            name: 'list',
            component: './HospitalUser/User',
            routes: [
              {
                path: '/hospitalUser/userlist',
                component: './HospitalUser/UserList',
              },
              {
                path: '/hospitalUser/userlist/bindUser',
                component: './HospitalUser/BindUser',
              },
              {
                path: '/hospitalUser/userlist/bindhistory',
                component: './HospitalUser/BindUserHistory',
              },
            ],
          },
          // {
          //   path: '/hospitalUser/bindUser',
          //   name: 'bind',
          //   component: './HospitalUser/BindUser',
          // },
          // {
          //   path: '/hospitalUser/bindHistory',
          //   name: 'history',
          //   component: './HospitalUser/BindUserHistory',
          // },
        ],
      },

      // info
      {
        name: 'info',
        icon: 'check-circle',
        path: '/info',
        routes: [
          {
            path: '/info',
            name: 'InfoDepart',
            component: './Info/InfoDepart',
            routes: [
              {
                path: '/info/doctor',
                component: './Info/Doctor',
              },
              {
                path: '/info',
                component: './Info/depart',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
