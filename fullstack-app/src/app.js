import React from 'react'
import { Switch, Route } from 'react-router-dom'

// import component
import Navigation from './components/navigation'

// import pages
import Home from './pages/home'
import Product from './pages/product'

class App extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/product' component={Product} />
                </Switch>
            </div>
        )
    }
}

export default App