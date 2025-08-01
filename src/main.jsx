import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./app/context/AuthContext.jsx";
import App from "./App.jsx";
import './index.css'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import './app/styles/custom.css'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
)