import { useEffect } from 'react'
import Header from './header'
import Footer from './footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Layout = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname === '/') {
            navigate('/monitor')
        }
    }, [pathname])

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow  flex w-full mt-24">
                <Outlet />
            </main>
            <br />
            <Footer />
        </div>
    )
}

export default Layout
