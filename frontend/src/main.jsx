import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { ShowTodoContext } from './context/showTodoContext.jsx'
import './styles/style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShowTodoContext >
      <App />
    </ShowTodoContext>
  </StrictMode>,
)
