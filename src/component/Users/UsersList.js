import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

class UsersList extends React.Component{
    constructor(){
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        Axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            const users = response.data
            this.setState({ users })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render(){
        return(
            <div> 
                <h1>Listing of users - { this.state.users.length }</h1>
                <ul> 
                    {
                        this.state.users.map((user) => {
                            return <li key= {user.id}> <Link to = { `/users/${user.id}` }>{ user.name } </Link></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default UsersList