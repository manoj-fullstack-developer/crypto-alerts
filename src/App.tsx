import { CryptoProvider } from './context/crypto.context'
import AppRouter from './routes/appRouter'

function App() {
    return (
        <CryptoProvider>
            <AppRouter />
        </CryptoProvider>
    )
}

export default App
