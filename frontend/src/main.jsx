import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { ShowTodoContextProvider } from './context/showTodoContext.jsx'
import { GetTodoContextProvider } from './context/getTodoContext.jsx'
import { TodoDataContextProvider } from './context/todoDataContext.jsx'
import './styles/style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShowTodoContextProvider >
      <GetTodoContextProvider >
        <TodoDataContextProvider >
          <App />
        </TodoDataContextProvider>
      </GetTodoContextProvider>
    </ShowTodoContextProvider>
  </StrictMode>,
)
