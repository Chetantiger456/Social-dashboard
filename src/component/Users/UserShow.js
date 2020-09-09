import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

class UserShow extends React.Component{
    constructor(){
        super()
        this.state = {
             user: {},
             posts: []
        }
    }

    componentDidMount(){
      const userId = this.props.match.params.id
        Axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => {
            const user = response.data
            this.setState({ user })
        })
        .catch((error) => {
            console.log(error)
        })
        Axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => {
            const posts = response.data
            this.setState( { posts })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render(){
        return(
            <div>
                <h1>User Posts</h1>
                <h1>{`User Name : ${this.state.user.name}`}</h1>
                <h2>POST WRITTEN BY USER</h2>
                <ul>
                    {
                        this.state.posts.map((post) => {
                            return <li key= { post.id }> <Link to={`/posts/${post.id}`}> { post.title } </Link> </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default UserShow