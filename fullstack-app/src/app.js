import React from 'react'
import { Switch, Route } from 'react-router-dom'

// import component
import Navigation from './components/navigation'

// import pages
import Home from './pages/home'
import Product from './pages/product'
import Login from './pages/login'
import Register from './pages/register'

class App extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/product' component={Product} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                </Switch>
            </div>
        )
    }
}

export default App