import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login } from './pages/Login'
import { Layout } from './components/Layout'
import { NavigationBar } from './components/NavigationBar'
import './App.css'

const App = () => {
  return (
    <>
      <Router>
        <NavigationBar />
        <Layout>
          <Switch>
            <Route exact path="/" component={Login}></Route>
          </Switch>
        </Layout>
      </Router>
    </>
  )
}

export default App
