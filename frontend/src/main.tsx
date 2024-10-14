import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css/animate.min.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import App from './App.tsx'

const client = new ApolloClient({
  uri: REACT_APP_GRAPHQL_URI || 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
)
