import { StrictMode } from 'react'    // É uma ferramenta do React ajuda a detectar: possíveis bugs
import { createRoot } from 'react-dom/client'   //É a função responsável por criar a aplicação React dentro do HTML.
import { QueryClient,QueryClientProvider } from "@tanstack/react-query"

import './index.css'  // tá trazendo tudo que ta la no index.css
import App from './App.jsx'   // importando o coponente principal aqui


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(    // ta conectando na div no incex html 
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />  
    </QueryClientProvider>        
  </StrictMode>,
)
// Renderize App mas monitore tudo usando StrictMode