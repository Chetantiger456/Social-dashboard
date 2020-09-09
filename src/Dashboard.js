import React from 'react'
import Axios from 'axios'
import {BDiv, Button, Card, Container, Row, Col } from 'bootstrap-4-react'

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            user: {},
            posts : []
        }
    }

    componentDidMount(){
        const userId = parseInt(localStorage.getItem('userId'))
        Axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) =>{
            const user = response.data
            this.setState({ user })
        })
        .catch((error)=>{
            console.log(error)
        })

        Axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response)=>{
            const posts = response.data
            this.setState({ posts })
        })
    }

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    render(){
        return(
            <div>
                <Container style ={{ border: '1px solid', marginBottom: '20px'}}>
                    <Row>
                        <Col col ='10'></Col>
                        <Col><Button secondary onClick={this.handleLogout}>Logout</Button></Col>
                    </Row>
                </Container>
                
                <Container style= {{ border:'1px solid', backgroundColor: '#eeeeee' }}>
                    <Row>
                        <Col col='col lg-6'>
                                <h1><span>Name:{ this.state.user.name }</span></h1>
                                <h4><span>Email:{ this.state.user.email }</span></h4>
                                <h4><span>Phone:{ this.state.user.phone }</span></h4>
                        </Col>
                        <Col col='col lg-6'>
                                <h2><span>Company Name:{ (Object.keys(this.state.user).length > 0 ) && this.state.user.company.name }</span></h2>
                                <h4><span>Catch Phrase:{ (Object.keys(this.state.user).length > 0) && this.state.user.company.catchPhrase}</span></h4>
                        </Col>
                    </Row>
                </Container>
                
            <BDiv border='dark' mx='3' my='3'> 
                {/* <div style= {{ border:'1px solid', margin: '1rem' }}> */}
                   
                    {
                        this.state.posts.map((post)=> {
                                return(
                                <Card style ={{ margin: '2rem', backgroundColor: '#eeeeee' }}>
                                    <Card.Body>
                                        <Card.Title>{ post.title }</Card.Title>
                                        <Card.Text> { post.body } </Card.Text>
                                    </Card.Body>
                            </Card>
                            )
                        })
                    }
                    
                </BDiv>
            </div>
        )
    }
}

export default Dashboard