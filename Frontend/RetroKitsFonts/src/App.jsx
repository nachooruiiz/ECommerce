import { useState } from 'react'
import {Header} from './components/Header'
import {Footer} from './components/Footer'
import { LoginForm } from './components/LoginForm'


function App() {

  return (
    <body>
      <Header></Header>
      <LoginForm></LoginForm>
      <Footer></Footer>
    </body>
  )
}

export default App
