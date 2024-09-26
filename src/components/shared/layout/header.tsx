import { Link, useLocation } from 'react-router-dom'
import AppContainer from '../container'
import { Button } from 'antd'
import { useContext } from 'react'
import { CryptoContext } from '../../../context/crypto.context'

const Header = () => {
    const { pathname } = useLocation()
    const { stopStreaming, isStreaming, loading, startStreaming } =
        useContext(CryptoContext)

    const navItems = [
        { title: 'Monitor', path: '/monitor' },
        { title: 'Alerts', path: '/alerts' },
    ]

    return (
        <nav className="bg-primaryColor fixed w-full z-10 text-white py-3 ">
            <AppContainer>
                <div className="flex justify-between items-center">
                    <p className="text-xl tracking-wide ">Crypto Compare</p>
                    <div className="flex gap-x-4 items-center">
                        <Button
                            loading={loading}
                            onClick={() => {
                                isStreaming
                                    ? stopStreaming && stopStreaming()
                                    : startStreaming && startStreaming()
                            }}
                            type="primary"
                            variant="filled"
                        >
                            {loading || !isStreaming
                                ? 'Start Streaming'
                                : 'Stop Streaming'}
                        </Button>
                        <ul className="flex gap-x-4 items-center">
                            {navItems.map((item) => (
                                <Link to={item.path} key={item.path}>
                                    <li
                                        className={`cursor-pointer  font-medium ${
                                            pathname === item.path
                                                ? 'underline'
                                                : ''
                                        }`}
                                    >
                                        {item.title}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </AppContainer>
        </nav>
    )
}

export default Header
