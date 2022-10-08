import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes'
import './index.css'
// import { BrowserRouter, createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import AppProvider from './store/AppProvider'

const A = AppProvider(Routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <A />
    </React.StrictMode>
)
