import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

class PostsList extends React.Component{
    constructor(){
        super()
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        Axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then((response) => {
            const posts = response.data
            //console.log(posts)
            this.setState({ posts })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render(){
        return(
            <div>
                <h1>Listing of posts - { this.state.posts.length }</h1>
                <ul>
                    {
                        this.state.posts.map((post) => {
                        return <li key={ post.id }> <Link to={`/posts/${post.id}`}>{ post.title }</Link> </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default PostsList