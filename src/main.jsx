import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProductPage from './pages/ProductPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import SearchResultsPage from './pages/SearchResultPage.jsx'
import JewelryCategory from './components/JewelryCategory.jsx'

const router = createBrowserRouter([
  {

  path: '/',
  element: <Home/>,
  errorElement: <NotFoundPage/>,
},
{
  path: '/product/:id',
  element: <ProductPage/>
},
{
  path: '/search',
  element: <SearchResultsPage/>,
},
{
  path: '/category/jewwlery',
  element: <JewelryCategory/>,
}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
