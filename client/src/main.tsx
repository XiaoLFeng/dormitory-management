import "./assets/css/tailwind.css";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CustomRoute from "./custom_route.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomRoute/>
  </StrictMode>,
)
