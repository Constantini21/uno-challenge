import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css/animate.min.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { cssTransition, ToastContainer } from 'react-toastify'

import App from './App.tsx'

const client = new ApolloClient({
  uri: REACT_APP_GRAPHQL_URI || 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const Bounce = cssTransition({
  enter: 'animate__animated animate__bounceIn',
  exit: 'animate__animated animate__bounceOut'
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ToastContainer transition={Bounce} />

      <App />
    </ApolloProvider>
  </StrictMode>
)
