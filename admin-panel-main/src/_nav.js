import React from 'react'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { cilBuilding, cilChartPie, cilCalendar, cilPeople } from '@coreui/icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Тест Центры',
    to: '/testcenters',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Приложение Клиента',
    to: '/clientapp', // Add the correct route for your client app here
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />, // Use the icon you imported
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Все брони',
    to: '/appoinments', // Add the correct route for your client app here
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />, // Use the icon you imported
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Статистика',
    to: '/statistics', // Add the correct route for your client app here
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />, // Use the icon you imported
    badge: {
      color: 'info',
    },
  },
]

export default _nav
