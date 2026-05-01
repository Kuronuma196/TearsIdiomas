import type { RouteObject } from 'react-router-dom'
import Home from '@/pages/Home'
import { useRoutes } from 'react-router-dom'

// Used in @/prerender.tsx
export const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
]

function App() {
  return useRoutes(routes)
}

export default App
