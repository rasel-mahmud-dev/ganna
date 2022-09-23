import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from  "react-router-dom"
import AppProvider from "./store/AppProvider";

const A = AppProvider(App)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
      <BrowserRouter>
            <A/>
      </BrowserRouter>
  // </React.StrictMode>
)
