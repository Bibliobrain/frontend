import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
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
              <Route exact path="/catalog" component={Catalog}></Route>
              {authContext.token !== null ?
                <>
                  <Redirect to="/catalog" />
                  <Route exact path="/loan" component={Loan}></Route>
                  <Route exact path="/register" component={Register}></Route>
                </>
                :
                <>
                <Redirect to="/" />
                <Route exact path="/" component={Login}></Route>
                </>
              }
            </>
          </Switch>
        </Layout>
      </Router>
    </>
  )
}

export default App
