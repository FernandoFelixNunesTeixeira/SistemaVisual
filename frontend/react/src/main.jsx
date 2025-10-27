import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import 'bootstrap-icons/font/bootstrap-icons.css';

import Header from './components/Header.jsx'
import Blank from './components/Blank.jsx'
import Footer from './components/Footer.jsx'
=======
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
>>>>>>> ae4e08168375f3bece23f780472a1b1e584b01ea
import "./main.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
