import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/shared/layout'
import Monitor from '../pages/monitor'
import Alerts from '../pages/alerts'

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: 'monitor',
                    element: <Monitor />,
                },
                {
                    path: 'alerts',
                    element: <Alerts />,
                },
            ],
        },
    ])

    return <RouterProvider router={router} />
}

export default AppRouter
