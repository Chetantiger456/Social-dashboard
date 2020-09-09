import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

class PostShow extends React.Component{
    constructor(){
        super()
        this.state = {
            user: {},
            post: {},
            comments: []
        }
    }

    componentDidMount(){
        console.log(this.props)
        const postsId = this.props.match.params.id
        Axios.get(`http://jsonplaceholder.typicode.com/posts/${ postsId }`)
        .then((response) => {
            const post = response.data
            console.log('post')
            console.log(post.userId)
            this.setState( { post } )
            
            Axios.get(`http://jsonplaceholder.typicode.com/users/${post.userId}`)
            .then((response) => {
                const user = response.data
                console.log(user)
                this.setState( { user })
            })
            .catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
            console.log(error)
        })
        
        Axios.get(`http://jsonplaceholder.typicode.com/comments?postId=${ postsId }`)
        .then((response) => {
            const comments = response.data
            console.log(comments)
            this.setState( { comments})
        })
        .catch((error) => {
            console.log(error)
        })
        
    }

    render(){
        return(
            <div>
                <h1>Posts</h1>
                <h1>{`User Name : ${ this.state.user.name }` }</h1>
                <h1>{ `Title: ${ this.state.post.title }` }</h1>
                <h2>{ `Body: ${ this.state.post.body }` } </h2>
                <hr/>
                <h1>Comments</h1>
                <ul>
                    {
                        this.state.comments.map((comment) => {
                            return <li key={comment.id}> { comment.body} </li>
                        })
                    }
                </ul>
                <hr/>
                <Link to={`/users/${this.state.user.id}`}>{`More posts of author : ${ this.state.user.name}`}</Link>
            </div>
        )
    }
}

export default PostShow