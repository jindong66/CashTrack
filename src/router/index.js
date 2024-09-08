// 创建路由实例 绑定path element

import Layout from '@/pages/Layout'
import Month from '@/pages/Month'
import New from '@/pages/New'
import Year from '@/pages/Year'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/month" replace /> //当访问根路径时，跳转到/month
            },
            {
                path: 'month',
                element: <Month />
            },
            {
                path: 'year',
                element: <Year />
            }
        ]
    },
    {
        path: '/new',
        element: <New />
    }
])

export default router