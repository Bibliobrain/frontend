import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login } from './pages/Login'
import { Catalog } from './pages/Catalog'
import { Loan } from './pages/Loan'
import { Register } from './pages/Register'
import { Layout } from './components/Layout'
import { NavigationBar } from './components/NavigationBar'
import { AuthContext } from './contexts/AuthContext';
import './App.css'

const App = () => {
  const authContext = useContext(AuthContext)
  console.log('token appjs', authContext.token)
  // console.log('token appjs',authContext)
  return (
    <>
      <Router>
        <NavigationBar />
        <Layout>
          <Switch>
            <>
              <Route exact path="/" component={authContext.token === null ? Login : Catalog}></Route>
                <Route exact path="/loan" component={Loan}></Route>
              <Route exact path="/register" component={Register}></Route>
            </>
          </Switch>
        </Layout>
      </Router>
    </>
  )
}

export default App
