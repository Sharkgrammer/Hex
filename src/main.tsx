import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// TODO return strictmode once generation functions
//   <StrictMode>
//  </StrictMode>,
createRoot(document.getElementById('root')!).render(
    <App />
)
