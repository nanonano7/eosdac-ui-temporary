
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'requests', component: () => import('pages/requests') },
      { path: 'request/:id', component: () => import('pages/request') },
      { path: 'proposal/:id', component: () => import('pages/proposal') },
      { path: 'proposals', component: () => import('pages/proposals') },
      { path: 'createproposal', component: () => import('pages/createproposal') },
      { path: 'custodians', component: () => import('pages/custodians') },
      { path: 'account/:name', component: () => import('pages/account') },
      { path: 'myaccount', component: () => import('pages/myaccount') },
      { path: 'wallet', component: () => import('pages/wallet') },
      { path: 'settings', component: () => import('pages/settings') },
      { path: 'test', component: () => import('pages/test') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
