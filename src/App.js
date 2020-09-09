import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import Home from './component/static/Home'
import Dashboard from './Dashboard'


function App(){
    return(
        <BrowserRouter>
            <div>
                {/* <Link to = '/'>Home</Link>-
                <Link to =  '/users'>Users</Link>-
                <Link to = '/posts'>Posts</Link> */}

                <Route path = '/' component = {Home} exact = { true }/>
                <Route path = '/dashboard' component = { Dashboard } />
                
            </div>
        </BrowserRouter>
    )
}

export default App