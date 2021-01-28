import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// import component
import Navigation from './components/navigation'

// import pages
import Home from './pages/home'
import Product from './pages/product'
import Login from './pages/login'
import Register from './pages/register'
import Verify from './pages/verification'
import Profile from './pages/profile'
import Category from './pages/category'

// import actions
import { keepLogin } from './actions'

class App extends React.Component {
    componentDidMount() {
        this.props.keepLogin()
    }

    render() {
        return (
            <div>
                <Navigation />
                <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/product' component={Product} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/verification' component={Verify} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/category' component={Category} />
                </Switch>
            </div>
        )
    }
}

export default connect(null, { keepLogin })(App)