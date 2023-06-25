import React from 'react'

// Containers
const TestCenters = React.lazy(() => import('./containers/TestCenters'))
const TestCenter = React.lazy(() => import('./containers/TestCenters/TestCenter'))
const TestCenterEdit = React.lazy(() => import('./containers/TestCenterEdit'))
const Profile = React.lazy(() => import('./containers/Profile'))
const AddTestCenter = React.lazy(() => import('./containers/AddTestCenter'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/testcenters', name: 'TestCenters', element: TestCenters },
  { path: '/testcenters/:id', name: 'TestCenter', element: TestCenter },
  { path: '/testcenters/add', name: 'TestCenter', element: AddTestCenter },
  { path: '/testcenters/edit/:id', name: 'Edit TestCenter', element: TestCenterEdit },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
]

export default routes
