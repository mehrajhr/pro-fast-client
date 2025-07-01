import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/router.jsx'
import { RouterProvider } from 'react-router'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <div className='font-urbanist max-w-11/12 mx-auto'>
      <RouterProvider router={router} />
     </div>
  </StrictMode>,
)
