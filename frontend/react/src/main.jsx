import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap-icons/font/bootstrap-icons.css';

import Header from './components/Header.jsx'
import Blank from './components/Blank.jsx'
import Footer from './components/Footer.jsx'
import "./main.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Blank />
    <Footer />
  </StrictMode>,
)
