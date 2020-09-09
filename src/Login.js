import React from 'react'
import validator from 'validator'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Alert, Button, BDiv } from 'bootstrap-4-react'

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email: '',
            error: ''
        }
    }

        
    handleChange = (event) => {
        const email = event.target.value
        this.setState({ email }) 
    }

    handleSubmit = (event) => {
        event.preventDefault()
       
      if(this.state.email.length == 0){
        this.setState({ error: 'Email can\'t be blank.' })
      }else if(!validator.isEmail(this.state.email)){
          this.setState({ error : 'Invalid Email'})
      } else { 
            Axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const users = response.data
                const user = users.find((user) => {
                    return this.state.email == user.email
                })
                //console.log(user)
                if(user){
                    localStorage.setItem('userId', user.id)
                    localStorage.setItem('userEmail', user.email)
                    this.props.history.push('/dashboard')
                }else{
                    this.setState({ error:'Email dosen\'t exist!' })
                }
                
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    render(){
        return(
            <BDiv  style={{  padding: '8rem', margin: '7rem',textAlign: 'center'}} border='dark' rounded  >
                
                <h2>Login</h2>
                <form onSubmit={ this.handleSubmit}>
                    <input type="text" name="email" placeholder='Enter the email' onChange={ this.handleChange } /><br />
                   <Button > <input type="submit" value="Login" secondary/> </Button>    
                    {(this.state.error) && <Alert danger>{this.state.error}</Alert> } 
                </form>
            </BDiv>
        )
    }
}

export default withRouter(Login)